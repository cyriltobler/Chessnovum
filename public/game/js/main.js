const socket = io();

socket.on("joinGame", (gameID) => {
    console.log("Game started", gameID);
});


document.getElementById("searchGame-button").onclick = () => {
    console.log("send");

    console.log(socket.id)
    socket.emit("joinGame");
}