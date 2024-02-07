const { randomUUID } = require('node:crypto');
const dbRequest = require('../db/db-request.js');
const userPool = []

const createGame = (io, socket) => {
    //add user in the pool
    userPool.push(socket.id);

    // start a game
    if(userPool.length >= 2){
        const gameID = randomUUID();
        const gameUsers = userPool.slice(0, 2);
        let orientation = "white";
        userPool.splice(0, 2);


        const query = 'INSERT INTO game SET ?';
        console.log(socket.request.user[0].ID)
        const gameData = {
            id: gameID,
            blackplayer: io.sockets.sockets.get(gameUsers[0]).request.user[0].ID,
            whiteplayer: io.sockets.sockets.get(gameUsers[1]).request.user[0].ID,
            gameFinished: 0
        }
        dbRequest(query, gameData, async (success, results)=>{
		    if(!success){
			    return;
		    }

            // create Room for the players
            gameUsers.forEach(user => {

                const userSocket = io.sockets.sockets.get(user);
                userSocket.join(gameID);

                // send game ID and color
                userSocket.emit("joinGame", {
                    gameID: gameID,
                    orientation: orientation
                });

                orientation = "black";
            });
  	    });
    }
}


module.exports = createGame;