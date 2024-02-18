const { Chess } = require('chess.js');
const dbRequest = require("../db/db-request");

const validateMove = (io, socket, data) => {
    const query = 'SELECT * FROM `game` WHERE `id` = ?;'

    dbRequest(query, data.gameID, async (success, results)=>{
        if(!success){
			return;
		}

        const chess = new Chess(results[0].FEN);

        // check user 
        const userID = socket.request.user.ID;
        currentPlayer = chess.turn() === 'w' ? 'whiteplayer' : 'blackplayer';

        //check if it is the right player
        if(results[0][currentPlayer] != userID){
            return;
        }


        // Chess logic
        try{
            const move = chess.move({
                from: data.move.from,
                to: data.move.to,
                promotion: 'q'
            });

            writeMoveInDB({
                gameID: data.gameID,
                FEN: chess.fen(),
                move: data.move,
                moveNumber: results[0].moveNumber + 1
            });

            io.to(data.gameID).emit("move", data.move);
        }catch(e){
            console.log(e);
        }
    });
}

function writeMoveInDB(gameData){
    const gameID = gameData.gameID

    const query1 = 'UPDATE game SET FEN = ?, moveNumber = ?  WHERE id = ?'
    dbRequest(query1, [gameData.FEN, gameData.moveNumber, gameID], async (success, results)=>{
        if(!success){
			return console.log(results);
		}
    });

    const moveData = {
        game_fk: gameID,
        moveNumber: gameData.moveNumber,
        from: gameData.move.from,
        to: gameData.move.to
    }
    const query2 = 'INSERT INTO move SET ?'
    dbRequest(query2, moveData, async (success, results)=>{
        if(!success){
			return console.log(results);
		}
    });
}

module.exports = validateMove;