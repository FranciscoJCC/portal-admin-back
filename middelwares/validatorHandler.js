const boom = require('@hapi/boom');

function validatorHandler(schema, property){
    return (req, res, next) => {
        
        let data = null;
        
        if(property === 'bodyForm'){
            data = JSON.parse(req.body.data);
        }else{
            data = req[property];
        }

        const { error } = schema.validate(data, { abortEarly: false });
        
        if(error){
            next(boom.badRequest(error));
        }

        next();
    }
}

module.exports = validatorHandler;