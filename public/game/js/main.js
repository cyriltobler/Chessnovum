/**
 * @author Cyril Tobler
 * @version 1.0.0
 * @since 23. Februar 2024
 * @description The function for play Chess is created in this file.
 * @see {@link https://github.com/cyriltobler} - GitHub-Profile from Cyril Tobler
 */

import { loadBoard } from './chessboard-config.js';
import { board } from './chessboard-config.js';
import{ updateBoard } from './movePiece.js';

export const socket = io();
export let gameID;
let orientation;

// search Game
document.getElementById('searchGame-button').onclick = () => {
    console.log(socket.id);
    socket.emit('searchGame');
};

// Confirmation that you are in the queue
socket.on('addedToQueue', () => {
    document.getElementById('searchGame-button').style.display = 'none';
    document.getElementById('chat-box').innerHTML += '<p class="game-info">Spieler suchen...</p>';
});

// on game start
socket.on('joinGame', (data) => {
    gameID = data.gameID;

    // edit info box
    document.getElementById('chat-box').innerHTML += '<p class="game-info">Spiel hat begonnen</p>';
    document.getElementById('game-controller').style.display = 'block';

    // edit url to game ID
    const newURL = `/game/${data.gameID}`;
    history.pushState(null, null, newURL);

    board.orientation(data.orientation);
    orientation = data.orientation;
});

// on new move
socket.on('move', ({move, fen}) => {
    // move piece local
    if ((move.color !== 'w' || orientation !== 'white') && (move.color !== 'b' || orientation !== 'black')) {
        updateBoard(fen);
    }
});

// on reload
gameID = window.location.pathname.split('/')[2];
if (gameID !== undefined) {
    socket.emit('getGameData', gameID, (gameData) => {
        // send chat message
        document.getElementById('searchGame-button').style.display = 'none';
        document.getElementById('chat-box').innerHTML += '<p class="game-info">Neu verbunden</p>';
        document.getElementById('game-controller').style.display = 'block';

        // turn chessboard
        board.orientation(gameData.orientation);
        orientation = gameData.orientation;

        // move pieces
        gameData.moves.forEach((move) => {
            updateBoard(move.FEN);
        });
    });
}

loadBoard();

window.addEventListener('offline', () => {
    alert('Internet Verbindung getrennt');
});
