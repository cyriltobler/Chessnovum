import { onDrag } from './onDrag.js';
import { movePiece } from './movePiece.js';

const config = {
    position: 'start',
    pieceTheme: '/img/chesspieces/{piece}.png',
    draggable: true,
    onDragStart: onDrag,
    onDrop: (source, target) => movePiece(source, target, true)
}

export let board;
export function loadBoard(){
    board = Chessboard('myBoard', config);
}