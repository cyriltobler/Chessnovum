import { board } from './chessboard-config.js';

const moves = ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'];
let displayedMove = 0;

document.getElementById('forward').onclick = () => {
    if (displayedMove < moves.length - 1) {
        displayedMove++;
        board.position(moves[displayedMove]);
    }
};
document.getElementById('backward').onclick = () => {
    if (displayedMove > 0) {
        displayedMove--;
        board.position(moves[displayedMove]);
    }
};
document.getElementById('full-forward').onclick = () => {
    fullForward();
};
document.getElementById('full-backward').onclick = () => {
    board.position(moves[0]);
    displayedMove = 0;
};

export function fullForward() {
    board.position(moves[moves.length - 1]);
    displayedMove = moves.length - 1;
}

export function addMoveToHistory(fen) {
    moves.push(fen);
    displayedMove++;
}
