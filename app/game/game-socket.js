const { createGame, userPool } = require('./create-game.js');
const validateMove = require('./validate-move.js');


const socketConnection = (io) => {
    io.on('connection', (socket) => {

        socket.on('searchGame', () => {
            socket.emit("addedToQueue")
            createGame(io, socket);
        });

        socket.on('move', (data) => {
            validateMove(io, socket, data)
        });

        


        socket.on('disconnect', function () {
            // delete user from pool by disconecting
            const userIndex = userPool.indexOf(socket.id);
            userPool.splice(userIndex, 1);
        });
    })
}

module.exports = socketConnection;