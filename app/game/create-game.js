/**
 * @author Cyril Tobler
 * @version 1.0.0
 * @since 23. Februar 2024
 * @description game/create-game.js - A game is created in this file
 * @see {@link https://github.com/cyriltobler} - GitHub-Profile from Cyril Tobler
 */

const { randomUUID } = require('node:crypto');
const dbRequest = require('../db/db-request');

const userPool = [];

// create a new game
const createGame = (io, socket) => {
    // add user in the pool
    userPool.push(socket.id);

    // start a game
    if (userPool.length >= 2) {
        const gameID = randomUUID();
        const gameUsers = userPool.slice(0, 2);
        userPool.splice(0, 2);

        const query = 'INSERT INTO game SET ?';
        let orientation = 'white';
        const startPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        const gameData = {
            id: gameID,
            blackplayer: io.sockets.sockets.get(gameUsers[1]).request.user.ID,
            whiteplayer: io.sockets.sockets.get(gameUsers[0]).request.user.ID,
            gameStatus: 0,
            FEN: startPosition,
        };
        dbRequest(query, gameData, async (success) => {
            if (!success) {
                return;
            }

            // create Room for the players
            gameUsers.forEach((user) => {
                const userSocket = io.sockets.sockets.get(user);
                userSocket.join(gameID);

                // send game ID and color
                userSocket.emit('joinGame', {
                    gameID,
                    orientation,
                });

                orientation = 'black';
            });
        });
    }
};

module.exports.createGame = createGame;
module.exports.userPool = userPool;
