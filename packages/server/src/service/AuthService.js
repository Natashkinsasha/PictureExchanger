import crypto from 'crypto';

import RegistryUserDTO from '../dto/RegistryUserDTO';
import JWTUserDTO from '../dto/JWTUserDTO';
import AuthenticationError from '../error/AuthenticationError';

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

    login = ({nickname, email, password}) => {
        return Promise
            .resolve((nickname) => {
                if (nickname) {
                    return this.userDao.findByNickname({nickname});
                }
                return this.userDao.findByEmail({email});
            })
            .then((user) => {
                if(!user){
                    if(nickname){
                        throw new AuthenticationError({message:'Invalid nickname'});
                    }
                    throw new AuthenticationError({message:'Invalid email'});
                }
                return validatePassword({password, salt: user.salt, passwordHash: user.passwordHash.})
            })
            .then((isValidate)=>{
                if (isValidate){
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
                throw new AuthenticationError({message:'Invalid password'});

            });
    };


    logout = ({token}) => {
        return this.jwtService.break({token});
    }

}

function validatePassword({password, salt, passwordHash}) {
    return crypto.pbkdf2Sync(password, salt, 1, 128, 'sha1') === passwordHash;
}