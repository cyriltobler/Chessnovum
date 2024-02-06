const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const dbRequest = require('../db/db-request.js');


// Set Local Strategy for authentication
const localStrategy = new LocalStrategy(async (email, password, done) => {
  	const query = "SELECT * FROM `user` WHERE `email` = ?;"

	dbRequest(query, [email], async (success, results)=>{
		if(!success){
			return done(results);
		}

		// check if user is found
    	if(results.length === 0){
    	    return done(null, false, { message: 'Benutzer nicht gefunden' });
    	}

		// check password
      	const user = results[0];
      	if(!await bcrypt.compare(password, user.password)){
        	return done(null, false, {message: 'Falsches Passwort'});
      	}else{
        	return done(null, user.ID);
      	}
  	})
});

module.exports = localStrategy