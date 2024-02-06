const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('express-flash')
require('dotenv').config();

const passport = require('./auth/passport-config.js');

const app = express();
const port = 3000;

// activate ejs
app.set('view engine', 'ejs')

// Load middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// import other routes
const authRoutes = require('./auth/auth-routes.js');
app.use('/auth', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Der Server läuft auf http://localhost:${port}`);
});