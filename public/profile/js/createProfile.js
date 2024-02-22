document.getElementById('username').innerHTML = window.location.pathname.split('@')[1];


const stats = {
    games: 0,
    win: 0,
    draw: 0,
    lose: 0,
};

function createStatistics(games) {
    games.forEach((game) => {
        console.log(game.colorWhite);
        console.log(game.gameStatus);
        if (game.colorWhite && game.gameStatus === 1 || !game.colorWhite && game.gameStatus === 2) {
            stats.win++;
        } else if (game.colorWhite && game.gameStatus === 2 || !game.colorWhite && game.gameStatus === 1) {
            stats.lose++;
        } else if(game.gameStatus === 3) {
            stats.draw++;
        } else {
            return;
        }
        stats.games++;
    });

    document.getElementById('bar-section-win').style.width = `${stats.win / stats.games * 100}%`;
    document.getElementById('bar-section-win-text').innerHTML = `${Math.round(stats.win / stats.games * 100)}%(${stats.win})`;
    document.getElementById('bar-section-draw').style.width = `${stats.draw / stats.games * 100}%`;
    document.getElementById('bar-section-draw-text').innerHTML = `${Math.round(stats.draw / stats.games * 100)}%(${stats.draw})`;
    document.getElementById('bar-section-lose').style.width = `${stats.lose / stats.games * 100}%`;
    document.getElementById('bar-section-lose-text').innerHTML = `${Math.round(stats.lose / stats.games * 100)}%(${stats.lose})`;
}