/**
 * @author Cyril Tobler
 * @version 1.0.0
 * @since 23. Februar 2024
 * @description server.js - main file in which the server is started and the middleware and the
 * individual routes are loaded.
 * @see {@link https://github.com/cyriltobler} - GitHub-Profile from Cyril Tobler
 */

const express = require('express');
const http = require('http');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const socket = require('socket.io');
require('dotenv').config();

const passport = require('./auth/passport-config');
const socketConnection = require('./game/game-socket');

const app = express();
const port = 3000;

// activate ejs
app.set('view engine', 'ejs');

// Load middleware
app.use(bodyParser.urlencoded({ extended: true }));
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
});
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
    res.locals.username = req.isAuthenticated() ? req.user.username : null;
    next();
});

// Create Socket Server and load socketConnection
const server = http.createServer(app);
const io = socket(server);

// support by https://socket.io/how-to/use-with-passport
function onlyForHandshake(middleware) {
    return (req, res, next) => {
        // eslint-disable-next-line no-underscore-dangle
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
io.engine.use(onlyForHandshake((req, res, next) => {
    /* if (req.user) {
        next();
    } else {
        res.writeHead(401);
        res.end();
    } */
    next();
}));

socketConnection(io);

// import other routes
const authRoutes = require('./auth/auth-routes');
const gameRoutes = require('./game/game-routes');
const profileRoutes = require('./profile/profile-routes');
const routes = require('./routes');

app.use('/auth', authRoutes);
app.use('/', gameRoutes);
app.use('/', profileRoutes);
app.use('/', routes);

app.use(express.static('public'));

// Start the server
server.listen(port, () => {
    console.log(`Der Server läuft auf http://localhost:${port}`);
});
