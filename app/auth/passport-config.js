/**
 * @author Cyril Tobler
 * @version 1.0.0
 * @since 23. Februar 2024
 * @description auth/passport-config.js - The standard functions of passport.js are
 * implemented in this file
 * @see {@link https://github.com/cyriltobler} - GitHub-Profile from Cyril Tobler
 */

const passport = require('passport');
const dbRequest = require('../db/db-request');

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((id, done) => {
    const query = 'SELECT * FROM `user` WHERE `id` = ?;';

    dbRequest(query, [id], async (success, results) => {
        if (!success) {
            return done(null, false, results);
        }

        // check if user is found
        if (results.length === 0) {
            return done(null, false, { message: 'Benutzer nicht gefunden' });
        }
        return done(null, results[0]);
    });
});

// load all strategy
const localStrategy = require('./local-strategy');

passport.use(localStrategy);
module.exports = passport;
