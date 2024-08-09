const express = require('express');
const passport = require('passport');
const verifyToken = require('../../../middelwares/verifyToken.handler');
const validatorHandler = require('../../../middelwares/validatorHandler');
const ModuleActuarService = require('../../../servivces/actuar/modulesActuar.service');
const { getModuleActuarSchema, createModuleActuarSchema, updateModuleActuarSchema } = require('../../../schemas/actuar/module.schema');

const router = express.Router();
const moduleActuarService = new ModuleActuarService();
/**
 * @swagger
 * tags:
 *   name: Módulos Actuar
 *   description: Operaciones relacionadas a la tabla de módulos de actuar sustentable
 */


/**
 * @swagger
 * /modulesActuar:
 *   get:
 *     summary: Lista todos los módulos
 *     description: Obtiene una lista de todos los módulos disponibles. Puedes filtrar los resultados usando parámetros de consulta opcionales.
 *     tags: [Módulos Actuar]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar los módulos por nombre.
 *       - in: query
 *         name: active
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *         description: Filtrar los módulos por estado (0 para inactivo, 1 para activo).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de registros por página. Valor predeterminado es 10.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Número de registros a omitir. Valor predeterminado es 0.
 *     responses:
 *       200:
 *         description: Lista de módulos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del módulo.
 *                   name:
 *                     type: string
 *                     description: Nombre del módulo.
 *                   status:
 *                     type: integer
 *                     description: Estado del módulo (0 para inactivo, 1 para activo).
 *                   description:
 *                     type: string
 *                     description: Descripción del módulo.
 *                 required:
 *                   - id
 *                   - name
 *                   - status
 *               example:
 *                 - id: 1
 *                   name: "Módulo de Gestión"
 *                   status: 1
 *                   description: "Módulo para la gestión de usuarios y permisos."
 *                 - id: 2
 *                   name: "Módulo de Reportes"
 *                   status: 0
 *                   description: "Módulo para generar reportes."
 *       400:
 *         description: Solicitud inválida. Los parámetros de consulta no son válidos.
 *       500:
 *         description: Error interno del servidor.
 */
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

/**
 * @swagger
 * /modulesActuar/modulesWPermissions:
 *   get:
 *     summary: Obtiene módulos con sus permisos asociados
 *     description: Retorna una lista de módulos junto con sus permisos asociados. Este endpoint no requiere parámetros de consulta.
 *     tags: [Módulos Actuar]
 *     responses:
 *       200:
 *         description: Lista de módulos con permisos asociados obtenida exitosamente.
 *       500:
 *         description: Error interno del servidor.
 */
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

/**
 * @swagger
 * /modulesActuar/{id}:
 *   get:
 *     summary: Obtiene un módulo por ID
 *     description: Retorna los detalles de un módulo específico basado en su ID.
 *     tags: [Módulos Actuar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del módulo que se desea obtener.
 *     responses:
 *       200:
 *         description: Módulo obtenido exitosamente.
 *       404:
 *         description: Módulo no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
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

/**
 * @swagger
 * /modulesActuar:
 *   post:
 *     summary: Crea un nuevo módulo
 *     description: Crea un nuevo módulo con los datos proporcionados.
 *     tags: [Módulos Actuar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del nuevo módulo.
 *                 example: "Gestión de Proyectos"
 *               description:
 *                 type: string
 *                 description: Descripción del nuevo módulo.
 *                 example: "Módulo para la gestión y seguimiento de proyectos."
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Módulo creado exitosamente.
 *       400:
 *         description: Solicitud incorrecta. Los datos proporcionados no son válidos.
 *       500:
 *         description: Error interno del servidor.
 */
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

/**
 * @swagger
 * /modulesActuar/{id}:
 *   patch:
 *     summary: Actualiza un módulo existente
 *     description: Actualiza los detalles de un módulo existente con los datos proporcionados.
 *     tags: [Módulos Actuar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del módulo a actualizar.
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del módulo.
 *                 example: "Gestión de Proyectos"
 *               description:
 *                 type: string
 *                 description: Nueva descripción del módulo.
 *                 example: "Actualización para la gestión y seguimiento de proyectos."
 *               status:
 *                 type: integer
 *                 description: Nuevo estado del módulo (por ejemplo, 0 para inactivo, 1 para activo).
 *                 example: 1
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Módulo actualizado exitosamente.
 *       400:
 *         description: Solicitud incorrecta. Los datos proporcionados no son válidos.
 *       404:
 *         description: Módulo no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
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

/**
 * @swagger
 * /modulesActuar/{id}:
 *   delete:
 *     summary: Elimina un módulo existente
 *     description: Elimina un módulo específico identificado por su ID. Retorna un mensaje de éxito si la eliminación es exitosa.
 *     tags: [Módulos Actuar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del módulo a eliminar.
 *         example: 1
 *     responses:
 *       200:
 *         description: Módulo eliminado exitosamente.
 *       404:
 *         description: Módulo no encontrado. El ID proporcionado no corresponde a ningún módulo existente.
 *       500:
 *         description: Error interno del servidor.
 */
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