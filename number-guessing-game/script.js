// function randomNumber(upper) {
//   return Math.floor( Math.random() * upper ) + 1;
// }

// let counter = 0;
// while ( counter < 10000 ) {
//   document.write(`${randomNumber(65)} `);
//   counter += 1;
// }

// let upper = 10000;
// let getRandomNumber = upper => Math.floor(Math.random() * upper) + 1; 
// let randomNumber = getRandomNumber(upper);
// let guess;
// let attempts = 0;

// let t0 = performance.now();

// while ( guess !== randomNumber ) {
//   guess = getRandomNumber(upper);
//   attempts += 1;
// }

// let t1 = performance.now();

// document.write(`The random number was <strong>${guess}</strong> and the computer took <strong>${attempts}</strong> tries and ${(t1 - t0)/60000} seconds to guess it.`)

function tSec(end, start) {
let timeDiff = end - start;
timeDiff /= 1000;
let tSec = Math.round(timeDiff);
return tSec;
}

function message() {
  let message = `There you go! You guessed correctly!<br>The number was <strong>${randomNumber}</strong>, and it took you ${attempts} tries and ${tSec(t1, t0)} seconds to get it.`;
  return message;
}

let upper = 20;
let getRandomNumber = (upper) => Math.floor(Math.random() * upper) +1;
let randomNumber = getRandomNumber(upper);
let correctGuess = false;
let attempts = 0;
let guess;
let t0 = 0;
let t1 = 0;

t0 = Date.now();
guess = prompt(`Hey, guess a number between 1 and ${upper}!`);
attempts += 1;

if ( parseInt(guess) === randomNumber ) {
  t1 = Date.now();
  document.write(message());
} else {
  do {
    guess = prompt(`Hm. That wasn't it, huh? Just keep guessing! What's another number between 1 and ${upper}?`);
    attempts += 1;
    if (parseInt(guess) === randomNumber ) {
      correctGuess = true;
    }
  } while ( ! correctGuess )
  t1 = Date.now();
  document.write(message());
}




