const pool = require('./db-config');

const dbRequest = (query, data, callback) => {
    pool.getConnection((error, connection) => {
        if (error) {
            callback(false, error);
        }

        connection.query(query, data, async (queryError, results) => {
            // stop db connection
            connection.release();

            if (queryError) {
                callback(false, queryError);
            }
            callback(true, results);
        });
    });
};

module.exports = dbRequest;
