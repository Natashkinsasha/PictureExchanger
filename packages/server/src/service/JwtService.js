import config from 'node-config-env-value';
import Promise from 'bluebird';

export default class JwtService {


    constructor({jwtRedis}) {
        this.jwtRedis = jwtRedis;
        this.secretJWTKey = config.get('jwt.secret');
    }

    create = (user) => {
        return Promise
            .props({
                accessToken: this.jwtRedis
                    .signAsync({...user, type: 'access'}, this.secretJWTKey),
                refreshToken: this.jwtRedis
                    .signAsync({...user, type: 'refresh'}, this.secretJWTKey)
            });
    };

    destroy = ({token}) => {
        return this.jwtRedis.destroyAsync(token)
    };

}