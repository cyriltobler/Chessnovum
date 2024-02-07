const { randomUUID } = require('node:crypto');

const userPool = []

const socketConnection = (io) => {
    io.on('connection', (socket) => {

        socket.on('joinGame', () => {
            //add user in the pool
            userPool.push(socket.id);

            // start a game
            if(userPool.length >= 2){
                const gameID = randomUUID();
                const gameUsers = userPool.slice(0, 2);
                userPool.splice(0, 2);

                gameUsers.forEach(user => {
                    console.log(user)
                    const userSocket = io.sockets.sockets.get(user);
                    userSocket.join(gameID);
                });
                io.to(gameID).emit("joinGame", gameID);
            }
        });

        


        socket.on('disconnect', function () {
            console.log('Client disconnected');
        });
    })
}

module.exports = socketConnection;