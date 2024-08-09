const express = require('express');
const passport = require('passport');
const verifyToken = require('../../../middelwares/verifyToken.handler');
const validatorHandler = require('../../../middelwares/validatorHandler');
const ModuleActuarService = require('../../../servivces/actuar/modulesActuar.service');
const { getModuleActuarSchema, createModuleActuarSchema, updateModuleActuarSchema } = require('../../../schemas/actuar/module.schema');

const router = express.Router();
const moduleActuarService = new ModuleActuarService();

router.get('/', 
    verifyToken,
    passport.authenticate('jwt', { session: false }), 
    async(req, res, next) => {
        try {
            const modules = await moduleActuarService.list(req.query);

            res.status(200).json(modules);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/modulesWPermissions',
    verifyToken,
    passport.authenticate('jwt', { session: false }), 
    async(req, res, next) => {
        try {
            const modulesWithPermissions = await moduleActuarService.listModulesWPermissions();

            res.status(200).json(modulesWithPermissions);
        } catch (error) {
            next(error);
        }
    }
)

router.get('/:id',
    validatorHandler(getModuleActuarSchema, 'params'),
    verifyToken,
    passport.authenticate('jwt', { session: false }), 
    async(req, res, next) => {
        try {
            const { id } = req.params;

            const module = await moduleActuarService.findOne(id);

            res.status(200).json(module);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createModuleActuarSchema, 'body'),
    verifyToken,
    passport.authenticate('jwt', { session: false }), 
    async (req, res, next) => {
        try {
            
            const data = req.body;

            const module = await moduleActuarService.create(data);

            res.status(201).json(module);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getModuleActuarSchema, 'params'),
    validatorHandler(updateModuleActuarSchema, 'body'),
    verifyToken,
    passport.authenticate('jwt', { session: false }), 
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const module = await moduleActuarService.update(id, body);

            res.status(200).json(module);
        } catch (error) {
            next(error);
        }
    }
)

router.delete('/:id',
    validatorHandler(getModuleActuarSchema, 'params'),
    verifyToken,
    passport.authenticate('jwt', { session: false }), 
    async(req, res, next) => {
        try {
            const { id } = req.params;

            const module = await moduleActuarService.delete(id);
            
            res.status(200).json({ "status" : true, "message" : `El módulo con id: ${module.id} se ha desactivado`})
        } catch (error) {
            next(error);            
        }
    }
)

module.exports = router;