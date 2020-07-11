let upper = 20;
let getRandomNumber = (upper) => Math.floor(Math.random() * upper) +1;
let randomNumber = getRandomNumber(upper);
let correctGuess = false;
let attempts = 0;
let guess;
let t0 = 0;
let t1 = 0;
let speed = 25; //time in ms between typewriter characters
let typewriterID;
let allPrompts = {
    start: `> Hey, guess a number between 1 and ${upper}!`,
    wrongGuess: `> Hm. That wasn't it, huh? Just keep guessing! What's another number between 1 and ${upper}?`,
    correct: `> There you go! You guessed correctly!<br>The number was <strong>${randomNumber}</strong>, and it took you ${attempts} tries and ${tSec(t1, t0)} seconds to get it.`
}
let speech;

const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("guess-submit");
const prevGuesses = document.getElementById("prev-guesses");
const speechBox = document.getElementById("speech-box");

for ( let i = 0; i < upper; i ++ ) {
    div = document.createElement("div");
    div.innerHTML = `${i + 1}`
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

    const typewriter = () => {
        typewriterID = setTimeout(typewriter, speed);
        if ( i < speech.length ) {
            speechBox.innerHTML += speech.charAt(i);
            i += 1;
            console.log(i);
        } else {
             clearTimeout(typewriterID);
             console.log("end");
         }
    }
    
    if ( attempts === 0 ) {
        speech = allPrompts.start;
    } else if ( !correctGuess ) {
        speech = allPrompts.wrongGuess;
    } else {
        speech = allPrompts.correct;
    }
    typewriter();
}

const checkAnswer = () => {
    clearTimeout(typewriterID);
    if ( attempts === 0 ) {
        t0 = Date.now();
    }
    guess = guessInput.value;
    attempts += 1;
    
    if ( parseInt(guess) === randomNumber ) {
        t1 = Date.now();
        correctGuess = true;
        guessInput.disabled = true;
    }
    prompt();
}

// if ( parseInt(guess) === randomNumber ) {
//     t1 = Date.now();
//     document.write(message());
// } else {
//     do {
//     guess = prompt();
//     attempts += 1;
//     if (parseInt(guess) === randomNumber ) {
//         correctGuess = true;
//     }
//     } while ( ! correctGuess )
//     t1 = Date.now();
//     document.write(message());
// }

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
    console.log("click");
    checkAnswer();
    guessInput.value = "";
});

window.addEventListener("load", () => {
    prompt();
});



