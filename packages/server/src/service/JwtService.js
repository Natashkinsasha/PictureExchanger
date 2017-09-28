import config from 'node-config-env-value';
import Promise from 'bluebird';

export default class JwtService {


    constructor({jwtRedis}) {
        this.jwtRedis = jwtRedis;
        this.secretJWTKey = config.get('jwt.secret');
    }

    create = ({id, nickname, email}) => {
        return Promise
            .props({
                accessToken: this.jwtRedis
                    .signAsync({id, nickname, email, type: 'access'}, this.secretJWTKey),
                refreshToken: this.jwtRedis
                    .signAsync({id, nickname, email, type: 'refresh'}, this.secretJWTKey)
            });
    };

    break = ({token}) => {
        return this.jwtRedis.destroyAsync(token)
    }

}