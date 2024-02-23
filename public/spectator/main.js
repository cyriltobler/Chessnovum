/**
 * @author Cyril Tobler
 * @version 1.0.0
 * @since 23. Februar 2024
 * @description The function for watching is created in this file.
 * @see {@link https://github.com/cyriltobler} - GitHub-Profile from Cyril Tobler
 */

import { loadBoard } from './chessboard-config.js';
import { board } from './chessboard-config.js';
import { addMoveToHistory } from './skip.js';
import { fullForward } from './skip.js';

export const socket = io();

loadBoard();

// on new move
socket.on('move', ({ move, fen }) => {
    // move piece local
    fullForward();
    addMoveToHistory(fen);
    board.position(fen);
});

const gameID = window.location.pathname.split('/')[2]
socket.emit('getGameData', gameID, (gameData) => {
    // send chat message
    document.getElementById('chat-box').innerHTML += '<p class="game-info">Live übertragung gestartet</p>';
    document.getElementById('game-controller').style.display = 'block';

    gameData.moves.forEach((move) => {
        addMoveToHistory(move.FEN);
        board.position(move.FEN);
    });
});