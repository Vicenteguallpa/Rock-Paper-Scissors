// Let rock = 0, paper = 1, scissors = 2
const ROCK = "rock";
const ROCK_CAP = "Rock";
const ROCK_NUM = 0;
const PAPER = "paper";
const PAPER_CAP = "Paper";
const PAPER_NUM = 1;
const SCISSORS = "scissors";
const SCISSORS_CAP = "Scissors";
const SCISSORS_NUM = 2;

/**
 * Returns the capitalized version of "Rock", "Paper", or "Scissors"
 * 
 * @param {Number} selection 
 * @returns {String} 
 */
function getSelectionCap(selection) {
    if (selection == ROCK_NUM) {
        return ROCK_CAP;
    } else if (selection == PAPER_NUM) {
        return PAPER_CAP;
    } else if (selection == SCISSORS_NUM) {
        return SCISSORS_CAP;
    } else {
        // error
    }
}

/**
 * Returns the number associated with "Rock", "Paper", or "Scissors"
 * 
 * @param {String} selection 
 * @returns {Number}
 */
function getSelectionNum(selection) {
    selection = selection.toLowerCase();
    if (selection == ROCK) {
        return ROCK_NUM;
    } else if (selection == PAPER) {
        return PAPER_NUM;
    } else if (selection == SCISSORS) {
        return SCISSORS_NUM;
    } else {
        // error
    }
}

/**
 * Returns the string associated with "Rock", "Paper", or "Scissors"
 * 
 * @param {Number} selection 
 * @returns {String}
 */
function getSelectionStr(selection) {
    if (selection == ROCK_NUM) {
        return ROCK;
    } else if (selection == PAPER_NUM) {
        return PAPER;
    } else if (selection == SCISSORS_NUM) {
        return SCISSORS;
    } else {
        // error
    }
}

/**
 * Computer makes its selection
 * Randomly return either ‘Rock’, ‘Paper’ or ‘Scissors’
 * 
 * @returns{String}
 */
function computerPlay() {
    // get a random integer between 0 and 2
    var selection = Math.floor(Math.random() * 3);
    return getSelectionStr(selection);
}    

/**
 * Plays a single round of Rock Paper Scissors
 * Check values of player and computer selections and
 * return the result of the round
 * 
 * @param {String} playerSelection 
 * @param {String} computerSelection 
 * @returns {String}
 */
function playRound(playerSelection, computerSelection) {
    // Get the associated capitalized selection and number
    var playerNum = getSelectionNum(playerSelection);
    var playerSelectionCap = getSelectionCap(playerNum);
    var computerNum = getSelectionNum(computerSelection);
    var computerSelectionCap = getSelectionCap(computerNum);
    if (playerNum == computerNum) {
        return "You Tie this round! " + playerSelectionCap + " ties " + computerSelectionCap;
    } else if (
        (playerNum == ROCK_NUM && computerNum == SCISSORS_NUM) ||
        (playerNum == PAPER_NUM && computerNum == ROCK_NUM) ||
        (playerNum == SCISSORS_NUM && computerNum == PAPER_NUM)) {
            return "You Win this round! " + playerSelectionCap + " beats " + computerSelectionCap;
    } else if (
        (playerNum == ROCK_NUM && computerNum == PAPER_NUM) ||
        (playerNum == PAPER_NUM && computerNum == SCISSORS_NUM) ||
        (playerNum == SCISSORS_NUM && computerNum == ROCK_NUM)) {
            return "You Lose this round! " + computerSelectionCap + " beats " + playerSelectionCap;
    } else {
        // error
    }     
}

// Test
/*
const playerSelection = 'rock';
const computerSelection = computerPlay();
console.log(playRound(playerSelection, computerSelection));
*/

/**
 * Check that the selection is any variation of 'Rock'
 * 'Paper' or 'Scissors'
 * 
 * @param {String} selection 
 * @returns {Boolean}
 */
function isValidSelection(selection) {
    if (selection == null) {
        return false;
    }
    selectionNum = getSelectionNum(selection);
    return (selectionNum == ROCK_NUM) || (selectionNum == PAPER_NUM) || (selectionNum == SCISSORS_NUM);
}

