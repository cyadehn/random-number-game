let upper = 20;
let getRandomNumber = (upper) => Math.floor(Math.random() * upper) +1;
let randomNumber = getRandomNumber(upper);
let correctGuess = false;
let attempts = 0;
let guess;
let t0 = 0;
let t1 = 0;

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

const tSec = (end, start) => {
    let timeDiff = end - start;
    timeDiff /= 1000;
    let tSec = Math.round(timeDiff);
    return tSec;
}

const prompt = () => {
    // let speed = 100;
    // let i = 0;
    let message;
    speechBox.innerHTML = "";
    if ( attempts === 0 ) {
        message = `Hey, guess a number between 1 and ${upper}!`;
    } else if ( !correctGuess ) {
        message = `Hm. That wasn't it, huh? Just keep guessing! What's another number between 1 and ${upper}?`;
    } else {
        message = `There you go! You guessed correctly!<br>The number was <strong>${randomNumber}</strong>, and it took you ${attempts} tries and ${tSec(t1, t0)} seconds to get it.`;
    }
    
    console.log(message);
    
    speechBox.innerHTML = message;

    // const typewriter = () => {
    //     if ( i < message.length ) {
    //         speechBox.innerHTML += message.charAt(i);
    //         i += 1;
    //     }
    //     setTimeout(typewriter, speed);
    //     console.log(i);
    // }
    // typewriter();
}

const checkAnswer = () => {
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



