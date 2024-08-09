const Joi = require('joi');

const id =  Joi.number().integer().positive();
const userId =  Joi.number().integer().positive();
const permissionId =  Joi.number().integer().positive();
const typeUser = Joi.string().valid("user", "operator");

const permissionsSchema = Joi.object({
    id: permissionId.required(),
    status: Joi.number().integer().valid(0,1).required()
});

const permissionsArraySchema = Joi.array().items(permissionsSchema).required();

const assignPermissionsActuarSchema = Joi.object({
    userId: userId.required(),
    typeUser: typeUser.required(),
    permissions: permissionsArraySchema
});

module.exports = {
    assignPermissionsActuarSchema
}