/**
 * Return a selection that beats the input selection
 * 
 * @param {String} selection 
 * @returns {String}
 */
function cheat(selection) {
    selection = selection.toLowerCase();
    if (selection == ROCK) {
        return PAPER;
    } else if (selection == PAPER) {
        return SCISSORS;
    } else if (selection == SCISSORS) {
        return ROCK;
    } else {
        // error
    }
}

/**
 * Get the final result of the game
 * 
 * @param {Number} playerScore 
 * @param {Number} computerScore 
 * @returns {String}
 */
function getGameResult(playerScore, computerScore) {
    if (playerScore == computerScore) {
        return "You Tie the Game!";
    } else if (playerScore > computerScore) {
        return "You Win the Game!";
    } else if (playerScore < computerScore) {
        return "You Lose the Game!";
    } else {
        // error
    }
}

// simulate the game with a real player asked for inputs
/**
 * Play a game of a given input number of rounds where the
 * user is prompted for their selection. If their selection
 * is invalid (i.e not rock, paper, or scissors), we prompt 
 * them again. Results of each round and full game is 
 * printed to console.
 * 
 * @param {Number} maxRounds 
 */
function game(maxRounds) {
    console.log("Welcome to Rock Paper Scissors! You will be playing for " + maxRounds + " rounds!");
    var playerScore = 0;
    var computerScore = 0;
    for (var i = 0; i < maxRounds; i++) {
        console.log("Round " + (i + 1));
        var computerSelection = computerPlay();
        var playerSelection = prompt("Enter your move");
        while (!isValidSelection(playerSelection)) {
            playerSelection = prompt("That move is invalid, please enter 'rock', 'paper', or 'scissors'");
        }
        // uncomment the code below to always beat the computer!
        // playerSelection = cheat(computerSelection);
        result = playRound(playerSelection, computerSelection);
        console.log(result);
        if (result.startsWith("You W")) {
            playerScore++;
        } else if (result.startsWith("You L")) {
            computerScore++;
        } else {
            // tie or error
        }
        console.log("Your Score: " + playerScore);
        console.log("Computer Score: " + computerScore);
    }
    console.log(getGameResult(playerScore, computerScore));
}

// Test
// game(5);

const buttons = document.querySelector("#playerSelections").children;
const resetButton = document.querySelector("#reset");
const scoreBoard = document.querySelector("#scoreBoard");
const roundResult = document.querySelector("#roundResult");
const gameResult = document.querySelector("#gameResult");
var pScore = 0;
var cScore = 0;
var roundsPlayed = 0;
const maxRounds = 5;

/**
 * Update the score on the respective div element
 */
function updateScoreBoard() {
    scoreBoard.innerHTML = "You: " + pScore + ", Computer: " + cScore;
}

/**
 * Update the score and scoreboard of the player and 
 * computer based on the result
 * 
 * @param {String} result 
 */
function updateScore(result) {
    if (result.startsWith("You W")) {
        pScore++;
    } else if (result.startsWith("You L")) {
        cScore++;
    } else {
        // tie or error
    }
    updateScoreBoard();
}

// reset all scores and respective div elements
resetButton.addEventListener("click", (e) => {
    pScore = 0;
    cScore = 0;
    roundsPlayed = 0;
    updateScoreBoard();
    roundResult.innerHTML = "";
    gameResult.innerHTML = "";
});

/* For each button we add a listener that, when
   trigered, plays a round of the game. Once
   we reach the maximum number of rounds we 
   display the results
 */
for (var i = 0; i < buttons.length; i++) {
    var button = buttons.item(i);
    // when button is clicked, play a round
    button.addEventListener("click", (e) => {
        if (roundsPlayed < maxRounds) {
            var computerSelection = computerPlay();
            var playerSelection = e.target.dataset.selection;
            // uncomment the code below to always beat the computer!
            // playerSelection = cheat(computerSelection);
            var result = playRound(playerSelection, computerSelection);
            roundResult.innerHTML = result;
            updateScore(result);
            roundsPlayed++;
            if (roundsPlayed == maxRounds) {
                gameResult.innerHTML = getGameResult(pScore, cScore);
            }
        }
    });
}