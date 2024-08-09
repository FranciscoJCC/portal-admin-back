const express = require('express');
const passport = require('passport');
const verifyToken = require('../../../middelwares/verifyToken.handler');
const validatorHandler = require('../../../middelwares/validatorHandler');
const UserPermissionActuarService = require('../../../servivces/actuar/userPermissions.service');
const { assignPermissionsActuarSchema } = require('../../../schemas/actuar/userPermissions.schema')

const router = express.Router();
const userPermissionActuarService = new UserPermissionActuarService();
/**
 * @swagger
 * tags:
 *   name: Permisos de usuarios actuar
 *   description: Operaciones relacionadas a la tabla de user_permissions de actuar sustentable
 */

/**
 * @swagger
 * /actuarPermissions/syncUpUserPermissions:
 *   post:
 *     summary: Sincroniza los permisos de usuario
 *     description: Permite actualizar o asignar permisos a un usuario basado en el ID y tipo de usuario proporcionado. Los permisos se especifican en el cuerpo de la solicitud.
 *     tags: [Permisos de usuarios actuar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID del usuario al que se le asignarán los permisos.
 *               typeUser:
 *                 type: string
 *                 enum: [user, operator]
 *                 description: Tipo de usuario (puede ser "user" o "operator").
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del permiso.
 *                     status:
 *                       type: integer
 *                       description: Estado del permiso (0 o 1).
 *                   required:
 *                     - id
 *                     - status
 *                 description: Lista de permisos con sus estados.
 *             required:
 *               - userId
 *               - typeUser
 *               - permissions
 *           example:
 *             userId: 1
 *             typeUser: operator
 *             permissions:
 *               - id: 1
 *                 status: 1
 *               - id: 2
 *                 status: 0
 *     responses:
 *       201:
 *         description: Permisos de usuario sincronizados exitosamente.
 *       400:
 *         description: Solicitud inválida. Verifica los datos proporcionados.
 *       500:
 *         description: Error interno del servidor.
 */
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