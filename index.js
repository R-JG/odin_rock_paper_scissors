const roundNode = document.querySelector(".round");
let roundNumber = 1;
const maxRounds = 5;

const playerScoreNode = document.querySelector(".player .score");
const computerScoreNode = document.querySelector(".computer .score");
let playerScore = 0;
let computerScore = 0;

const playerMoveNode = document.querySelector(".player .move");
const computerMoveNode = document.querySelector(".computer .move");
let playerMove;
let computerMove;

const roundNumberNode = document.querySelector(".round-number");
const promptNode = document.querySelector(".prompt");
const startGameNode = document.querySelector(".start-game-display");
const startGameButton = document.querySelector(".start-game-button");
let runGame = true;

const buttons = document.querySelector(".buttons");
const rockButton = document.querySelector(".rock");
const paperButton = document.querySelector(".paper");
const scissorsButton = document.querySelector(".scissors");

const moveToImg = {
    "rock": "./img/rock.jpg",
    "paper": "./img/paper.jpg",
    "scissors": "./img/scissors.jpg",
}




function roundWin() {
    playerScore++;
    promptNode.textContent = "You won the round";
}

function roundLoss() {
    computerScore++;
    promptNode.textContent = "You lost the round";
}

function roundTie() {
    promptNode.textContent = "You tied the round";
}

async function startGame() {
    startGameNode.style.display = "block";
    startGameButton.addEventListener("click", (e) => {
        runGame = true;
        roundNumber = 1;
        playerScore = 0;
        computerScore = 0;
        roundNumberNode.textContent = roundNumber;
        promptNode.textContent = `The game has ${maxRounds} rounds. Make your move`;
        startGameNode.style.display = "none";
    }, {once: true});
    return new Promise((resolve) => {
        startGameButton.onclick = () => resolve();
    });
}

async function getPlayerMove() {

    rockButton.addEventListener("click", (e) => {
        playerMove = "rock";
    }, {once: true});

    paperButton.addEventListener("click", (e) => {
        playerMove = "paper";
    }, {once: true});

    scissorsButton.addEventListener("click", (e) => {
        playerMove = "scissors";
    }, {once: true});

    return new Promise((resolve) => {
        buttons.onclick = () => resolve();
    });
}

async function getComputerMove() {
    const movesArray = ["rock", "paper", "scissors"];
    const randomNumber = Math.floor(Math.random() * 3);
    computerMove = movesArray[randomNumber];
}

async function endRound(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            playerMoveNode.src = "./img/blank.png";
            computerMoveNode.src = "./img/blank.png";
            promptNode.textContent = "Make your move";
            resolve();
        }, ms);
    });
}

async function round() {

    roundNumberNode.textContent = roundNumber;

    playerMove = "";
    computerMove = "";
    playerScoreNode.textContent = playerScore;
    computerScoreNode.textContent = computerScore;

    await getPlayerMove();
    playerMoveNode.src = moveToImg[playerMove];

    await getComputerMove();
    computerMoveNode.src = moveToImg[computerMove];

    switch (playerMove) {
        case "rock":
            switch (computerMove) {
                case "rock":
                    roundTie();
                break;
                case "paper":
                    roundLoss();
                break;
                case "scissors":
                    roundWin();
                break;
            }
        break;
        
        case "paper":
            switch (computerMove) {
                case "rock":
                    roundWin();
                break;
                case "paper":
                    roundTie();
                break;
                case "scissors":
                    roundLoss();
                break;
            }
        break;
    
        case "scissors":
            switch (computerMove) {
                case "rock":
                    roundLoss();
                break;
                case "paper":
                    roundWin();
                break;
                case "scissors":
                    roundTie();
                break;
            }
        break;
    }

    playerScoreNode.textContent = playerScore;
    computerScoreNode.textContent = computerScore;

    await endRound(3500);

    roundNumber++;
}

async function main() {

    do {
        await startGame();

        do {
            await round();
        }
        while (roundNumber <= maxRounds);

        roundNumberNode.textContent = "-";
        promptNode.textContent = "Game finished";
        startGameButton.textContent = "Play again?";
    }
    while (runGame === true);
}

main();