import { onDrag } from './onDrag.js';
import { onDrop } from './onDrop.js';

const config = {
    position: 'start',
    pieceTheme: '/img/chesspieces/{piece}.png',
    //orientation: 'black',
    draggable: true,
    onDragStart: onDrag,
    onDrop: onDrop
}

let board;
export function loadBoard(){
    board = Chessboard('myBoard', config);
}