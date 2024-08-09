const config = require('../config');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        throw boom.unauthorized("Iniciar sesión nuevamente");
    }

    // El token suele estar precedido por "Bearer "
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

    // Verificar el token usando jsonwebtoken
    jwt.verify(token, config.JWT_TOKEN, (err, decoded) => {
        if (err) {
            // Manejar errores de verificación, como token expirado o inválido
            if (err.name === 'TokenExpiredError') {
                return next(boom.unauthorized("Token expirado"));
            }
            return next(boom.unauthorized("Token inválido"));
        }

        // Continuar con el siguiente middleware
        next();
    });
}

module.exports = verifyToken;