const express = require('express');
const validatorHandler = require('../../../middelwares/validatorHandler');
const PermissionActuarService = require('../../../servivces/actuar/permissionsActuar.service');
const { getPermissionActuarSchema, createPermissionActuarSchema, updatePermissionActuarSchema} = require('./../../../schemas/actuar/permission.schema');

const router = express.Router();
const permissionActuarService = new PermissionActuarService();

router.get('/', async(req, res, next) => {
    try {
        const permissions = await permissionActuarService.list(req.query);

        res.status(200).json(permissions);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',
    validatorHandler(getPermissionActuarSchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params;

            const permission = await permissionActuarService.findOne(id);

            res.status(200).json(permission);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createPermissionActuarSchema, 'body'),
    async (req, res, next) => {
        try {
            
            const data = req.body;

            const permission = await permissionActuarService.create(data);

            res.status(201).json(permission);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getPermissionActuarSchema, 'params'),
    validatorHandler(updatePermissionActuarSchema, 'body'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const permission = await permissionActuarService.update(id, body);

            res.status(200).json(permission);
        } catch (error) {
            next(error);
        }
    }
)

router.delete('/:id',
    validatorHandler(getPermissionActuarSchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params;

            const module = await permissionActuarService.delete(id);
            
            res.status(200).json({ "status" : true, "message" : `El permiso con id: ${module.id} se ha desactivado`})
        } catch (error) {
            next(error);            
        }
    }
)

module.exports = router;