import config from 'node-config-env-value';
import Promise from 'bluebird';

export default class JwtService {


    constructor({jwtRedis}) {
        this.jwtRedis = jwtRedis;
        this.secretJWTKey = config.get('jwt.secret');
        this.access_expires = config.get('jwt.access_expires');
        this.refresh_expires = config.get('jwt.refresh_expires');
    }

    create = (user) => {
        return Promise
            .props({
                accessToken: this.jwtRedis
                    .signAsync({...user, type: 'access'}, this.secretJWTKey, {expiresIn: this.access_expires}),
                refreshToken: this.jwtRedis
                    .signAsync({...user, type: 'refresh'}, this.secretJWTKey, {expiresIn: this.refresh_expires})
            });
    };

    destroy = ({token}) => {
        return this.jwtRedis.destroyAsync(token, this.secretJWTKey)
    };

    validateRefreshToken = ({refreshToken}) => {
        return this.jwtRedis.verifyAsync(refreshToken, this.secretJWTKey, {eql: {type: 'refresh'}})
    };

}