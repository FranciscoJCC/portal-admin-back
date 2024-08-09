const { Sequelize } = require('sequelize');
const config = require('../config');

const setupModelsActuar = require('../db/models/actuar-models');

const USER = encodeURIComponent(config.MYSQL_USER);
const PASSWORD = encodeURIComponent(config.MYSQL_PASSWORD);

const URI = `mysql://${USER}:${PASSWORD}@${config.MYSQL_HOST}:${config.MYSQL_PORT}/${config.MYSQL_DB_ACTUAR}`;

const sequelize = new Sequelize(URI, {
    dialect: 'mysql',
    logging: console.log
});

setupModelsActuar(sequelize);

module.exports = sequelize;