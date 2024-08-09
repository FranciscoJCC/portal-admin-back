const Joi = require('joi');

const id = Joi.number().integer().positive();
const moduleId = Joi.number().integer().positive();
const name = Joi.string().max(80);
const description = Joi.string().max(250);
const status = Joi.number().integer().valid(0, 1).default(1);

const getPermissionActuarSchema = Joi.object({
    id: id.required()
});

const createPermissionActuarSchema = Joi.object({
    moduleId: moduleId.required(),
    name: name.required(),
    description: description,
});

const updatePermissionActuarSchema = Joi.object({
    moduleId: moduleId,
    name: name,
    description: description,
    status: status
});

module.exports = {
    getPermissionActuarSchema,
    createPermissionActuarSchema,
    updatePermissionActuarSchema
}