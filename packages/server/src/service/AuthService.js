import Promise from 'bluebird';

import RegistryUserDTO from '../dto/RegistryUserDTO';
import JWTUserDTO from '../dto/JWTUserDTO';
import AuthenticationError from '../error/AuthenticationError';
import passwordHash from '../lib/password-hash';
import validator from 'validator';
import errorCodes from "../error/errorCodes";
import ClientUserDTO from "../dto/ClientUserDTO";

export default class AuthService {

    constructor({jwtService, userDao}) {
        this.jwtService = jwtService;
        this.userDao = userDao;
    }

    registryOrLoginViaFacebook = ({facebook}) => {
        return this.userDao
            .findOrCreateViaFacebook({facebook})
            .then()
            .then((user) => {
                return this.jwtService
                    .create(new JWTUserDTO(user))
                    .then(({accessToken, refreshToken}) => {
                        return {
                            user: new ClientUserDTO(user),
                            accessToken,
                            refreshToken,
                        }
                    })
            });
    };

    registry = ({nickname, email, password}) => {
        return this.userDao
            .create(new RegistryUserDTO({nickname, email, password}))
            .then((user) => {
                return this.jwtService
                    .create(new JWTUserDTO(user))
                    .then(({accessToken, refreshToken}) => {
                        return {
                            user: new ClientUserDTO(user),
                            accessToken,
                            refreshToken,
                        }
                    })
            });
    };

    login = ({nicknameOrEmail, password}) => {
        return Promise
            .resolve()
            .then(() => {
                if (validator.isEmail(nicknameOrEmail)) {
                    return this.userDao.findByEmail({email: nicknameOrEmail});
                }
                return this.userDao.findByNickname({nickname: nicknameOrEmail});
            })
            .then((user) => {
                if (!user) {
                    throw new AuthenticationError({message: 'Invalid nickname or email'});
                }
                return Promise.resolve([passwordHash.validate(password, user.salt, user.passwordHash), user]);

            })
            .spread((isValidate, user) => {
                if (isValidate) {
                    return this.jwtService
                        .create(new JWTUserDTO(user))
                        .then(({accessToken, refreshToken}) => {
                            return {
                                user: new ClientUserDTO(user),
                                accessToken,
                                refreshToken,
                            }
                        });
                }
                throw new AuthenticationError({message: 'Invalid password', code: errorCodes.INVALID_PASSWORD});

            });
    };


    logout = ({token}) => {
        return this.jwtService.destroy({token});
    };

    getAccessToken = ({refreshToken}) => {
        return this.jwtService
            .validateRefreshToken({refreshToken})
            .then(() => {
                return this.jwtService.destroy({token: refreshToken});
            })
            .then((user) => {
                return this.jwtService
                    .create(new JWTUserDTO(user))
                    .then(({accessToken, refreshToken}) => {
                        return {
                            user: new ClientUserDTO(user),
                            accessToken,
                            refreshToken,
                        }
                    });
            })
    };

}

