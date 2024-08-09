const express = require('express');
const validatorHandler = require('../../../middelwares/validatorHandler');
const UserActuarService = require('../../../servivces/actuar/usersActuar.service');
const { getUserActuarSchema, createUserActuarSchema, updateUserActuarSchema, getUserPermissionsSchema } = require('../../../schemas/actuar/user.schema');

const router = express.Router();
const userActuarService = new UserActuarService();

router.get('/', async(req, res, next) => {
    try {
        const users = await userActuarService.list(req.query);

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

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