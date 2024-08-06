const express = require('express');
const { logErrors, ormErrorHandler, boomErrorHandler, errorHandler } = require('../../middelwares/error.handler');

const usersRouter = require('./users.router');
const authRouter = require('./auth.router');

function routerApi(app){
    const router = express.Router();

    app.use('/api/v1', router);

    router.use('/users', usersRouter);
    router.use('/auth', authRouter);

    //Midlewares para api v1
    /* app.use(logErrors);
    app.use(ormErrorHandler);
    app.use(boomErrorHandler);
    app.use(errorHandler); */
}

module.exports = routerApi;