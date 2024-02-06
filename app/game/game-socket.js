const socketConnection = (io) => {
    io.on('connection', (socket) => {
        console.log("Achtung")
        console.log(socket.request.user)

        


        socket.on('disconnect', function () {
            console.log('Client disconnected');
        });
    })
}

module.exports = socketConnection;