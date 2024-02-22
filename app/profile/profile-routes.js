const express = require('express');
const path = require('path');

const router = express.Router();

const sendProfile = require('./send-profile');

const VIEW_PATH = '../../view/';

// send profile site
router.get('/profile/@*', (req, res) => {
    const filePath = path.join(__dirname, VIEW_PATH, '/pages/profile.ejs');
    res.render(filePath);
});

// GeET request to send the user data
router.get('/api/profile/:username', sendProfile);

module.exports = router;
