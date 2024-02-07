import { gameID } from './main.js'

export function onDrag(source, piece, position, orientation){
    if(gameID === undefined){
        return false;
    }
    if((piece[0] === 'w' && orientation === 'white') || (piece[0] === 'b' && orientation === 'black')){
        return true;
    }
    return false;
}