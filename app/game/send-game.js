const dbRequest = require('../db/db-request.js');

const sendGame = (gameID, socket, callback) => {

    const query = 'SELECT * FROM `move` WHERE `game_fk` = ?;'
    dbRequest(query, gameID, async (success, results)=>{
		if(!success){

        }
        callback(results);
        socket.join(gameID);
  	});
}

module.exports = sendGame;