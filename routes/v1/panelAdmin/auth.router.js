const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const validatorHandler = require('./../../../middelwares/validatorHandler');
const { loginSchema } = require('../../../schemas/panelAdmin/auth.schema');

const AuthService = require('../../../servivces/panelAdmin/auth.service');


const router = express.Router();
const authService = new AuthService();

/**
 * @swagger
 * tags:
 *   name: Login Panel Admin
 *   description: Operaciones relacionadas a la autenticación del sistema Panel Admin
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión y retorna un token de autenticación
 *     description: Permite a los usuarios autenticarse con su correo electrónico y contraseña, y retorna un token JWT si las credenciales son válidas.
 *     tags: [Login Panel Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: mypassword123
 *     responses:
 *       200:
 *         description: Token de autenticación retornado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT de autenticación.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTIzNDU2Nzg5LCJleHBpcmV0aW9uIjoiMTYyMzg1MjM0NTY3IiwiaWF0X3N0YWZ0IjoiZXlKaGJHY2lPaUpGVG1JME5qRTFOVGM1T0RnMk1UQTRPRGd5TlRFeE5tOXRkR0Z5TG5wMk1qRXhNeXdnUFQwOFBTME5Udz09IiwiaWF0aGVuX3Bhc3N3b3JkIjoiIiwiY2VydGlmaWNhdGVzIjoidXNlcjFfYWNjZXNzIiwicm9sZSI6ImFkbWluIn0.5q_PkJw5AiJ5PtD-l0tI6gq2l4PYI2jmkVYExni2Z2t7r7p8k29V5KABc5uow1X9
 *       400:
 *         description: Solicitud inválida, puede ser debido a credenciales incorrectas o formato incorrecto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: Credenciales inválidas
 *       401:
 *         description: No autorizado, credenciales incorrectas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: Usuario o contraseña incorrectos
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: Ocurrió un error al procesar la solicitud
 */
router.post('/login',
    validatorHandler(loginSchema, 'body'),
    passport.authenticate('local', { session: false}),
    async(req, res, next)=>{
        try {
            const user = req.user;
            
            res.status(200).json(authService.signToken(user));
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
