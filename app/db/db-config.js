/**
 * @author Cyril Tobler
 * @version 1.0.0
 * @since 23. Februar 2024
 * @description db/db-config.js - The login data for the database is defined in this file
 * @see {@link https://github.com/cyriltobler} - GitHub-Profile from Cyril Tobler
 */

const mysql = require('mysql');
require('dotenv').config();

// config for DB
const pool = mysql.createPool({
    host: 'db',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'ChessAppDatabase',
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0,
});

module.exports = pool;
