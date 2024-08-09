const express = require('express');
const validatorHandler = require('../../../middelwares/validatorHandler');
const UserActuarService = require('../../../servivces/actuar/usersActuar.service');
const { getUserActuarSchema, createUserActuarSchema, updateUserActuarSchema, getUserPermissionsSchema } = require('../../../schemas/actuar/user.schema');

const router = express.Router();
const userActuarService = new UserActuarService();

/**
 * @swagger
 * tags:
 *   name: Usuarios Actuar
 *   description: Operaciones relacionadas a la tabla de usuarios de actuar sustentable
 */


/**
 * @swagger
 * /usersActuar:
 *   get:
 *     summary: Lista de usuarios
 *     description: Retorna la lista de usuarios. Opcional, puedes filtrar por nombre y estatus. Ademas de modificar la paginación.
 *     tags: [Usuarios Actuar]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrar los usuarios por nombre
 *       - in: query
 *         name: active
 *         schema:
 *           type: integer
 *         description: Filtrar los usuarios por estatus (0, 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Numero de registros por pagina, default 10
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Numero de registros que se omiten, default 0
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', async(req, res, next) => {
    try {
        const users = await userActuarService.list(req.query);

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /usersActuar/permissionsByUser/{id}/{typeUser}:
 *   get:
 *     summary: Lista de permisos por usuario 
 *     description: Retorna la lista de permisos e indica si lo tiene asignado o no
 *     tags: [Usuarios Actuar]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         description: ID del usuario u operador
 *       - in: path
 *         name: typeUser
 *         schema:
 *           type: string
 *         description: user / operator
 *     responses:
 *       200:
 *         description: Lista de permisos por usuario
 */
router.get('/permissionsByUser/:id/:typeUser',
    validatorHandler(getUserPermissionsSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params
            const { typeUser } = req.params;
            
            const permissions = await userActuarService.permissionsByUser(id, typeUser);

            res.status(200).json(permissions);
        } catch (error) {
            next(error);
        }
    }
)

/**
 * @swagger
 * /usersActuar:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Crea un nuevo usuario en el sistema. Los campos obligatorios deben ser proporcionados. 
 *     tags: [Usuarios Actuar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario.
 *               lastName:
 *                 type: string
 *                 description: Apellido del usuario.
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del usuario.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario.
 *               username:
 *                 type: string
 *                 description: Nombre de usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *               slack:
 *                 type: string
 *                 description: Identificador de Slack del usuario.
 *             required:
 *               - name
 *               - lastName
 *               - phone
 *               - username
 *               - password
 *             example:
 *               name: John
 *               lastName: Doe
 *               phone: "1234567890"
 *               email: john.doe@example.com
 *               username: john_doe
 *               password: secretpassword
 *               slack: john_doe_slack
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *       400:
 *         description: Solicitud inválida. Los datos proporcionados no son válidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/',
    validatorHandler(createUserActuarSchema, 'body'), 
    async(req, res, next) => {
        try {
            const data = req.body;

            const newUser = await userActuarService.create(data);

            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }
)


/**
 * @swagger
 * /usersActuar/{id}:
 *   patch:
 *     summary: Actualiza un usuario
 *     description: Permite actualizar los detalles de un usuario existente. Se requiere proporcionar el ID del usuario en la ruta y los datos que se desean actualizar en el cuerpo de la solicitud.
 *     tags: [Usuarios Actuar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               slack:
 *                 type: string
 *               active:
 *                 type: integer
 *                 example: 1
 *             example:
 *               name: John
 *               lastName: Doe
 *               phone: "1234567890"
 *               email: john.doe@example.com
 *               username: john_doe
 *               password: newpassword123
 *               slack: john_doe_slack
 *               active: 1
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Solicitud inválida. Verifica los datos proporcionados.
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id',
    validatorHandler(getUserActuarSchema, 'params'),
    validatorHandler(updateUserActuarSchema, 'body'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const user = await userActuarService.update(id, body);

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
)


module.exports = router;