const express = require('express');
const http = require('http')
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const socket = require('socket.io')
require('dotenv').config();

const passport = require('./auth/passport-config.js');
const socketConnection = require('./game/game-socket.js');

const app = express();
const port = 3000;


// activate ejs
app.set('view engine', 'ejs')

// Load middleware
app.use(bodyParser.urlencoded({ extended: true }));
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
});
app.use(sessionMiddleware)
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Create Socket Server and load socketConnection
const server = http.createServer(app);
const io = socket(server);


// support by https://socket.io/how-to/use-with-passport
function onlyForHandshake(middleware) {
    return (req, res, next) => {
        const isHandshake = req._query.sid === undefined;
        if (isHandshake) {
            middleware(req, res, next);
        } else {
            next();
        }
    };
}

io.engine.use(onlyForHandshake(sessionMiddleware));
io.engine.use(onlyForHandshake(passport.session()));
io.engine.use(onlyForHandshake((req, res, next) => {/*
    if (req.user) {
        next();
    } else {
        res.writeHead(401);
        res.end();
    }*/next();
}));

socketConnection(io);


// import other routes
const authRoutes = require('./auth/auth-routes.js');
app.use('/auth', authRoutes);

const gameRoutes = require('./game/game-routes.js');
app.use('/', gameRoutes);

const routes = require('./routes.js');
const { Module } = require('module');
app.use('/', routes);


app.use(express.static('public'))

// Start the server
server.listen(port, () => {
    console.log(`Der Server läuft auf http://localhost:${port}`);
});