const express = require('express');
const passport = require('passport');
const verifyToken = require('../../../middelwares/verifyToken.handler');
const validatorHandler = require('../../../middelwares/validatorHandler');
const PermissionActuarService = require('../../../servivces/actuar/permissionsActuar.service');
const { getPermissionActuarSchema, createPermissionActuarSchema, updatePermissionActuarSchema} = require('./../../../schemas/actuar/permission.schema');

const router = express.Router();
const permissionActuarService = new PermissionActuarService();

/**
 * @swagger
 * tags:
 *   name: Permisos Actuar
 *   description: Operaciones relacionadas a la tabla de permisos de actuar sustentable
 */

/**
 * @swagger
 * /permissionsActuar:
 *   get:
 *     summary: Obtiene una lista de permisos
 *     description: Retorna una lista de permisos. Puedes utilizar parámetros de consulta para filtrar los resultados o ajustar la paginación.
 *     tags: [Permisos Actuar]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar permisos por nombre.
 *       - in: query
 *         name: active
 *         schema:
 *           type: number
 *         description: Filtrar permisos por estatus (0 o 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *         description: Número de registros por página, por defecto 10.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: number
 *           default: 0
 *         description: Número de registros que se omiten, por defecto 0.
 *     responses:
 *       200:
 *         description: Lista de permisos obtenida exitosamente.
 *         content:
 
 *       400:
 *         description: Solicitud inválida. Verifica los parámetros de consulta proporcionados.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', 
    verifyToken,
    passport.authenticate('jwt', { session: false }),
    async(req, res, next) => {
        try {
            const permissions = await permissionActuarService.list(req.query);

            res.status(200).json(permissions);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @swagger
 * /permissionsActuar/{id}:
 *   get:
 *     summary: Obtiene un permiso específico
 *     description: Recupera un permiso específico basado en su ID. Este endpoint devuelve los detalles del permiso solicitado.
 *     tags: [Permisos Actuar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del permiso a recuperar.
 *     responses:
 *       200:
 *         description: Permiso obtenido exitosamente.
 *       400:
 *         description: Solicitud inválida. El ID proporcionado no es válido.
 *       404:
 *         description: Permiso no encontrado. El ID proporcionado no existe.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id',
    validatorHandler(getPermissionActuarSchema, 'params'),
    verifyToken,
    passport.authenticate('jwt', { session: false }),
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

/**
 * @swagger
 * /permissionsActuar:
 *   post:
 *     summary: Crea un nuevo permiso
 *     description: Permite crear un nuevo permiso en el sistema. Debes proporcionar los detalles necesarios del permiso en el cuerpo de la solicitud.
 *     tags: [Permisos Actuar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               moduleId:
 *                 type: integer
 *                 description: ID del módulo al que pertenece el permiso.
 *               name:
 *                 type: string
 *                 description: Nombre del permiso.
 *               description:
 *                 type: string
 *                 description: Descripción del permiso.
 *             required:
 *               - moduleId
 *               - name
 *             example:
 *               moduleId: 1
 *               name: "Permiso de Lectura"
 *               description: "Permiso que permite la lectura de datos."
 *     responses:
 *       201:
 *         description: Permiso creado exitosamente.
 *       400:
 *         description: Solicitud inválida. Los datos proporcionados no son válidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/',
    validatorHandler(createPermissionActuarSchema, 'body'),
    verifyToken,
    passport.authenticate('jwt', { session: false }),
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

/**
 * @swagger
 * /permissionsActuar/{id}:
 *   patch:
 *     summary: Actualiza un permiso específico
 *     description: Actualiza los detalles de un permiso existente basado en su ID. Solo los campos proporcionados en el cuerpo de la solicitud serán actualizados.
 *     tags: [Permisos Actuar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del permiso que se desea actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               moduleId:
 *                 type: integer
 *                 description: ID del módulo al que pertenece el permiso (opcional).
 *               name:
 *                 type: string
 *                 description: Nombre del permiso (opcional).
 *               description:
 *                 type: string
 *                 description: Descripción del permiso (opcional).
 *               status:
 *                 type: integer
 *                 description: Estado del permiso (opcional). 0 para inactivo, 1 para activo.
 *             example:
 *               moduleId: 2
 *               name: "Permiso de Escritura"
 *               description: "Permiso que permite la escritura de datos."
 *               status: 1
 *     responses:
 *       200:
 *         description: Permiso actualizado exitosamente.
 *       400:
 *         description: Solicitud inválida. Los datos proporcionados no son válidos.
 *       404:
 *         description: Permiso no encontrado. El ID proporcionado no existe.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch('/:id',
    validatorHandler(getPermissionActuarSchema, 'params'),
    validatorHandler(updatePermissionActuarSchema, 'body'),
    verifyToken,
    passport.authenticate('jwt', { session: false }),
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

/**
 * @swagger
 * /permissionsActuar/{id}:
 *   delete:
 *     summary: Elimina un permiso
 *     description: Elimina un permiso específico utilizando su ID. Retorna un mensaje de éxito si la eliminación es exitosa.
 *     tags: [Permisos Actuar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del permiso que se desea eliminar.
 *         example: 1
 *     responses:
 *       200:
 *         description: Permiso eliminado exitosamente.
 *       404:
 *         description: Permiso no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: No se encontró el permiso con el ID proporcionado
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Ocurrió un error al intentar eliminar el permiso
 */
router.delete('/:id',
    validatorHandler(getPermissionActuarSchema, 'params'),
    verifyToken,
    passport.authenticate('jwt', { session: false }),
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