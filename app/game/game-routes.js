const express = require('express');
const path = require('path');

const verification = require('../middleware/verification-middleware');
const dbRequest = require('../db/db-request');

const router = express.Router();
const VIEW_PATH = '../../view/';

router.get('/play', verification.checkIfAuthenticated, (req, res) => {
    const filePath = path.join(__dirname, VIEW_PATH, '/pages/game.ejs');
    res.render(filePath);
});

router.get('/game/:gameID', (req, res) => {
    const query = 'SELECT * FROM `game` WHERE `id` = ?;';
    dbRequest(query, req.params.gameID, async (success, results) => {
        if (!success) {
            return res.status(500).send('Server Error');
        }

        if (results.length === 0) {
            const filePath = path.join(__dirname, VIEW_PATH, '/pages/gameNotFound.ejs');
            return res.render(filePath);
        }

        if (!req.isAuthenticated()) {
            const filePath = path.join(__dirname, VIEW_PATH, '/pages/spectator.ejs');
            return res.render(filePath);
        }

        if (results[0].blackplayer === req.user.ID || results[0].whiteplayer === req.user.ID) {
            const filePath = path.join(__dirname, VIEW_PATH, '/pages/game.ejs');
            return res.render(filePath);
        }
        const filePath = path.join(__dirname, VIEW_PATH, '/pages/spectator.ejs');
        return res.render(filePath);
    });
});

module.exports = router;
