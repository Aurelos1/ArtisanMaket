const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    port: 3307,
});

module.exports = pool;