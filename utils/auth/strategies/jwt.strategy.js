const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../../../config');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_TOKEN
};

const JwtStrategy = new Strategy(options, (payload, done) => {
    return done(null, payload);
})

module.exports = JwtStrategy;