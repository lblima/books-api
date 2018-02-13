import Passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export default app => {
    const Users = app.datasource.models.Users;
    const opts = {};

    opts.secretOrKey = app.config.jwtSecret
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    const strategy = new Strategy(opts, (payload, done) => {
        Users.findById(payload.id)
            .then(user => {
                if (user) {
                    return done(null, {
                        id: user.id,
                        email: user.email
                    });
                }

                return done(null, false);
            })
            .catch(error => done(error, null));
    });

    Passport.use(strategy);

    return {
        initialize: () => Passport.initialize(),
        authenticate: () => Passport.authenticate('jwt', app.config.jwtSecret)
    }
}