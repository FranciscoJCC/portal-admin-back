const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    API_PORT: process.env.API_PORT || 8098,
    MYSQL_USER: process.env.MYSQL_USER || '',
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '',
    MYSQL_HOST: process.env.MYSQL_HOST || '',
    MYSQL_PORT: process.env.MYSQL_PORT || '',
    MYSQL_DB_ACTUAR : process.env.MYSQL_DB_ACTUAR || ''
}