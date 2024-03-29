/**
 * @author Cyril Tobler
 * @version 1.0.0
 * @since 23. Februar 2024
 * @description auth/local-strategy.js - The local strategy is defined in this file
 * @see {@link https://github.com/cyriltobler} - GitHub-Profile from Cyril Tobler
 */

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const dbRequest = require('../db/db-request');

// Set Local Strategy for authentication
const localStrategy = new LocalStrategy(async (email, password, done) => {
    // search user in DB
    const query = 'SELECT * FROM `user` WHERE `email` = ?;';
    dbRequest(query, [email], async (success, results) => {
        if (!success) {
            return done(results);
        }

        // check if user is found
        if (results.length === 0) {
            return done(null, false, { message: 'Benutzer nicht gefunden' });
        }

        // check password
        const user = results[0];
        if (!await bcrypt.compare(password, user.password)) {
            return done(null, false, { message: 'Falsches Passwort' });
        }
        return done(null, user.ID);
    });
});

module.exports = localStrategy;
