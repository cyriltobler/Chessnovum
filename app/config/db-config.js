const mysql = require('mysql');
require('dotenv').config();


const pool = mysql.createPool({
    host: 'db',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'ChessAppDatabase',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
});

module.exports = pool;