const pool = require('../config/db-config.js');


const dbRequest = (query, data, callback) => {
    pool.getConnection((error, connection) => {
        if(error){
            callback(false, error);
        }
    
        connection.query(query, data, async function (error, results, fields) {
            // stop db connection
            connection.release();

            if(error){
                callback(false, error);
            }
            console.log(results)
            callback(true, results);
        });
    });
}



module.exports = dbRequest