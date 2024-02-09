import { board } from './chessboard-config.js'

const moves = [];
let displayedMove = 0;

document.getElementById("forward").onclick = () => {
    if(displayedMove < moves.length){
        board.move(moves[displayedMove].from + '-' + moves[displayedMove].to);
        displayedMove++;
    }
}
document.getElementById("backward").onclick = () => {
    if(displayedMove > 0){
        displayedMove = displayedMove - 1;
        board.move(moves[displayedMove].to + '-' + moves[displayedMove].from);
    }
}
document.getElementById("full-forward").onclick = () => {
    fullForward();
}
document.getElementById("full-backward").onclick = () => {
    for(displayedMove; displayedMove > 0; true){
        displayedMove--
        board.move(moves[displayedMove].to + '-' + moves[displayedMove].from);
    }
}

export function fullForward(){
    for(displayedMove; displayedMove < moves.length; displayedMove++){
        board.move(moves[displayedMove].from + '-' + moves[displayedMove].to);
    }
}


export function addMoveToHistory(move){
    moves.push(move);
    console.log(moves)
    displayedMove++;
}