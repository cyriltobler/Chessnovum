import { loadBoard } from './chessboard-config.js';
import { board } from './chessboard-config.js'
import{ movePiece } from './movePiece.js'

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
    document.getElementById('game-info').style.display = 'block';
    document.getElementById('game-info').innerText = 'Spieler suchen...';
})

// on game start
socket.on("joinGame", (data) => {
    gameID = data.gameID;

    //edit info box
    document.getElementById('game-info').innerText = 'Spiel hat begonnen';

    // edit url to game ID
    const newURL = "/game/" + data.gameID;
    history.pushState(null, null, newURL);

    board.orientation(data.orientation)
    orientation = data.orientation;
});


// on new move
socket.on("move", (move) => {
    // move piece local
    if(move.color === "w" || orientation == "white" && move.color === "b" || orientation == "black"){
        movePiece(move.from, move.to);
    }

    const convertedMove = move.from + "-" + move.to;
    board.move(convertedMove);
});


loadBoard();