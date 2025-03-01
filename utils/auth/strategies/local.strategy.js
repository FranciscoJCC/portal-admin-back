const { Strategy } = require('passport-local');
const AuthService = require('./../../../servivces/panelAdmin/auth.service');

const authService = new AuthService();

const LocalStrategy = new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = await authService.getUser(email, password);

            done(null, user);
        } catch (error) {
            done(error, false);
        }
    }
);

module.exports = LocalStrategy;