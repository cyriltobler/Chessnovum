/**
 * @author Cyril Tobler
 * @version 1.0.0
 * @since 23. Februar 2024
 * @description db/db-request.js - This file contains the normal function for the db-request
 * @see {@link https://github.com/cyriltobler} - GitHub-Profile from Cyril Tobler
 */

const pool = require('./db-config');

// standard DB request
const dbRequest = (query, data, callback) => {
    pool.getConnection((error, connection) => {
        if (error) {
            return callback(false, error);
        }

        connection.query(query, data, async (queryError, results) => {
            // stop db connection
            connection.release();

            if (queryError) {
                return callback(false, queryError);
            }
            return callback(true, results);
        });
    });
};

module.exports = dbRequest;
