import passport from 'passport';
import passportJWTR from 'passport-jwtr';
import config from 'node-config-env-value';

const { Strategy: JwtrStrategy, ExtractJwt } = passportJWTR;

import AuthenticationError from '../error/AuthenticationError';
import errorCodes from '../error/errorCodes';
import JWTUserDTO from '../dto/JWTUserDTO';

export default ({ jwtRedis }) => {

    const header = config.get('jwt.header');
    const opts = {
        jwtFromRequest: ExtractJwt.fromHeader(header),
        secretOrKey: config.get('jwt.secret'),
        jwtr: jwtRedis,
    };

    passport.use(new JwtrStrategy(opts), (payload, done) => {
        if (payload.type === 'access') {
            return done(null, new JWTUserDTO(payload));
        }
        done(new AuthenticationError({ message: 'Token of wrong type', code: errorCodes.AUTHENTICATION_ERROR }));
    });

    return passport;

}