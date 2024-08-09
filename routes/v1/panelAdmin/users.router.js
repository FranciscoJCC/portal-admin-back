const express = require('express');
const validatorHandler = require('../../../middelwares/validatorHandler');
const passport = require('passport');
const verifyToken = require('../../../middelwares/verifyToken.handler');
const UserService = require('../../../servivces/panelAdmin/users.service');
const { getUserSchema, createUserSchema, updateUserSchema } = require('../../../schemas/panelAdmin/user.schema');


const router = express.Router();
const userService = new UserService();

/**
 * @swagger
 * tags:
 *   name: Usuarios Panel Admin
 *   description: Operaciones relacionadas a la tabla de usuarios de panel admin
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene una lista de usuarios de panel admin
 *     description: Retorna una lista de usuarios. Requiere autenticación con un token JWT válido.
 *     tags: [Usuarios Panel Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar usuarios por nombre.
 *       - in: query
 *         name: status
 *         schema:
 *           type: number
 *         description: Filtrar usuarios por estatus (0, 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Número de registros por página. Por defecto 10.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: number
 *         description: Número de registros a omitir. Por defecto 0.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito.
 *       401:
 *         description: No autorizado. Token JWT inválido o ausente.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/',
    verifyToken,
    passport.authenticate('jwt', { session: false }), 
    async(req, res, next) => {
        try {
            const users = await userService.list(req.query);

            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     description: Retorna la información de un usuario basado en su ID. Requiere autenticación con un token JWT válido.
 *     tags: [Usuarios Panel Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a obtener.
 *     responses:
 *       200:
 *         description: Usuario encontrado con éxito.
 *       401:
 *         description: No autorizado. Token JWT inválido o ausente.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id',
    validatorHandler(getUserSchema, 'params'),
    verifyToken,
    passport.authenticate('jwt', { session: false }), 
    async(req, res, next) => {
        try {
            const { id } = req.params;

            const user = await userService.findOne(id);

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Permite crear un nuevo usuario en el sistema. Todos los campos son obligatorios.
 *     tags: [Usuarios Panel Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: Apellido del usuario
 *                 example: "Doe"
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del usuario
 *                 example: "1234567890"
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "securePassword123"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Solicitud incorrecta. Datos inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/',
    validatorHandler(createUserSchema, 'body'),
    verifyToken,
    passport.authenticate('jwt', { session: false }), 
    async (req, res, next) => {
        try {
            
            const data = req.body;

            const user = await userService.create(data);

            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }
)

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Actualiza un usuario existente
 *     description: Permite actualizar la información de un usuario existente basado en su ID.
 *     tags: [Usuarios Panel Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: Apellido del usuario
 *                 example: "Doe"
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del usuario
 *                 example: "1234567890"
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "newSecurePassword123"
 *               status:
 *                 type: number
 *                 description: Estado del usuario
 *                 example: 1
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Solicitud incorrecta. Datos inválidos.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch('/:id',
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    verifyToken,
    passport.authenticate('jwt', { session: false }), 
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const user = await userService.update(id, body);

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
)

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario existente
 *     description: Permite eliminar un usuario basado en su ID. El usuario será desactivado en lugar de eliminarse físicamente.
 *     tags: [Usuarios Panel Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar.
 *     responses:
 *       200:
 *         description: Usuario desactivado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/:id',
    validatorHandler(getUserSchema, 'params'),
    verifyToken,
    passport.authenticate('jwt', { session: false }), 
    async(req, res, next) => {
        try {
            const { id } = req.params;

            const user = await userService.delete(id);

            res.status(200).json({ "status" : true, "message" : `El usuario con id: ${user.id} se ha desactivado`})
        } catch (error) {
        next(error);   
        }
    }
)

module.exports = router;