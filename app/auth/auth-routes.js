const express = require('express');
const router = express.Router();
const path = require('path');

const passport = require('./passport-config.js');
const createUser = require('./create-user.js');
const verification = require('../middleware/verification-middleware.js')

router.get('/login', verification.checkIfNotAuthenticated, (req, res) => {
    const filePath = path.join(__dirname, '../../view/auth/login.ejs');
    res.render(filePath);
});
router.get('/register', verification.checkIfNotAuthenticated, (req, res) => {
    const filePath = path.join(__dirname, '../../view/auth/registration.ejs');
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





module.exports = router;