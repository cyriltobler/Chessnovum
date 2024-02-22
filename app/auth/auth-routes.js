const express = require('express');

const router = express.Router();
const path = require('path');

const passport = require('./passport-config');
const createUser = require('./create-user');
const verification = require('../middleware/verification-middleware');

const VIEW_PATH = '../../view/';

// send login page
router.get('/login', verification.checkIfNotAuthenticated, (req, res) => {
    const filePath = path.join(__dirname, VIEW_PATH, '/auth/login.ejs');
    res.render(filePath);
});
// send register page
router.get('/register', verification.checkIfNotAuthenticated, (req, res) => {
    const filePath = path.join(__dirname, VIEW_PATH, '/auth/registration.ejs');
    res.render(filePath);
});
// log user in
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login/',
    failureFlash: true,
}));
// register user
router.post('/register', (req, res) => {
    let allReadySended = false;
    createUser(req.body, (success, results) => {
        if (!allReadySended) res.send(results);
        allReadySended = true;
    });
});
// log user out
router.delete('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { res.status(500).send(); }
    });
    res.status(204).send();
});

module.exports = router;
