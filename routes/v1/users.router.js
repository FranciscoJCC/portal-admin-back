const express = require('express');
const validatorHandler = require('../../middelwares/validatorHandler');
const UserService = require('./../../servivces/panelAdmin/users.service');
const { getUserSchema, createUserSchema, updateUserSchema } = require('./../../schemas/panelAdmin/user.schema');


const router = express.Router();
const userService = new UserService();

router.get('/', async(req, res, next) => {
    try {
        const users = await userService.list(req.query);

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',
    validatorHandler(getUserSchema, 'params'),
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

router.post('/',
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            console.log("REQc: ", req.body);
            const data = req.body;

            const user = await userService.create(data);

            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }
)

router.patch('/:id',
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
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

router.delete('/',
    validatorHandler(getUserSchema, 'params'),
    async(req, res, next) => {

    }
)

module.exports = router;