/**
 * @author Cyril Tobler
 * @version 1.0.0
 * @since 23. Februar 2024
 * @description profile/send-profile.js - This file collects the data for the profile and sends it
 * @see {@link https://github.com/cyriltobler} - GitHub-Profile from Cyril Tobler
 */

const dbRequest = require('../db/db-request');

// create a async DB request
function asyncDbRequest(query, values) {
    return new Promise((resolve, reject) => {
        dbRequest(query, values, async (success, results) => {
            if (!success) {
                reject(results);
            }
            resolve(results);
        });
    });
}

const sendProfile = async (req, res) => {
    const profileJSON = [];

    try {
        // gather data from user
        const userDataByUsernameQuery = 'SELECT * FROM `user` WHERE `username` = ?;';
        const user = await asyncDbRequest(userDataByUsernameQuery, req.params.username);
        if (user.length === 0) {
            return res.status(404).json([]);
        }
        const userID = user[0].ID;

        const gamesFromUserQuery = 'SELECT * FROM `game` WHERE `blackplayer` = ? OR `whiteplayer` = ?;';
        const gamesFromUser = await asyncDbRequest(gamesFromUserQuery, [userID, userID]);

        const userDataByIDQuery = 'SELECT * FROM `user` WHERE `ID` = ?;';
        const otherplayers = await Promise.all(gamesFromUser.map((game) => {
            const otherPlayerID = game.blackplayer === userID ? game.whiteplayer : game.blackplayer;
            return asyncDbRequest(userDataByIDQuery, otherPlayerID);
        }));

        gamesFromUser.forEach((game, index) => {
            const allGameData = {
                id: game.id,
                fen: game.FEN,
                opponent: otherplayers[index][0].username,
                gameStatus: game.gameStatus,
                colorWhite: game.whiteplayer === userID,
            };
            profileJSON.push(allGameData);
        });

        // send Data as a json as response
        return res.json(profileJSON);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server Error');
    }
};

module.exports = sendProfile;
