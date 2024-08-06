const config = require('../config');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const token = req.headers.authorization;

    if(!token){
        throw boom.unauthorized("Iniciar sesión nuevamente");
    }

    jwt.verify(token.slice(7), config.JWT_KEY, (err, secret) => {
        if(err){
            throw boom.unauthorized("No tienes permisos para realizar esta acción.");
        }

        req.authData = secret.user;
        next();
    })
}

module.exports = verifyToken;