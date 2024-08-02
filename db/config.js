const config = require('../config');

const USER = encodeURIComponent(config.MYSQL_USER);
const PASSWORD = encodeURIComponent(config.MYSQL_PASSWORD);

const URI = `mysql://${USER}:${PASSWORD}@${config.MYSQL_HOST}:${config.MYSQL_PORT}/${config.MYSQL_DB_ACTUAR}`;

module.exports = {
    development: {
        url: URI,
        dialect: 'mysql'
    },
    production : {
        url: URI,
        dialect: 'mysql'
    }
}