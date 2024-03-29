/**
 * @author Cyril Tobler
 * @version 1.0.0
 * @since 23. Februar 2024
 * @description In this file, a request is sent for the profile and
 * then all data is displayed in the profile
 * @see {@link https://github.com/cyriltobler} - GitHub-Profile from Cyril Tobler
 */

async function getGames() {
    const username = window.location.pathname.split('@')[1];

    const response = await fetch(`/api/profile/${username}`);
    const games = await response.json();

    games.forEach((game, i) => {
        let htmlContainer;
        if (game.gameStatus !== 0) {
            htmlContainer = document.getElementById('old-games');
        } else {
            htmlContainer = document.getElementById('last-games');
        }

        createNewBoard(game, htmlContainer, i);
    });
    createStatistics(games);

    if (document.getElementById('last-games').children.length === 0) {
        document.getElementById('last-games').innerHTML = 'Du hast keine Spiele am laufen';
    }
    if (document.getElementById('old-games').children.length === 0) {
        document.getElementById('old-games').innerHTML = 'Du hast noch keine Spiele beendet';
    }
}

function createNewBoard(game, htmlContainer, i) {
    htmlContainer.innerHTML += `
    <a class="chessboard-box" href="/game/${game.id}">
        <div id="myBoard${i}" style="width: 200px"></div>
        <h3>${game.opponent}</h3>
    </a>`;

    const config = {
        position: game.fen,
        pieceTheme: '/img/chesspieces/{piece}.png',
        draggable: false,
        showNotation: false,
    };
    const board = Chessboard(`myBoard${i}`, config);
    if (!game.colorWhite) {
        board.orientation('black');
    }
}

getGames();
