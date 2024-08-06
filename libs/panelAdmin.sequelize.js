const { Sequelize } = require('sequelize');
const config = require('../config');

const setupModels = require('../db/models/panel-admin-models');

const USER = encodeURIComponent(config.MYSQL_USER);
const PASSWORD = encodeURIComponent(config.MYSQL_PASSWORD);

const URI = `mysql://${USER}:${PASSWORD}@${config.MYSQL_HOST}:${config.MYSQL_PORT}/${config.MYSQL_DB}`;

const sequelize = new Sequelize(URI, {
    dialect: 'mysql',
    logging: console.log
});

setupModels(sequelize);

module.exports = sequelize;