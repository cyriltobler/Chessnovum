import { loadBoard } from './chessboard-config.js';
import { board } from './chessboard-config.js';
import { addMoveToHistory } from './skip.js';
import { fullForward } from './skip.js';

export const socket = io();

loadBoard();

// on new move
socket.on("move", ({move, fen}) => {
    // move piece local
    fullForward();
    addMoveToHistory(fen);
    board.position(fen);
});

const gameID = window.location.pathname.split('/')[2]
socket.emit("getGameData", gameID, (gameData) => {
    // send chat message
    document.getElementById('chat-box').innerHTML += '<p class="game-info">Live übertragung gestartet</p>';
    document.getElementById('game-controller').style.display = 'block';
    
    gameData.moves.forEach(move => {
        addMoveToHistory(move.FEN);
        board.position(move.FEN);
    });
});