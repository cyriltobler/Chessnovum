const { Chess } = require('chess.js');
const dbRequest = require('../db/db-request');

function writeMoveInDB(gameData) {
    const { gameID } = gameData;

    const query1 = 'UPDATE game SET FEN = ?, moveNumber = ?, gameStatus = ?  WHERE id = ?';
    const query1Data = [gameData.FEN, gameData.moveNumber, gameData.gameStatus, gameID];
    dbRequest(query1, query1Data, async (success, results) => {
        if (!success) {
            return console.log(results);
        }
        return true;
    });

    const moveData = {
        game_fk: gameID,
        moveNumber: gameData.moveNumber,
        FEN: gameData.FEN,
    };
    const query2 = 'INSERT INTO move SET ?';
    dbRequest(query2, moveData, async (success, results) => {
        if (!success) {
            return console.log(results);
        }
        return true;
    });
}

function gameStatus(chess) {
    if (chess.isCheckmate()) {
        if (chess.turn() === 'w') {
            return 2;
        }
        return 1;
    }

    if (chess.isDraw()) {
        return 3;
    }
    return 0;
}

const validateMove = (io, socket, data) => {
    const query = 'SELECT * FROM `game` WHERE `id` = ?;';

    dbRequest(query, data.gameID, async (success, results) => {
        if (!success) {
            return;
        }

        const chess = new Chess(results[0].FEN);

        // check user
        const userID = socket.request.user.ID;
        const currentPlayer = chess.turn() === 'w' ? 'whiteplayer' : 'blackplayer';

        // check if it is the right player
        if (results[0][currentPlayer] !== userID) {
            return;
        }

        // Chess logic
        try {
            chess.move({
                from: data.move.from,
                to: data.move.to,
                promotion: data.move.promotion,
            });

            writeMoveInDB({
                gameID: data.gameID,
                FEN: chess.fen(),
                move: data.move,
                moveNumber: results[0].moveNumber + 1,
                gameStatus: gameStatus(chess),
            });

            io.to(data.gameID).emit('move', { move: data.move, fen: chess.fen() });
        } catch (e) {
            console.log(e);
        }
    });
};

module.exports = validateMove;
