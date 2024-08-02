const express = require('express');
const config = require('./config');

var opts;
var requiredHttps = 'http';
const API_PORT = config.API_PORT;

console.log(API_PORT);
var app = express();

const server = require(requiredHttps).createServer(opts, app);

app.get('/api', (req, res) => {
    res.send("Servidor funcionando correctamente");
})

server.listen(8098, () => {
    console.log('Listening at: http://localhost:8098/api');
});