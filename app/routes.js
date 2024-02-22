const express = require('express');
const router = express.Router();
const path = require('path');

const VIEW_PATH = '../view/';

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, VIEW_PATH, '/pages/index.ejs');
    //res.render(filePath);
    res.redirect('/play')
});




module.exports = router;