const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().max(80);
const description = Joi.string().max(250);
const status = Joi.number().integer().valid(0, 1).default(1);

const getModuleActuarSchema = Joi.object({
    id: id.required()
});

const createModuleActuarSchema = Joi.object({
    name: name.required(),
    description: description,
});

const updateModuleActuarSchema = Joi.object({
    name: name,
    description: description,
    status: status
});

module.exports = {
    getModuleActuarSchema,
    createModuleActuarSchema,
    updateModuleActuarSchema
}