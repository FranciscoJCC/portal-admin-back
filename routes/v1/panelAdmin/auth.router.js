const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const validatorHandler = require('./../../../middelwares/validatorHandler');
const { loginSchema } = require('../../../schemas/panelAdmin/auth.schema');

const AuthService = require('../../../servivces/panelAdmin/auth.service');


const router = express.Router();
const authService = new AuthService();

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
