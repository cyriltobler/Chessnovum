function validateMove(io, socket, data){
    // TODO: authenticate, if move is right

    io.to(data.gameID).emit("move", data.move)
}