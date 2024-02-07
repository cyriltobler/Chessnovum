import { onDrag } from './onDrag.js';
import { movePiece } from './movePiece.js';

const config = {
    position: 'start',
    pieceTheme: '/img/chesspieces/{piece}.png',
    //orientation: 'black',
    draggable: true,
    onDragStart: onDrag,
    onDrop: movePiece
}

export let board;
export function loadBoard(){
    board = Chessboard('myBoard', config);
}