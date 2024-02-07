import { loadBoard } from './chessboard-config.js';

export const socket = io();
export let gameID;

// search Game
document.getElementById("searchGame-button").onclick = () => {
    socket.emit("searchGame");
}

// on game start
socket.on("joinGame", (id) => {
    // edit url to game ID
    const newURL = "/game/" + id;
    gameID = id;
    history.pushState(null, null, newURL);
});




loadBoard();