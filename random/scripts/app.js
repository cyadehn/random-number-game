let upper = 20;
let getRandomNumber = (upper) => Math.floor(Math.random() * upper) +1;
let randomNumber = getRandomNumber(upper);
let correctGuess = false;
let attempts = 0;
let guess;
let invalidGuess;
let t0 = 0;
let t1 = 0;
let speed = 25; //time in ms between typewriter characters
let typewriterID;
let allPrompts = {
    start: `> Hi, there! Type below to guess a number between 1 and ${upper}!`,
    wrongGuess: `> Hm. That wasn't it, huh? Just keep guessing! What's another number between 1 and ${upper}?`,
    invalidGuess: `> ...that doesn't look like a number between 1 and ${upper}... That's okay! Take a breather and then you're sure to get it!`,
    correct: ""
}

const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("guess-submit");
const prevGuesses = document.getElementById("prev-guesses");
const speechBox = document.getElementById("speech-box");

for ( let i = 1; i <= upper; i ++ ) {
    div = document.createElement("div");
    div.innerHTML = i;
    div.classList.add(i, "not-guessed");
    prevGuesses.appendChild(div);
}

let guessGrid = Array.from(document.querySelectorAll("#prev-guesses div"));

function tSec(end, start) {
    let timeDiff = end - start;
    timeDiff /= 1000;
    let tSec = Math.round(timeDiff);
    return tSec;
}

const prompt = () => {
    
    /* Clear previous message */
    speechBox.innerHTML = "";

    let i = 0;
    let speech;

    const typewriter = () => {
        typewriterID = setTimeout(typewriter, speed);
        if ( i < speech.length ) {
            speechBox.innerHTML += speech.charAt(i);
            i += 1;
        } else {
             clearTimeout(typewriterID);
             console.log("typewriter end");
         }
    }
    
    if ( attempts === 0 ) {
        speech = allPrompts.start;
    } else if ( invalidGuess ) {
        speech = allPrompts.invalidGuess;
    } else if ( !correctGuess ) {
        speech = allPrompts.wrongGuess;
    } else {
        allPrompts.correct = `> There you go! You guessed correctly! The number was ${randomNumber}, and it took you ${attempts} tries and ${tSec(t1, t0)} seconds to get it.`;
        speech = allPrompts.correct;
    }
    typewriter();
}

const guessTracker = () =>{
    guessDiv = guessGrid[guess - 1];
    guessDiv.classList.remove("not-guessed");
    if ( guess === randomNumber ) {
        guessDiv.classList.add("correct");
    } else {
        guessDiv.classList.add("guessed");
    }
}

const checkAnswer = () => {
    guessTracker();
    if ( attempts === 0 ) {
        t0 = Date.now();
    }
    if ( guess === randomNumber ) {
        t1 = Date.now();
        correctGuess = true;
        guessInput.disabled = true;
        endGame();
    }
    prompt();
}



const endGame = () => {
    let remainder = guessGrid.filter( item => item.classList.contains("not-guessed"));
    console.log(remainder);
    remainder.forEach( item => item.classList.remove("not-guessed") );
    remainder.forEach( item => item.classList.add("guessed") );
}

/* User Interaction */

guessInput.addEventListener("input", () => {
  guess = parseInt(guessInput.value);
  console.log(guess);
});

guessInput.addEventListener("keyup", (e) => {
    if ( e.keyCode === 13 ) {
        e.preventDefault();
        document.querySelector("#guess-submit").click();
    }
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click");
    clearTimeout(typewriterID);
    attempts += 1;
    guess = parseInt(guessInput.value);
    if ( guess > 0 && guess <= upper ) {
        checkAnswer();
    } else {
        invalidGuess = true;
        prompt();
        invalidGuess = false;
    }
    guessInput.value = "";
});

window.addEventListener("load", () => {
    prompt();
});



