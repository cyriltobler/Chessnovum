const bcrypt = require('bcrypt');

const dbRequest = require('../db/db-request.js');


const createUser = async (userData, callback) => {
    let counter = 0;
    
    if (!userData.username || !userData.email || !userData.password){
        callback(false, 'Geben Sie bitte Benutzername, Email und Passwort an.');
    }

    const user = {
        username: userData.username,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10)
    }

    const query1 = 'SELECT * FROM `user` WHERE `email` = ?;'
    const query2 = 'SELECT * FROM `user` WHERE `username` = ?;'

    dbRequest(query1, [user.email], async (success, results)=>{
		if(!success){
			return callback(false, results);
		}

		// check if user allready exist
    	if(results.length != 0){
    	    return callback(false, "Email bereits vergeben");
    	}
        counter++;
        writeUserInDB(counter, user, callback);
  	});

    dbRequest(query2, [user.username], async (success, results)=>{
		if(!success){
			return callback(false, results);
		}

		// check if user allready exist
    	if(results.length != 0){
    	    return callback(false, "Benutzername bereits vergeben");
    	}
        counter++;
        writeUserInDB(counter, user, callback);
  	});

}

function writeUserInDB(counter, user, callback){
    if(counter < 2) return;

    const query = 'INSERT INTO user SET ?';

    dbRequest(query, user, async (success, results)=>{
		if(!success){
			return callback(false, results);
		}

		callback(true, "Benutzer erstellt")
  	});
}



module.exports = createUser