const config = require('../config');

const USER = encodeURIComponent('soporte');
const PASSWORD = encodeURIComponent('Highmysql1%');

const URI = `mysql://${USER}:${PASSWORD}@192.168.1.107:3306/respaldo_portal_admin`;

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