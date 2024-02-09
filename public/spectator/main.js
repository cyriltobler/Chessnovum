import { loadBoard } from './chessboard-config.js';
import { board } from './chessboard-config.js';

export const socket = io();

loadBoard();

// on new move
socket.on("move", (move) => {
    // move piece local
    const convertedMove = move.from + "-" + move.to;
    board.move(convertedMove);
});

const gameID = window.location.pathname.split('/')[2]
socket.emit("getGameData", gameID, (gameData) => {
    // send chat message
    document.getElementById('chat-box').innerHTML += '<p class="game-info">Live übertragung gestarted</p>';
    document.getElementById('game-controller').style.display = 'block';
    
    gameData.forEach(move => {
        const convertedMove = move.from + "-" + move.to;
        board.move(convertedMove);
    });
});