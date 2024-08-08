const config = require('../config');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const token = req.headers.authorization;
    
    if(!token){
        throw boom.unauthorized("Iniciar sesión nuevamente");
    }

    next()
}

module.exports = verifyToken;