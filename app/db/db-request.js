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
