const { randomUUID } = require('node:crypto');

const userPool = []

const socketConnection = (io) => {
    io.on('connection', (socket) => {

        socket.on('searchGame', () => {
            //add user in the pool
            userPool.push(socket.id);

            // start a game
            if(userPool.length >= 2){
                const gameID = randomUUID();
                const gameUsers = userPool.slice(0, 2);
                let orientation = "white";
                userPool.splice(0, 2);

                gameUsers.forEach(user => {

                    const userSocket = io.sockets.sockets.get(user);
                    userSocket.join(gameID);

                    // send game ID and color
                    userSocket.emit("joinGame", {
                        gameID: gameID,
                        orientation: orientation
                    });

                    orientation = "black";
                });
            }
        });

        socket.on('move', (data) => {
            // TODO: authenticate, if move is right

            io.to(data.gameID).emit("move", data.move)
        });

        


        socket.on('disconnect', function () {
            console.log('Client disconnected');
        });
    })
}

module.exports = socketConnection;