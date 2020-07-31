# RaNDOM Number Guessing Game

## Project Description

This game is loosely based off a random number guessing game that was taught in a JavaScript course on Treehouse. You will start the game being prompted by the browser to guess a number between 1 and a set upper number. The computer will respond differently if you enter:

  1. A number outside of this range / a non-number
  2. A previously-guessed number
  3. An incorrect number
  4. The correct number
  
There are sections of code that are intended for future development on this game. The game has been shortened for current deadlines, but will be expanded following submission to Code Louisville.
    
## Included features
  1. Create a JavaScript function whose return value is used in your site. The function must be triggered by user action (ex: clicking a button).

Several of these are present, but the most prominent return functions are defined in the dialogue. Each response is triggered by the player's submission, and the dialogue functions themselves will return a template literal to be evaluated and printed to the browser window.
  
```
const response = (scene) => {
    let responseText;
    let dx = scene.dialogue;

    if ( scene.attempts === 0 ) {
        responseText = dx.intro();
    } else if ( guess < 0 || guess > scene.upper || !guess ) {
        responseText = dx.invalid();
    } else if ( scene.possibleGuesses.indexOf(guess) === -1 ) {
        responseText = dx.alreadyGuessed;
    } else if ( guess != scene.randomNumber ) {
        responseText = dx.incorrect();
    } else {
        responseText = dx.correct();
    }
    responseText = responseText.toUpperCase();
    return responseText;
}

```
  
  2. Use JavaScript to perform math operations and display the result on your site

My favorite example of this is the function that builds the hint grid. 

I first started with a function that would push and unshift values to an array in a for loop based on the set random number ( e.g.: [n] -> [n-1, n, n+!] -> [n-2, n-1, n, n+1, n+2], etc. ). After realizing this left the number at the same position every time the game runs, I rewrote the function to start the tracking array at a random subtracted number and then fill the array up to a length equaling the intended amount (e.g.: [n-r] -> [n-r, n-r+i ... n ... n + i] )

  3. Create and populate a JavaScript array, then retrieve and display one or more values from it

The hint grid displayed in the browser window is built by pushing div elements to an array to be accessed and appended later to the guess window.

```
const gridArray = (scene) => {
    let range = scene.displayRef;
    let array = [];
    for ( let i = 0; i < range.length; i ++ ) {
        let div = document.createElement("div");
        div.innerHTML = range[i];
        div.classList.add(i, "not-guessed");
        array.push(div);
    }
    return array;
}
```
```
const sceneInit = () => {

/...

    if ( currentScene.type == "game" ) {
        appWindow.submit.disabled = false;
        //append hint grid divs to current window
        currentScene.gridRef.forEach( (x) => {
            appWindow.guessGrid.appendChild(x);
        });
        currentScene.gridRef = Array.from(document.querySelectorAll("#grid div"));
        appWindow.guessWindow.setAttribute("style", "visibility: hidden");
        typewriter( currentScene );
    }
    
 .../
 
}
```

## Special Instructions
The project should run without any additional instructions. You *can* edit some of the parameters at the following line numbers in ./js/app.js:

  * Line 47: Upper number of possible guesses
  * Line 48: Range of guesses displayed in hint grid
  * Line 233: Speed in ms of prompt readout
