/**
 * @author Cyril Tobler
 * @version 1.0.0
 * @since 23. Februar 2024
 * @description middleware/verification-middleware.js - This file contains middleware
 * that checks whether the user is logged in
 * @see {@link https://github.com/cyriltobler} - GitHub-Profile from Cyril Tobler
 */

// check if user is not logged in
const checkIfNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return next();
};

// check if user is logged in
const checkIfAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/login');
    }
    return next();
};

module.exports.checkIfAuthenticated = checkIfAuthenticated;
module.exports.checkIfNotAuthenticated = checkIfNotAuthenticated;
