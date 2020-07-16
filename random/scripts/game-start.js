let upper = 20;
let getRandomNumber = (upper) => Math.floor(Math.random() * upper) +1;
let randomNumber = getRandomNumber(upper);
let correctGuess = false;
let attempts = 0;
let guess;
let invalidGuess;
let t0;
let t1;
let tNow;
let speed = 25; //time in ms between typewriter characters
let typewriterID;
let allPrompts = {
    heading: `> ##Let's Make Random Numbers!##`,
    start: `> Hi, there! Type below to guess a number between 1 and ${upper}!`,
    wrongGuess: `> Hm. That wasn't it, huh? Just keep guessing! What's another number between 1 and ${upper}?`,
    invalidGuess: `> ...that doesn't look like a number between 1 and ${upper}... That's okay! Take a breather and then you're sure to get it!`,
    correct: ""
}
let firstGameOver = false;
let glitchID;
let glitchInterval = 1000;
let glitchRepeat = 20;
let interval;
let repeat;
let glitchStarted;

const app = document.querySelector(".app-demo");
const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("guess-submit");
const prevGuesses = document.getElementById("prev-guesses");
const speechBox = document.getElementById("speech-box");
const counter = document.getElementById("counter");

for ( let i = 1; i <= upper; i ++ ) {
    div = document.createElement("div");
    div.innerHTML = i;
    div.classList.add(i, "not-guessed");
    prevGuesses.appendChild(div);
}

let guessGrid = Array.from(document.querySelectorAll("#prev-guesses div"));

const tSec = (end, start) => {
    let timeDiff = end - start;
    timeDiff /= 1000;
    let tSec = timeDiff.toFixed(2);
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

const counterUpdate = () => {
    if ( attempts !== 0 ) {
        tNow = Date.now();
        let tDiff = tNow - t0;
        let seconds = Math.floor(tDiff/1000);
        // let hundredths = Math.floor((tDiff - (seconds * 100))/10).toFixed(3);
        let minutes = Math.floor(seconds/60);
        counter.innerHTML = minutes + "m:" + seconds + "s";
    }
}

const counterID = window.setInterval(counterUpdate, 100);

const checkAnswer = () => {
    guessTracker();
    if ( guess === randomNumber ) {
        t1 = Date.now();
        clearInterval(counterID);
        correctGuess = true;
        guessInput.disabled = true;
        endGame();
    }
}

const glitch = () => {
    if (glitchStarted) {
        interval = glitchInterval;
        repeat = glitchRepeat;
        glitchStarted = false;
    }
    if ( app.classList.contains("glitch") ) {
        app.classList.remove("glitch");
        console.log("Glitch removed!");
    } else {
        app.classList.add("glitch");
        console.log("Glitch added!");
    }
    if ( interval >= 250 ) {
        interval -= 50;
        console.log(interval);
        glitchID = setTimeout(glitch, interval);
        console.log("glitch increase");
    } else if ( repeat ) {
        glitchID = setTimeout(glitch, interval);
        repeat -= 1;
        console.log("glitch repeat");
    }
}

const glitchStart = () => {
    glitchStarted = true;
    glitch();
}

const endGame = () => {
    let remainder = guessGrid.filter( item => item.classList.contains("not-guessed"));
    remainder.forEach( item => item.classList.remove("not-guessed") );
    remainder.forEach( item => item.classList.add("guessed") );
    console.log("First game has ended");
    glitchStart();
}

/* User Interaction */

guessInput.addEventListener("input", () => {
  guess = parseInt(guessInput.value);
});

guessInput.addEventListener("keyup", (e) => {
    e.preventDefault();
    if ( e.keyCode === 13 ) {
        document.querySelector("#guess-submit").click();
    }
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if ( attempts === 0 ) {
        t0 = Date.now();
    }
    attempts += 1;
    clearTimeout(typewriterID);
    guess = parseInt(guessInput.value);
    if ( guess > 0 && guess <= upper ) {
        checkAnswer();
        prompt();
    } else {
        invalidGuess = true;
        prompt();
        invalidGuess = false;
    }
    guessInput.value = "";
});

window.addEventListener("load", () => {
    prompt();
    guessInput.focus();
});



