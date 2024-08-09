const express = require('express');
const { logErrors, ormErrorHandler, boomErrorHandler, errorHandler } = require('../../middelwares/error.handler');

const usersRouter = require('./panelAdmin/users.router');
const authRouter = require('./panelAdmin/auth.router');
//Actuar
const usersActuarRouter = require('./actuar/usersActuar.router');
const operatorsActuarRouter = require('./actuar/operatorsActuar.router');
const permissionsActuarRouter = require('./actuar/permissionsActuar.router');
const modulesActuarRouter = require('./actuar/modulesActuar.router');
const userPermissionActuarRouter = require('./actuar/userPermissionsActuar.router');

function routerApi(app){
    const router = express.Router();

    app.use('/api/v1', router);

    router.use('/users', usersRouter);
    router.use('/auth', authRouter);
    //Actuar
    router.use('/usersActuar', usersActuarRouter);
    router.use('/operatorsActuar', operatorsActuarRouter);
    router.use('/permissionsActuar', permissionsActuarRouter);
    router.use('/modulesActuar', modulesActuarRouter);
    router.use('/actuarPermissions', userPermissionActuarRouter);

    //Midlewares para api v1
    app.use(logErrors);
    app.use(ormErrorHandler);
    app.use(boomErrorHandler);
    app.use(errorHandler);
}

module.exports = routerApi;