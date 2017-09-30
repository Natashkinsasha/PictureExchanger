import passport from 'passport';
import passportJWTR from 'passport-jwtr';
import config from 'node-config-env-value';

const {Strategy: JwtrStrategy, ExtractJwt} = passportJWTR;

export default ({jwtRedis}) => {

    const header = config.get('jwt.header');
    const opts = {
        jwtFromRequest: ExtractJwt.fromHeader(header),
        secretOrKey: config.get('jwt.secret'),
        jwtr: jwtRedis,
    };

    passport.use(new JwtrStrategy(opts));

    return passport;

}