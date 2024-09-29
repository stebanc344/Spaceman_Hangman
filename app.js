const words = ["stars", "galaxies", "sun", "planets", "nebula", "supernova", "asteroid"];
let selectedWord = "";
let maxGuesses = [];
let attemptsLeft = 5;

function chooseWord() {
    const randomIndex = Math.floor(Math.random() * words.length); // floor is a static mehthod - allows you to return
    // the largest integer from random function - this seemed to simplify random function (not sure if needed)
    selectedWord = words[randomIndex];
}

function displayWord() {
    const wordDisplay = document.getElementById("wordDisplay");
    console.log(wordDisplay)
    console.log(selectedWord)
    console.log(maxGuesses)
    wordDisplay.innerHTML = selectedWord.split('').map((letter) => {
        console.log(letter)
        if (maxGuesses.includes(letter)) {
            console.log(letter)
            return letter
        }else{
           return "-"
        }
    }).join(" "); //rejoins letters into a string
}

function checkLetter(letter) {
    console.log('letter', letter)
    if (!maxGuesses.includes(letter)) {
        maxGuesses.push(letter);
        if (!selectedWord.includes(letter)) {
            attemptsLeft--;
        }
    }
    updateGameStatus();
}

function updateGameStatus() {
    displayWord();
    if (attemptsLeft <= 0) {
        document.getElementById("message").innerText = "Game Over! The word was: " + selectedWord;
        endGame();
    } else if (selectedWord.split('').every(letter => maxGuesses.includes(letter))) {
        document.getElementById("message").innerText = "Congratulations! You guessed the word!";
        endGame();
    } else {
        document.getElementById("message").innerText = `Attempts left: ${attemptsLeft}`;
    }
}
//function to end the game
function endGame() {
    const buttonsDiv = document.querySelector(".buttons");
    buttonsDiv.innerHTML = "";//clear all buttons
    document.getElementById("restartButton").style.display = "block";
}
// Event listener for the restart button to start a new game
document.getElementById("restartButton").addEventListener("click", startGame);

// Function to start a new game
function startGame() {
    maxGuesses = [];
    attemptsLeft = 5;
    chooseWord();
    displayWord(); 
    document.getElementById("message").innerText = `Attempts left: ${attemptsLeft}`;

    const buttonsDiv = document.querySelector(".buttons");
    buttonsDiv.innerHTML = "";

    for (let i = 97; i <= 122; i++) { // a-z in ASCII
        const button = document.createElement("button");
        button.innerText = String.fromCharCode(i);
        console.log(button.innerText)
        button.addEventListener("click", () => checkLetter(button.innerText));
        buttonsDiv.appendChild(button);
    }
    document.getElementById("restartButton").style.display = "show";
}

startGame();