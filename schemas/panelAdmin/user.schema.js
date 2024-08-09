const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().max(150);
const lastName = Joi.string().max(100);
const phone = Joi.string().max(15);
const email = Joi.string().email().max(200);
const password = Joi.string();
const status = Joi.number().integer().default(1);
const createdAt = Joi.date();
const updatedAt = Joi.date();

const getUserSchema = Joi.object({
    id: id.required()
})

const createUserSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    phone: phone,
    email: email.required(),
    password: password.required(),

})

const updateUserSchema = Joi.object({
    name: name,
    lastName: lastName,
    phone: phone,
    email: email,
    password: password,
    status: status,
})

module.exports = {
    getUserSchema,
    createUserSchema,
    updateUserSchema
}