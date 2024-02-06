const express = require('express');
const router = express.Router();
const path = require('path');

const VIEW_PATH = '../../view/';

router.get('/game', (req, res) => {
    const filePath = path.join(__dirname, VIEW_PATH, '/pages/game.ejs');
    res.render(filePath);
});

module.exports = router;