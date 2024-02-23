/**
 * @author Cyril Tobler
 * @version 1.0.0
 * @since 23. Februar 2024
 * @description game/game-routes.js - All routes for the game are managed in this file
 * @see {@link https://github.com/cyriltobler} - GitHub-Profile from Cyril Tobler
 */

const express = require('express');
const path = require('path');

const verification = require('../middleware/verification-middleware');
const dbRequest = require('../db/db-request');

const router = express.Router();
const VIEW_PATH = '../../view/';

// send play site
router.get('/play', verification.checkIfAuthenticated, (req, res) => {
    const filePath = path.join(__dirname, VIEW_PATH, '/pages/game.ejs');
    res.render(filePath);
});

// send site for rejoining or spectator
router.get('/game/:gameID', (req, res) => {
    // search game in DB
    const query = 'SELECT * FROM `game` WHERE `id` = ?;';
    dbRequest(query, req.params.gameID, async (success, results) => {
        if (!success) {
            return res.status(500).send('Server Error');
        }

        // game not found
        if (results.length === 0) {
            const filePath = path.join(__dirname, VIEW_PATH, '/pages/gameNotFound.ejs');
            return res.render(filePath);
        }

        // user not authenticated(spectator mode)
        if (!req.isAuthenticated()) {
            const filePath = path.join(__dirname, VIEW_PATH, '/pages/spectator.ejs');
            return res.render(filePath);
        }

        // user is a player(rejoin in the game)
        if (results[0].blackplayer === req.user.ID || results[0].whiteplayer === req.user.ID) {
            const filePath = path.join(__dirname, VIEW_PATH, '/pages/game.ejs');
            return res.render(filePath);
        }

        // user not a player(spectator mode)
        const filePath = path.join(__dirname, VIEW_PATH, '/pages/spectator.ejs');
        return res.render(filePath);
    });
});

module.exports = router;
