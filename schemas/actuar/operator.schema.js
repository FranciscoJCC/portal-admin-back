const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().max(150);
const lastName = Joi.string().max(100);
const email = Joi.string().email().max(150);
const type = Joi.string().valid("OPERADOR", "MANIOBRISTA");
const createDate = Joi.date();
const username = Joi.string().max(50);
const password = Joi.string().max(80);
const active = Joi.number().integer().valid(0, 1).default(1);
const empId = Joi.number().integer();
const updateStatus = Joi.number().integer().valid(0, 1).default(0);
const phone = Joi.string().max(30);
const slack = Joi.string().max(35);
const status = Joi.number().integer();
const profileImage = Joi.string().max(35);
const license = Joi.string().max(35);
const licenseType = Joi.string().max(35);
const apto = Joi.string().max(35);
const dateAdmission = Joi.date();


const getOperatorActuarSchema = Joi.object({
    id: id.required()
});

const createOperatorActuarSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    email: email.required(),
    type: type.required(),
    username: username.required(),
    password: password.required(),
    empId: empId.required(),
    phone: phone.required(),
    slack: slack,
    profileImage: profileImage,
    license: license.required(),
    licenseType: licenseType.required(),
    apto: apto.required(),
    dateAdmission: dateAdmission.required()
});

const updateOperatorActuarSchema = Joi.object({
    name: name,
    lastName: lastName,
    email: email,
    type: type,
    username: username,
    password: password,
    active: active,
    empId: empId,
    phone: phone,
    slack: slack,
    status: status,
    profileImage: profileImage,
    license: license,
    licenseType: licenseType,
    apto: apto,
    dateAdmission: dateAdmission
});

module.exports = {
    getOperatorActuarSchema,
    createOperatorActuarSchema,
    updateOperatorActuarSchema
}