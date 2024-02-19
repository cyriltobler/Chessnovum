const express = require('express');
const router = express.Router();
const path = require('path');

const sendProfile = require('./send-profile.js')

const VIEW_PATH = '../../view/';

router.get('/profile/@*', (req, res) => {
    const filePath = path.join(__dirname, VIEW_PATH, '/pages/profile.ejs');
    res.render(filePath);
});

router.get('/profile/notfound', (req, res) => {
    const filePath = path.join(__dirname, VIEW_PATH, '/pages/profileNotFound.ejs');
    res.render(filePath);
});

router.get('/api/profile/:username', sendProfile);




module.exports = router;