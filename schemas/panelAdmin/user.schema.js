const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().max(150);
const email = Joi.string().email().max(200);
const password = Joi.string();
const status = Joi.boolean().default(true);
const createdAt = Joi.date();
const updatedAt = Joi.date();

const getUserSchema = Joi.object({
    id: id.required()
})

const createUserSchema = Joi.object({
    name: name.required(),
    email: email.required(),
    password: password.required()
})

const updateUserSchema = Joi.object({
    name: name,
    email: email,
    password: password
})

module.exports = {
    getUserSchema,
    createUserSchema,
    updateUserSchema
}