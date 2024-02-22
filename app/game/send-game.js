const dbRequest = require('../db/db-request');

// send allmoves froma game
const sendGame = (gameID, socket, callback) => {
    let moves;
    let orientation = null;
    let sendDataCounter = 0;

    // add user to the livestream
    socket.join(gameID);

    // send data after the two DB requests
    function sendData() {
        if (sendDataCounter >= 2) {
            callback({ moves, orientation });
        }
    }

    const query1 = 'SELECT * FROM `move` WHERE `game_fk` = ?;';
    dbRequest(query1, gameID, async (success, results) => {
        if (!success) {
            return console.log('error');
        }
        moves = results;
        sendDataCounter++;
        return sendData();
    });

    if (socket.request.user?.ID !== undefined) {
        const query2 = 'SELECT * FROM `game` WHERE `id` = ?;';
        dbRequest(query2, gameID, async (success, results) => {
            if (!success) {
                return console.log('error');
            }

            sendDataCounter++;
            if (results[0].blackplayer === socket.request.user.ID) {
                orientation = 'black';
                return sendData();
            }

            orientation = 'white';
            return sendData();
        });
    } else {
        sendDataCounter++;
        sendData();
    }
};

module.exports = sendGame;
