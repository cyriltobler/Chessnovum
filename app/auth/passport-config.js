const passport = require('passport');
const dbRequest = require('../config/db-request.js');


passport.serializeUser(function (user, done) {
    return done(null, user);
});

passport.deserializeUser(function (id, done) {
    console.log(id)
    const query = "SELECT * FROM `user` WHERE `id` = ?;"

	dbRequest(query, [id], async (success, results)=>{
		if(!success){
			return done(null, false, results);
		}

		// check if user is found
    	if(results.length === 0){
    	    return done(null, false, { message: 'Benutzer nicht gefunden' });
    	}
        return done(null, results);
  	});
});


//load all strategy
const localStrategy = require('./local-strategy.js');
passport.use(localStrategy);

module.exports = passport;