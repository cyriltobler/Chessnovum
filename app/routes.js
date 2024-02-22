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
