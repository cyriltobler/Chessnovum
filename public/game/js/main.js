import { loadBoard } from './chessboard-config.js';
import { board } from './chessboard-config.js';
import{ updateBoard } from './movePiece.js';

export const socket = io();
export let gameID;
let orientation;

// search Game
document.getElementById("searchGame-button").onclick = () => {
    socket.emit("searchGame");
}

// Confirmation that you are in the queue
socket.on("addedToQueue", () => {
    document.getElementById('searchGame-button').style.display = 'none';
    document.getElementById('chat-box').innerHTML += '<p class="game-info">Spieler suchen...</p>';
})

// on game start
socket.on("joinGame", (data) => {
    gameID = data.gameID;

    //edit info box
    document.getElementById('chat-box').innerHTML += '<p class="game-info">Spiel hat begonnen</p>';
    document.getElementById('game-controller').style.display = 'block';

    // edit url to game ID
    const newURL = "/game/" + data.gameID;
    history.pushState(null, null, newURL);

    board.orientation(data.orientation)
    orientation = data.orientation;
});


// on new move
socket.on("move", ({move, fen}) => {
    // move piece local
    if((move.color !== "w" || orientation !== "white") && (move.color !== "b" || orientation !== "black")){
        updateBoard(fen);
    }
});


loadBoard();