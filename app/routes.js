/**
 * @author Cyril Tobler
 * @version 1.0.0
 * @since 23. Februar 2024
 * @description routes.js - General routes are handled here
 * @see {@link https://github.com/cyriltobler} - GitHub-Profile from Cyril Tobler
 */

const express = require('express');

const router = express.Router();
const path = require('path');

const VIEW_PATH = '../view/';

router.get('/', (req, res) => {
    // eslint-disable-next-line no-unused-vars
    const filePath = path.join(__dirname, VIEW_PATH, '/pages/index.ejs');
    // res.render(filePath);
    res.redirect('/play');
});

module.exports = router;
