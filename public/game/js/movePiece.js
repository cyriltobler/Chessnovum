import { Chess } from 'https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.13.4/chess.min.js';
import { board } from './chessboard-config.js';
import { socket } from './main.js';
import { gameID } from './main.js';
import { addMoveToHistory } from './skip.js';
import { fullForward } from './skip.js'

const chess = new Chess();

export function movePiece(source, target, sendData){
    // Go forward
    fullForward();

    const move = chess.move({
        from: source,
        to: target,
        promotion: "q",
        strict: false
    });

    // checkif move isn't legal
    if(move === null){
        return 'snapback';
    };

    // send move toback end
    if(sendData){
        sendMove(move)
    }

    //update view
    addMoveToHistory(chess)
    gameStatus();
    board.position(chess.fen())
}

function gameStatus(){
    if(chess.in_checkmate()){
        const orientation = board.orientation() === 'white' ? 'w' : 'b';
        if(chess.turn() === orientation){
            document.getElementById('game-end-title').innerHTML = 'Verloren'
        }else{
            document.getElementById('game-end-title').innerHTML = 'Gewonnen'
        }
        document.getElementById('endcard').style.display = 'flex';
    }else if (chess.in_draw()){
        document.getElementById('game-end-title').innerHTML = 'Unentschieden'
        document.getElementById('game-end-subtitle').innerHTML = ''
        document.getElementById('endcard').style.display = 'flex';
    }
}

function sendMove(move){
    const data = {
        gameID: gameID,
        move: move
    }
    socket.emit("move", data);
}