/**
 * @author Cyril Tobler
 * @version 1.0.0
 * @since 23. Februar 2024
 * @description auth/create-user.js - A new user is created in this file
 * @see {@link https://github.com/cyriltobler} - GitHub-Profile from Cyril Tobler
 */

const bcrypt = require('bcrypt');
const dbRequest = require('../db/db-request');

function writeUserInDB(counter, user, callback) {
    if (counter < 2) return;

    // write the new user in the DB
    const query = 'INSERT INTO user SET ?';
    dbRequest(query, user, async (success, results) => {
        if (!success) {
            return callback(false, results);
        }

        return callback(true, 'Benutzer erstellt');
    });
}

const createUser = async (userData, callback) => {
    let counter = 0;

    if (!userData.username || !userData.email || !userData.password) {
        callback(false, 'Geben Sie bitte Benutzername, Email und Passwort an.');
    }

    // prepare userdata and hash passwort
    const user = {
        username: userData.username,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
    };

    // check if username or email allready exist
    const query1 = 'SELECT * FROM `user` WHERE `email` = ?;';
    const query2 = 'SELECT * FROM `user` WHERE `username` = ?;';

    dbRequest(query1, [user.email], async (success, results) => {
        if (!success) {
            return callback(false, results);
        }

        if (results.length !== 0) {
            return callback(false, 'Email bereits vergeben');
        }
        counter++;
        return writeUserInDB(counter, user, callback);
    });
    dbRequest(query2, [user.username], async (success, results) => {
        if (!success) {
            return callback(false, results);
        }

        if (results.length !== 0) {
            return callback(false, 'Benutzername bereits vergeben');
        }
        counter++;
        return writeUserInDB(counter, user, callback);
    });
};

module.exports = createUser;
