const express = require('express');
const router = express.Router();
const path = require('path');

const verification = require('../middleware/verification-middleware.js')

const VIEW_PATH = '../../view/';

router.get('/play', verification.checkIfAuthenticated, (req, res) => {
    const filePath = path.join(__dirname, VIEW_PATH, '/pages/game.ejs');
    res.render(filePath);
});

router.get('/game/:gameID', (req, res) => {
    const filePath = path.join(__dirname, VIEW_PATH, '/pages/game.ejs');
    res.render(filePath);
});

module.exports = router;