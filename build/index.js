let squares = document.querySelectorAll('.square');
let player1 = document.querySelector('.player--0');
let player2 = document.querySelector('.player--1');
const gameState = ['', '', '', '', '', '', '', '', ''];
const playAgainBtn = document.querySelector('.play--again')
const restartPunctuationBtn = document.querySelector('.restart--punctuation');

let winnings = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let playing, activePlayer, draw, punctuationArray = [0, 0]
let circle = '<i class="far fa-circle"></i>';
let cross = '<i class="fas fa-times"></i>';

function init() {
    restartGame();
    playing = true;
    document.querySelector('.winner--mssg') ? document.querySelector('.winner--mssg').innerHTML = '' : null
    squares.forEach((square) => {
        square.innerHTML = '';
        square.classList.add('pointer');
        square.classList.remove('no-pointer');
    });
    activePlayer = 0;
    player1.classList.add("player--active");
    player2.classList.remove("player--active");

}
init();

function restartGame() {
    let i = gameState.length;
    while (i--) {
        gameState[i] = ''
    }
}

function restartPunctuation(){
    document.location.reload();
};


document.querySelector('.grid-container').addEventListener('click', handleCellClick);
playAgainBtn.addEventListener('click', init);
restartPunctuationBtn.addEventListener('click', restartPunctuation);


function handleCellClick(event) {
    const clickedCell = event.target;

    if (clickedCell.classList.contains('square')) {
        const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell);
        if (gameState[clickedCellIndex] !== '' || !playing) {
            return false;
        };

        handleCellPlayed(clickedCell, clickedCellIndex)
        handleValidation()
    }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    draw = activePlayer === 0 ? cross : circle;
    gameState[clickedCellIndex] = draw;
    clickedCell.innerHTML = draw;
}

function handleValidation() {
    let roundWon = false;

    for (let i = 0; i < winnings.length; i++) {
        const winningConditions = winnings[i];
        let pos1 = gameState[winningConditions[0]],
            pos2 = gameState[winningConditions[1]],
            pos3 = gameState[winningConditions[2]]


        if (pos1 === '' || pos2 === '' || pos3 === '') {
            continue
        };

        if (pos1 === pos2 && pos2 === pos3) {;
            handleWinner(activePlayer);
            punctuationArray[activePlayer]++;
            roundWon = true;
            document.querySelector(`.punctuation--player--${activePlayer}`).textContent = punctuationArray[activePlayer];
            break;
        }
    }

    if (roundWon) {
        playing = false;
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        playing = false;
        return;
    }

    switchPlayers()
}


function handleWinner(activePlayer){
    const html = `<h1 class='winner--mssg'> El jugador ${activePlayer + 1} ha ganado la partida!<h1>`;

    document.body.insertAdjacentHTML('afterbegin', html);
}



function switchPlayers() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle("player--active");
    player2.classList.toggle("player--active");
}

