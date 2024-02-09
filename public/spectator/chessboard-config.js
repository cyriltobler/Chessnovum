const config = {
    position: 'start',
    pieceTheme: '/img/chesspieces/{piece}.png',
    draggable: false
}

export let board;
export function loadBoard(){
    board = Chessboard('myBoard', config);
}