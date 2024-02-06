const socketConnection = (io) => {
    io.on('connection', (socket) => {
        console.log("Client connected")

        


        socket.on('disconnect', function () {
            console.log('Client disconnected');
        });
    })
}

module.exports = socketConnection;