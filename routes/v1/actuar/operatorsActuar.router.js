const express = require('express');
const validatorHandler = require('../../../middelwares/validatorHandler');
const OperatorActuarService = require('../../../servivces/actuar/operatorsActuar.service');
const { getOperatorActuarSchema, createOperatorActuarSchema, updateOperatorActuarSchema } = require('../../../schemas/actuar/operator.schema');

const router = express.Router();
const operatorActuarService = new OperatorActuarService();

router.get('/', async(req, res, next) => {
    try {
        const users = await operatorActuarService.list(req.query);

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

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

router.patch('/updateProfileImage/:id',
    validatorHandler(getOperatorActuarSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.file;
            console.log(req.file);

            res.status(200).json(data);
        } catch (error) {
            
        }
    }
)

module.exports = router;