const express = require('express');
const validatorHandler = require('../../../middelwares/validatorHandler');
const validateFileHandler = require('../../../middelwares/validateFile.handler');
const { uploadFiles, returnPath } = require('../../../utils/multer');
const OperatorActuarService = require('../../../servivces/actuar/operatorsActuar.service');
const { getOperatorActuarSchema, createOperatorActuarSchema, updateOperatorActuarSchema } = require('../../../schemas/actuar/operator.schema');


const router = express.Router();
const operatorActuarService = new OperatorActuarService();

/**
 * @swagger
 * tags:
 *   name: Operadores Actuar
 *   description: Operaciones relacionadas a la tabla de operadores de actuar sustentable
 */

/**
 * @swagger
 * /operatorsActuar:
 *   get:
 *     summary: Obtiene una lista de operadores
 *     description: Retorna una lista de operadores. Puedes filtrar la lista usando parámetros de consulta opcionales para nombre, estatus, y paginación.
 *     tags: [Operadores Actuar]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtra los operadores por nombre.
 *       - in: query
 *         name: active
 *         schema:
 *           type: integer
 *         description: Filtra los operadores por estatus (0 o 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de registros por página. Valor por defecto es 10.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Número de registros a omitir para la paginación. Valor por defecto es 0.
 *     responses:
 *       200:
 *         description: Lista de operadores.
 *       400:
 *         description: Solicitud inválida. Verifica los parámetros de consulta.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', async(req, res, next) => {
    try {
        const users = await operatorActuarService.list(req.query);

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /operatorsActuar:
 *   post:
 *     summary: Crea un nuevo operador
 *     description: Permite crear un nuevo operador en el sistema. Se deben proporcionar todos los datos necesarios en el cuerpo de la solicitud.
 *     tags: [Operadores Actuar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del operador.
 *               lastName:
 *                 type: string
 *                 description: Apellido del operador.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del operador.
 *               type:
 *                 type: string
 *                 description: Tipo de operador (por ejemplo, 'OPERADOR' o 'MANIOBRISTA').
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del operador.
 *               password:
 *                 type: string
 *                 description: Contraseña del operador.
 *               empId:
 *                 type: integer
 *                 description: ID del empleado asociado al operador.
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del operador.
 *               slack:
 *                 type: string
 *                 description: Identificador de Slack del operador.
 *               profileImage:
 *                 type: string
 *                 description: URL de la imagen de perfil del operador.
 *               license:
 *                 type: string
 *                 description: Licencia del operador.
 *               licenseType:
 *                 type: string
 *                 description: Tipo de licencia del operador.
 *               apto:
 *                 type: string
 *                 description: Aptitud del operador.
 *               dateAdmission:
 *                 type: string
 *                 format: date
 *                 description: Fecha de admisión del operador.
 *             example:
 *               name: John
 *               lastName: Doe
 *               email: john.doe@example.com
 *               type: OPERADOR
 *               username: john_doe
 *               password: securepassword
 *               empId: 123
 *               phone: "1234567890"
 *               slack: john_doe_slack
 *               profileImage: http://example.com/profile.jpg
 *               license: ABC123
 *               licenseType: Full
 *               apto: Yes
 *               dateAdmission: 2024-08-06
 *     responses:
 *       201:
 *         description: Operador creado exitosamente.
 *       400:
 *         description: Solicitud inválida. Verifica los datos proporcionados.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/',
    validatorHandler(createOperatorActuarSchema, 'body'), 
    async(req, res, next) => {
        try {
            const data = req.body;

            const newOperator = await operatorActuarService.create(data);

            res.status(201).json(newOperator);
        } catch (error) {
            next(error);
        }
    }
)

/**
 * @swagger
 * /operatorsActuar/{id}:
 *   patch:
 *     summary: Actualiza un operador existente
 *     description: Permite actualizar los datos de un operador específico en el sistema. El ID del operador se pasa como parámetro en la URL, y los datos a actualizar se envían en el cuerpo de la solicitud.
 *     tags: [Operadores Actuar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *         description: ID del operador que se desea actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del operador.
 *               lastName:
 *                 type: string
 *                 description: Apellido del operador.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del operador.
 *               type:
 *                 type: string
 *                 description: Tipo de operador (por ejemplo, 'OPERADOR' o 'MANIOBRISTA').
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del operador.
 *               password:
 *                 type: string
 *                 description: Contraseña del operador.
 *               empId:
 *                 type: integer
 *                 description: ID del empleado asociado al operador.
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del operador.
 *               slack:
 *                 type: string
 *                 description: Identificador de Slack del operador.
 *               status:
 *                 type: integer
 *                 description: Estado del operador (0 o 1).
 *               profileImage:
 *                 type: string
 *                 description: URL de la imagen de perfil del operador.
 *               license:
 *                 type: string
 *                 description: Licencia del operador.
 *               licenseType:
 *                 type: string
 *                 description: Tipo de licencia del operador.
 *               apto:
 *                 type: string
 *                 description: Aptitud del operador.
 *               dateAdmission:
 *                 type: string
 *                 format: date
 *                 description: Fecha de admisión del operador.
 *             example:
 *               name: John
 *               lastName: Doe
 *               email: john.doe@example.com
 *               type: OPERADOR
 *               username: john_doe
 *               password: newpassword
 *               empId: 123
 *               phone: "1234567890"
 *               slack: john_doe_slack
 *               status: 1
 *               profileImage: http://example.com/profile.jpg
 *               license: XYZ789
 *               licenseType: Temporary
 *               apto: Yes
 *               dateAdmission: 2024-08-06
 *     responses:
 *       200:
 *         description: Operador actualizado exitosamente.
 *       400:
 *         description: Solicitud inválida. Verifica los datos proporcionados.
 *       404:
 *         description: Operador no encontrado con el ID proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch('/:id',
    validatorHandler(getOperatorActuarSchema, 'params'),
    validatorHandler(updateOperatorActuarSchema, 'body'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;

            const operator = await operatorActuarService.update(id, body);

            res.status(200).json(operator);
        } catch (error) {
            next(error);
        }
    }
)

/**
 * @swagger
 * /operatorsActuar/updateProfileImage/{id}:
 *   patch:
 *     summary: Actualiza la imagen de perfil de un operador
 *     description: Permite actualizar la imagen de perfil de un operador específico. El ID del operador se pasa como parámetro en la URL, y el archivo de imagen se envía en el cuerpo de la solicitud.
 *     tags: [Operadores Actuar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *         description: ID del operador cuyo perfil se desea actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Archivo de imagen para la actualización del perfil.
 *             required:
 *               - files
 *           example:
 *             files:
 *               - profile_image.jpg
 *     responses:
 *       200:
 *         description: Imagen de perfil actualizada exitosamente.
 *       400:
 *         description: Solicitud inválida. Verifica los datos proporcionados.
 *       404:
 *         description: Operador no encontrado con el ID proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch('/updateProfileImage/:id',
    uploadFiles.array('files'),
    validatorHandler(getOperatorActuarSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const file = req.files[0];

            const updateOperator = await operatorActuarService.updateProfileImage(id, file.filename);

            res.status(200).json(updateOperator);
        } catch (error) {
            next(error)
        }
    }
)

/**
 * @swagger
 * /getProfileImage:
 *   post:
 *     summary: Obtiene la imagen de perfil
 *     description: Permite obtener una imagen de perfil a partir del nombre del archivo proporcionado en el cuerpo de la solicitud. La imagen se devuelve en la respuesta.
 *     tags: [Operadores Actuar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filename:
 *                 type: string
 *                 description: Nombre del archivo de la imagen de perfil que se desea obtener.
 *             required:
 *               - filename
 *           example:
 *             filename: profile_image.jpg
 *     responses:
 *       200:
 *         description: Imagen de perfil obtenida exitosamente.
 *       400:
 *         description: Solicitud inválida. Verifica el nombre del archivo proporcionado.
 *       404:
 *         description: Imagen de perfil no encontrada con el nombre de archivo proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/getProfileImage',
    validateFileHandler,
    async (req, res, next) => {
        try {
            const file = req.body.filename;
            
            res.sendFile(await returnPath(file));
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;