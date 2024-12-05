const mariadb = require('mariadb');

require('dotenv').config();
const pool = mariadb.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT});

try {
    pool.getConnection();
    console.log('Connexion réussie !');
} catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
}

module.exports = pool;