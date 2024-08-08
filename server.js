const express = require('express');
const config = require('./config');
const cors = require('cors');
const routerApi = require('./routes/v1/index');

var opts;
var requiredHttps = 'http';
const API_PORT = config.API_PORT;


var app = express();
app.use(cors()); //Agregar ips
app.use(express.json());

const server = require(requiredHttps).createServer(opts, app);

app.get('/api', (req, res) => {
    res.send("Servidor funcionando correctamente");
})

//Auth
require('./utils/auth')
//Router API    
routerApi(app);


if(config.NODE_ENV == 'dev'){
    console.log("API MODE ENV");
}

server.listen(API_PORT, () => {
    console.log(`Listening at: ${config.PATH_SERVER}:${API_PORT}/api`);
});