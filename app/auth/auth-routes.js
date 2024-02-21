const express = require('express');
const router = express.Router();
const path = require('path');

const passport = require('./passport-config.js');
const createUser = require('./create-user.js');
const verification = require('../middleware/verification-middleware.js')

const VIEW_PATH = '../../view/';

router.get('/login', verification.checkIfNotAuthenticated, (req, res) => {
    const filePath = path.join(__dirname, VIEW_PATH, '/auth/login.ejs');
    res.render(filePath);
});
router.get('/register', verification.checkIfNotAuthenticated, (req, res) => {
    const filePath = path.join(__dirname, VIEW_PATH, '/auth/registration.ejs');
    res.render(filePath);
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login/',
    failureFlash: true
}));
router.post('/register', (req, res)=>{
    createUser(req.body, (success, results) => {
        res.send(results)
    })
});
router.delete('/logout', (req, res)=>{
    req.logout((err) => {
        if (err) { return next(err); }
    });
    res.status(204);
});





module.exports = router;