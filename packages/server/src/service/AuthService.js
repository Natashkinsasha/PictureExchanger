import RegistryUserDTO from '../dto/RegistryUserDTO';
import JWTUserDTO from '../dto/JWTUserDTO';
import AuthenticationError from '../error/AuthenticationError';
import passwordHash from '../lib/password-hash';
import validator from 'validator';

export default class AuthService {

    constructor({jwtService, userDao}) {
        this.jwtService = jwtService;
        this.userDao = userDao;
    }

    registry = ({nickname, email, password}) => {
        return this.userDao
            .create(new RegistryUserDTO({nickname, email, password}))
            .then((user) => {
                return this.jwtService
                    .create(new JWTUserDTO(user))
                    .then(({accessToken, refreshToken}) => {
                        return {
                            user,
                            accessToken,
                            refreshToken,
                        }
                    })
            })
    };

    login = ({nicknameOrEmail, password}) => {
        return Promise
            .resolve((nicknameOrEmail) => {
                if (validator.isEmail(nicknameOrEmail)) {
                    return this.userDao.findByEmail({email: nicknameOrEmail});
                }
                return this.userDao.findByNickname({nickname: nicknameOrEmail});
            })
            .then((user) => {
                if (!user) {
                    throw new AuthenticationError({message: 'Invalid nickname or email'});
                }
                return passwordHash.validate(password, user.salt, user.passwordHash)
            })
            .then((isValidate) => {
                if (isValidate) {
                    return this.jwtService
                        .create(new JWTUserDTO(user))
                        .then(({accessToken, refreshToken}) => {
                            return {
                                user,
                                accessToken,
                                refreshToken,
                            }
                        })
                }
                throw new AuthenticationError({message: 'Invalid password'});

            });
    };


    logout = ({token}) => {
        return this.jwtService.destroy({token});
    }

}

