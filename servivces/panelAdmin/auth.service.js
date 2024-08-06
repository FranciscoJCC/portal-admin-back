const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const UserService = require('./users.service');

const userService = new UserService();

class AuthService {
    async getUser(email, password){
        const user = await userService.findByEmail(email);

        if(!user){
            throw boom.unauthorized("Credenciales incorrectas");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            throw boom.unauthorized("Credenciales incorrectas");
        }

        delete user.dataValues.password;

        return user;
    }

    //Firmamos un token
    async signToken(user){
        const payload = {
            sub: user.id,
            role: 'admin' //Mejorar
        };

        const token = jwt.sign(payload, config.JWT_TOKEN);

        return {
            user,
            token
        }
    }
}

module.exports = AuthService;