async function getGames(){
    const username = window.location.pathname.split('@')[1];

    const response = await fetch('/api/profile/' + username);
    const games = await response.json();
    
    games.forEach((game, i) => {
        const htmlContainer = document.getElementById('last-games')

        createNewBoard(game, htmlContainer, i)
    });
}

function createNewBoard(game, htmlContainer, i){
    htmlContainer.innerHTML += `
    <a class="chessboard-box" href="/game/${game.id}">
        <div id="myBoard${i}" style="width: 200px"></div>
        <h3>${game.opponent}</h3>
    <a>`

    const config = {
        position: game.fen,
        pieceTheme: '/img/chesspieces/{piece}.png',
        draggable: false,
        showNotation: false
    }
    const board = Chessboard('myBoard' + i, config);
}


getGames();