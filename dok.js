


passport.serializeUser(function (user, done) {
    return done(null, user);
});

passport.deserializeUser(function (id, done) {
    // get userdata from db
    return done(null, user);
});


const localStrategy = new LocalStrategy(async (email, password, done) => {
    // check user login
  	return done(null, user.ID);
});
passport.use(localStrategy);






