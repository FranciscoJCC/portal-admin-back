const Joi = require('joi');

const email = Joi.string().email();
const token = Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/);
const password = Joi.string().min(8);

const loginSchema = Joi.object({
    email: email.required(),
    password: password.required()
});

module.exports = {
    loginSchema
}