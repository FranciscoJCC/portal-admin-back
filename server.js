const express = require('express');
const config = require('./config');
const routerApi = require('./routes/v1/index');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middelwares/error.handler');
var opts;
var requiredHttps = 'http';
const API_PORT = config.API_PORT;

/* console.log("user",config.MYSQL_USER); */
var app = express();
app.use(express.json());

const server = require(requiredHttps).createServer(opts, app);

app.get('/api', (req, res) => {
    res.send("Servidor funcionando correctamente");
})

//Auth
require('./utils/auth')

routerApi(app);

//Middlewares, deben ir despues del routerApi
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

server.listen(API_PORT, () => {
    console.log(`Listening at: http://localhost:${API_PORT}/api`);
});