import { Chess } from 'https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.13.4/chess.min.js';
import { socket } from './main.js'
import { gameID } from './main.js'

const chess = new Chess();

export function onDrop(source, target){

    const move = chess.move({
        from: source,
        to: target,
        promotion: "q",
    });

    // checkif move isn't legal
    if(move === null){
        return 'snapback';
    };
}