const dbRequest = require('../db/db-request.js');

const sendGame = (gameID, socket, callback) => {
    let moves;
    let orientation = null;
    let sendDataCounter = 0;

    socket.join(gameID);

    const query1 = 'SELECT * FROM `move` WHERE `game_fk` = ?;'
    dbRequest(query1, gameID, async (success, results)=>{
		if(!success){
            return console.log("error")
        }
        moves = results
        sendDataCounter++;
        sendData()
  	});

    if(socket.request.user?.ID !== undefined){
        const query2 = 'SELECT * FROM `game` WHERE `id` = ?;'
        dbRequest(query2, gameID, async (success, results)=>{
            if(!success){
                return console.log("error")
            }

            sendDataCounter++;
            if(results[0].blackplayer === socket.request.user.ID){
                orientation = 'black';
                sendData()
            }else{
                orientation = 'white';
                sendData()
            }
  	    });
    }else{
        sendDataCounter++;
        sendData()
    }

    function sendData(){
        if(sendDataCounter >= 2){
            callback({moves: moves, orientation: orientation});
        }
    }
}

module.exports = sendGame;