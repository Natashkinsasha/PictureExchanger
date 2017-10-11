import passport from 'passport';
import passportJWTR from 'passport-jwtr';
import config from 'node-config-env-value';

import FacebookUserDTO from '../dto/FacebookUserDTO';


import AuthenticationError from '../error/AuthenticationError';
import errorCodes from '../error/errorCodes';
import JWTUserDTO from '../dto/JWTUserDTO';

const FacebookStrategy = require('passport-facebook').Strategy;

const {Strategy: JwtrStrategy, ExtractJwt} = passportJWTR;

export default ({jwtRedis, authService}) => {

    const header = config.get('jwt.header');
    const opts = {
        jwtFromRequest: ExtractJwt.fromHeader(header),
        secretOrKey: config.get('jwt.secret'),
        jwtr: jwtRedis,
    };

    passport.use(new JwtrStrategy(opts, (payload, done) => {
        if (payload.type === 'access') {
            return done(null, new JWTUserDTO(payload));
        }
        done(new AuthenticationError({message: 'Token of wrong type', code: errorCodes.AUTHENTICATION_ERROR}));
    }));

    passport.use(new FacebookStrategy({
            clientID: config.get('facebook.facebook_app_id'),
            clientSecret: config.get('facebook.facebook_app_secret'),
            callbackURL: "http://localhost:3001/auth/facebook/callback"
        },
        (accessToken, refreshToken, profile, cb) => {
            return cb(null, new FacebookUserDTO({accessToken, refreshToken, ...profile}));
        }
    ));

    return passport;

}