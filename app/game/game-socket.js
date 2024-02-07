const createGame = require('./create-game.js');
const validateMove = require('./validate-move.js');


const socketConnection = (io) => {
    io.on('connection', (socket) => {

        socket.on('searchGame', () => {
            createGame(io, socket);
        });

        socket.on('move', (data) => {
            validateMove(io, socket)
        });

        


        socket.on('disconnect', function () {
            console.log('Client disconnected');
        });
    })
}

module.exports = socketConnection;