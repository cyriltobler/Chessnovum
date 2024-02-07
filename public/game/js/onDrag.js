export function onDrag(source, piece, position, orientation) {
    if((piece[0] === 'w' && orientation === 'white') || (piece[0] === 'b' && orientation === 'black')){
        return true;
    }else{
        return false;
    }
}