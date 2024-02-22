const dbRequest = require("../db/db-request");

const sendProfile = async (req, res) => {
    const profileJSON = [];
    
    try{
        const userDataByUsernameQuery = 'SELECT * FROM `user` WHERE `username` = ?;'
        const user = await asyncDbRequest(userDataByUsernameQuery, req.params.username)
        if(user.length === 0){
            return res.status(404).send('user not found')
        }
        const userID = user[0].ID

        
        const gamesFromUserQuery = 'SELECT * FROM `game` WHERE `blackplayer` = ? OR `whiteplayer` = ?;'
        const gamesFromUser = await asyncDbRequest(gamesFromUserQuery, [userID, userID])

        const userDataByIDQuery = 'SELECT * FROM `user` WHERE `ID` = ?;'
        const otherplayers = await Promise.all(gamesFromUser.map(game => {
            const otherPlayerID = game.blackplayer === userID ? game.whiteplayer : game.blackplayer;
            return asyncDbRequest(userDataByIDQuery, otherPlayerID)
        }));

        gamesFromUser.forEach((game, index) => {
            const allGameData = {
                id: game.id,
                fen: game.FEN,
                opponent: otherplayers[index][0].username,
                gameStatus: game.gameStatus,
                colorWhite: game.whiteplayer === userID
            }
            profileJSON.push(allGameData)
        })
        res.json(profileJSON)
    }catch(error){
        console.log(error)
        res.status(500).send("Server Error");
    }
}

function asyncDbRequest(query, values){
    return new Promise((resolve, reject) => {
        dbRequest(query, values, async (success, results)=>{
            if(!success){
                reject(results);
            }
            resolve(results);
        })
    })
}


module.exports = sendProfile;