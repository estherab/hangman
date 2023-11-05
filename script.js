const keyboard = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
const hintText = document.querySelector(".hint");
const guessesText = document.querySelector(".incorrect-letters");
const hangmanImage = document.querySelector(".hangman-container img");
const gameModal = document.querySelector(".game-modal");
const playAgainButton = document.querySelector(".play-again");

let currentWord, wrongGuessCount, correctLetters;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `Incorrect guesses: ${wrongGuessCount} / ${maxGuesses}`;
    keyboard.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;

    hintText.innerText = "Hint: " + hint;

    resetGame();
}

const gameOver = (victory) => {
    setTimeout(() => {
        const modalText = victory ? `You found the word:` : 'The correct word was:';
        gameModal.querySelector("img").src = `images/${victory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = victory ? 'Congrats!' : 'Game Over!';
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 100);
}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
                correctLetters.push(letter);
            }
        })
    }

    else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    
    button.disabled = true;
    guessesText.innerText = `Incorrect guesses: ${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboard.appendChild(button);

    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainButton.addEventListener("click", getRandomWord);