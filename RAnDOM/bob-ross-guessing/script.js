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

let upper = 10;
let getRandomNumber = upper => Math.floor(Math.random() * upper) + 1;
let randomNumber = getRandomNumber(upper);
let attempts = 0;
let correctGuess = false;

let rossQuotes = [
  "Be brave.", 
  "Let's have a happy little tree in here.", 
  "The secret to doing anything is believing that you can do it. Anything that you believe you can do strong enough, you can do. Anything. As long as you believe.",
  "All you have to do is let your imagination go wild.",
  "We'll throw some happy little limbs on this tree.",
  "Painting should do one thing. It should put happiness in your heart.",
  "Just go out and talk to a tree. Make friends with it.",
  "Talent is a pursued interest. That is to say, anything you practice you can do.",
  "If what you're doing doesn't make you happy - you're doing the wrong thing.",
  "Absolutely no pressure. You are just a whisper floating across a mountain."
];
let quotesNum = rossQuotes.length;
let getQuote = () => getRandomNumber(quotesNum);

let t0 = performance.now();

// let guess = prompt(`Hiya, Stephen. Guess a number between 1 and ${upper}! C'mon, I dare ya.`);

do {
  guess = prompt(`Hiya, Stephen. Guess a number between 1 and ${upper}! C'mon, I dare ya.`)
  attempts +=1;
  if (parseInt(guess) === randomNumber) {
    correctGuess = true;
  } else {
    document.write(`${rossQuotes[getQuote]}`);
    guess = setTimeout(function() {parseInt(prompt(`Hm. It wasn't that one, but you've got this! Go ahead and guess another number between 1 and ${upper}.`))}, 2000);
  } 
} while ( ! correctGuess )

let t1 = performance.now();

document.write(`There you go! You guessed it!<br>The number was <strong>${randomNumber}</strong>, and it took you ${attempts} tries and ${(t1 - t0)/60000} seconds to get it. `)