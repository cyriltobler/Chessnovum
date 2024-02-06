const express = require('express');
const http = require('http')
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('express-flash')
require('dotenv').config();

const passport = require('./auth/passport-config.js');
const socketConnection = require('./game/game-socket.js');

const app = express();
const port = 3000;

// Create Socket Server and load socketConnection
const server = http.createServer(app);
const io = require('socket.io')(server);
socketConnection(io);

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

const gameRoutes = require('./game/game-routes.js');
app.use('/', gameRoutes);

const routes = require('./routes.js');
app.use('/', routes);


// Start the server
server.listen(port, () => {
  console.log(`Der Server läuft auf http://localhost:${port}`);
});