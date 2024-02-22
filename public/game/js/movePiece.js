import { Chess } from 'https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.13.4/chess.min.js';
import { board } from './chessboard-config.js';
import { socket, gameID } from './main.js';
import { addMoveToHistory, fullForward } from './skip.js';

const chess = new Chess();

function gameStatus() {
    if (chess.in_checkmate()) {
        const orientation = board.orientation() === 'white' ? 'w' : 'b';
        if (chess.turn() === orientation) {
            document.getElementById('game-end-title').innerHTML = 'Verloren';
        } else {
            document.getElementById('game-end-title').innerHTML = 'Gewonnen';
        }
        document.getElementById('endcard').style.display = 'flex';
    } else if (chess.in_draw()) {
        document.getElementById('game-end-title').innerHTML = 'Unentschieden';
        document.getElementById('game-end-subtitle').innerHTML = '';
        document.getElementById('endcard').style.display = 'flex';
    }
}

export function updateBoard(fen) {
    fullForward();

    chess.load(fen);

    addMoveToHistory(chess.fen());
    gameStatus();
    board.position(chess.fen());
}

function sendMove(move) {
    const data = {
        gameID,
        move,
    };
    socket.emit('move', data);
}

function askPromotion(updateMove, source, target, move) {
    chess.undo();
    document.getElementById('promotion-card').style.display = 'block';

    function handlePromotion(event) {
        document.getElementById('promotion-card').style.display = 'none';
        const promotionPiece = event.target.id.split('-')[2];

        move = chess.move({
            from: source,
            to: target,
            promotion: promotionPiece,
        });

        updateMove(move);
    }

    const promotionButtons = document.querySelectorAll('.promotion-button');
    promotionButtons.forEach((button) => {
        button.addEventListener('click', handlePromotion);
    });
}

export function movePiece(source, target, sendData) {
    // Go forward
    fullForward();

    function updateMove(move) {
        // send move to backend
        if (sendData) {
            sendMove(move);
        }

        // update view
        addMoveToHistory(chess.fen());
        gameStatus();
        board.position(chess.fen());
    }

    const move = chess.move({
        from: source,
        to: target,
        promotion: 'q',
    });

    // checkif move isn't legal
    if (move === null) {
        return 'snapback';
    }

    // check if promotion
    if (move.promotion && sendData) {
        // makemove with promotion
        askPromotion(updateMove, source, target);
    } else {
        updateMove(move);
    }
}
