let currentScene = scene1;

//scene.dialogue must contain an array
const glitchType = (scene) => {

    //Configure glitch function speed
    let glitchSpeed = 4;
    //Configure target HTML element
    let target = appWindow.speechBox;

    let dialogue = scene.dialogue;
    let glitchTypeID;
    let arrayIndex = 0;
    let lineIndex = 0;

    const printLine = () => {
        if ( lineIndex < dialogue[arrayIndex].length ) {
            if ( dialogue[arrayIndex]) {
                target.innerHTML += dialogue[arrayIndex].charAt(lineIndex);
                lineIndex += 1;
                console.log("line index increased to " + lineIndex);
                glitchTypeID = setTimeout(printLine, glitchSpeed);
            }
        } else if ( index < dialogue.length ) {
            domVar.innerHTML = "";
            index += 1;
            lineIndex = 0;
            printLine();
            console.log("restart");
        }
    }
    printLine();
}

const typeResponse = (scene) => {
    
    //Configure typewriter function speed
    let speed = 25;
    //Configure target HTML element & clear previous message
    let target = appWindow.speechBox;
    target.innerHTML = "";
    
    let dialogue = scene.dialogue;
    let response;

    //Sets response according to checkAnswer result
    if ( scene.attempts === 0 ) {
        response = dialogue.intro;
    } else if ( invalidGuess ) {
        response = dialogue.invalid;
    } else if ( !correctGuess ) {
        response = dialogue.incorrect;
    } else {
        response = dialogue.correct;
    }

    let typewriterID;
    let i = 0;

    const typewriter = (text) => {
        typewriterID = setTimeout(typewriter, speed);
        if ( i < text.length ) {
            speechBox.innerHTML += text.charAt(i);
            i += 1;
        } else {
             clearTimeout(typewriterID);
         }
    }
    typewriter(response);
}

const typewriter = ( scene ) => {
    if ( scene.type == "game" ) {
        typeResponse(scene);
    }
    if ( scene.type == "line" ) {
        glitchType(scene);
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

const submit = (e) => {
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
}

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