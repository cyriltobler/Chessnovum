const { createGame, userPool } = require('./create-game');
const validateMove = require('./validate-move');
const sendGame = require('./send-game');

// handle all socket.io events
const socketConnection = (io) => {
    io.on('connection', (socket) => {
        socket.on('searchGame', () => {
            socket.emit('addedToQueue');
            createGame(io, socket);
        });

        socket.on('move', (data) => {
            validateMove(io, socket, data);
        });

        socket.on('getGameData', (gameID, callback) => {
            sendGame(gameID, socket, callback);
        });

        socket.on('disconnect', () => {
            // delete user from pool by disconecting
            const userIndex = userPool.indexOf(socket.id);
            if (userIndex !== -1) {
                userPool.splice(userIndex, 1);
            }
        });
    });
};

module.exports = socketConnection;
