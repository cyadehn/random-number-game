let glitchTypewriterID;
let printLineID;
let glitchSpeed = 4;
let index = 0;
let lineIndex = 0;
let speed = 25; //time in ms between typewriter characters
let typewriterID;

const glitchTypewriter = (array, domVar) => {
    const printLine = () => {
        if ( lineIndex < array[index].length ) {
            if ( array[index]) {
                domVar.innerHTML += array[index].charAt(lineIndex);
                lineIndex += 1;
                console.log("line index increased to " + lineIndex);
                printLineID = setTimeout(printLine, glitchSpeed);
            }
        } else if ( index < array.length ) {
            domVar.innerHTML = "";
            index += 1;
            lineIndex = 0;
            glitchTypewriter(text, speechBox);
            console.log("restart");
        }
    }
    printLine();
}
glitchTypewriter(text, speechBox);

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

const typewriter = ( mode, scene ) => {
    if ( mode = char ) {

    }
    if ( mode = line ) {

    }
}

//
//
//

let glitchID;
let glitchInterval = 1000;
let glitchRepeat = 20;
let interval;
let repeat;
let glitchStarted;

const glitch = () => {
    if (glitchStarted) {
        interval = glitchInterval;
        repeat = glitchRepeat;
        glitchStarted = false;
    }
    if ( !app.classList.contains("glitch") && repeat ) {
        app.classList.add("glitch");
        console.log("Glitch added!");
    } else {
        app.classList.remove("glitch");
        console.log("Glitch removed!");
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

const glitch = () => {
 //iterate set amount of glitches according to the number of lines present (only before first and after last RANDOM scene)
    for (   ) {
    typewriter( char,  )
 }
}

const windowGlitch = () => {
    ranx = random#(upper=VW)
    rany = random(upper=vh)
    StyleSheet translate()
}

const displayGuesses = (e) => {
    if ( e.click = down ) {
        target #guessGrid
        display
    }
    if ( e.click = up/lift ) {
        target #guessGrid
        un-display
    }
    if (/touch) {
        target guess grid
        unfocus keyboard, focus guess grid
        display
    }
    if (lift) {
        //user gets nauseous if we focus the input again?
        target guess grid
        display
    }
}

let t0;
let t1;
let tNow;

const tSec = (end, start) => {
    let timeDiff = end - start;
    timeDiff /= 1000;
    let tSec = timeDiff.toFixed(2);
    return tSec;
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

const initializeGame = () => {
    resetWindow
    resetGrid
    appendGrid
    typewriter( char, introDX )
    
}

let correctGuess = false;
let guess;
let invalidGuess;
let firstGameOver = false;

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

const checkAnswer = () => {
    checkAnswer
    let response;
    if ( invalid ) {

    } else if ( already guessed ) {
        
    } else if ( incorrect ) {

    } else if ( correct ) {
        
    }
    if ( correctAnswer = true ) {
        endGame()
        sceneIndex += 1;
        currentScene = findSceneIndex
    }
    typewriter(char, response)
}

const updateScore = () => {

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

const endGame = () => {
    let remainder = guessGrid.filter( item => item.classList.contains("not-guessed"));
    remainder.forEach( item => item.classList.remove("not-guessed") );
    remainder.forEach( item => item.classList.add("guessed") );
    console.log("First game has ended");
    glitchStart();
}

const endGame = () => {
    updateScore();
    if ( currentScene.type = game ) {
        initializeGame(currentScene);
    }
    if ( currentScene.type = glitch ) {
        glitch()
    }
}