const Joi = require('joi');

const id =  Joi.number().integer().positive();
const name =  Joi.string().max(150);
const lastName =  Joi.string().max(100);
const phone = Joi.string().max(15);
const email =  Joi.string().email().max(150);
const username =  Joi.string().max(80);
const password =  Joi.string().max(30);
const createDate =  Joi.date();
const active =  Joi.number().integer().valid(0,1).default(1);
const updatestatus =  Joi.number().integer().min(0).default(0);
const slack =  Joi.string().max(70);

const typeUser = Joi.string().valid("user", "operator");

const getUserActuarSchema = Joi.object({
    id: id.required()
});

const getUserPermissionsSchema = Joi.object({
    id: id.required(),
    typeUser: typeUser.required()
})

const createUserActuarSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    email: email,
    username: username.required(),
    password: password.required(),
    slack: slack
});

const updateUserActuarSchema = Joi.object({
    name: name,
    lastName: lastName,
    phone: phone,
    email: email,
    username: username,
    password: password,
    slack: slack,
    active:active,
});

module.exports = {
    getUserActuarSchema,
    getUserPermissionsSchema,
    createUserActuarSchema,
    updateUserActuarSchema
}