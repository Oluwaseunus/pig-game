/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let modal = document.getElementById("myModal");
let close = document.getElementById("close");
let btn = document.getElementById("btn");

setTimeout(() => {
    modal.style.display = "block";
}, 1000);

close.onclick = function () {
    modal.style.display = "none";
}

let scores, roundScore, activePlayer, dice, isPlaying;

newGame();

function switchPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector(".dice1").style.display = "none";
    document.querySelector(".dice2").style.display = "none";

    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";

    document.querySelector(`.player-0-panel`).classList.toggle('active');
    document.querySelector(`.player-1-panel`).classList.toggle('active');
}

function play() {
    if (isPlaying) {
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;

        let diceDOM1 = document.querySelector('.dice1');
        let diceDOM2 = document.querySelector('.dice2');
        diceDOM1.style.display = "block";
        diceDOM2.style.display = "block";
        diceDOM1.src = `dice-${dice1}.png`;
        diceDOM2.src = `dice-${dice2}.png`;

        if (dice1 === 6 && dice2 === 6) {
            alert("You rolled two sixes!");
            scores[activePlayer] = Math.floor((scores[activePlayer] + roundScore) / 2);
            document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
            switchPlayer();
        } else if (dice1 === 1 && dice2 === 1) {
            alert("You rolled two ones!");
            switchPlayer();
        } else {
            roundScore += dice1 + dice2;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        }
    }
}

document.querySelector('.btn-roll').addEventListener('click', play);

document.addEventListener('keypress', event => {
    if (event.key === "r")  play();
    else if (event.key === "h") hold();
    else if (event.key === "n") newGame();
});

function hold() {
    if (isPlaying) {
        let input = document.getElementById("score-input").value;
        let winningScore;
        (input) ? winningScore = input : winningScore = 500;

        scores[activePlayer] += roundScore;
        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= winningScore) {
            isPlaying = false;
            document.querySelector(`#name-${activePlayer}`).innerHTML = "<b>WINNER!</b>";
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            document.querySelector(".btn-roll").style.display = "none";
            document.querySelector(".btn-hold").style.display = "none";
            document.querySelector(".dice1").style.display = "none";
            document.querySelector(".dice2").style.display = "none";
        } else switchPlayer();
    }
}

document.querySelector('.btn-hold').addEventListener('click', hold);

document.querySelector(".btn-new").addEventListener('click', newGame);

function newGame() {
    isPlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    
    document.querySelector('.dice1').style.display = "none";
    document.querySelector('.dice2').style.display = "none";
    
    document.getElementById('score-0').textContent = "0";
    document.getElementById('score-1').textContent = "0";
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";

    document.querySelector(".btn-roll").style.display = "block";
    document.querySelector(".btn-hold").style.display = "block";

    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';

    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.add('active');
};