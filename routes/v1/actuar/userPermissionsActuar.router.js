const express = require('express');
const passport = require('passport');
const verifyToken = require('../../../middelwares/verifyToken.handler');
const validatorHandler = require('../../../middelwares/validatorHandler');
const UserPermissionActuarService = require('../../../servivces/actuar/userPermissions.service');
const { assignPermissionsActuarSchema } = require('../../../schemas/actuar/userPermissions.schema')

const router = express.Router();
const userPermissionActuarService = new UserPermissionActuarService();

//Registrar los permisos del usuario
router.post('/syncUpUserPermissions',
    validatorHandler(assignPermissionsActuarSchema, 'body'),
    verifyToken,
    passport.authenticate('jwt', { session: false }), 
    async (req, res, next) => {
        try {
            const data = req.body;

            const userPermissions = await userPermissionActuarService.syncUpUserPermissions(data);

            res.status(201).json(userPermissions);
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;