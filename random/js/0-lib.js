let typewriterID;
//scene.dialogue must contain an array

const response = (scene) => {
    //Check guess to set response text
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

const glitchType = (scene) => {

    //Configure glitch function speed
    let glitchSpeed = 4;
    //Configure target HTML element
    let target = appWindow.speechBox;

    let dialogue = scene.dialogue;
    let arrayIndex = 0;
    let lineIndex = 0;

    const printLine = () => {
        if ( lineIndex < dialogue[arrayIndex].length ) {
            if ( dialogue[arrayIndex]) {
                target.innerHTML += dialogue[arrayIndex].charAt(lineIndex);
                lineIndex += 1;
                console.log("line index increased to " + lineIndex);
                typewriterID = setTimeout(printLine, glitchSpeed);
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
    let speed = 15;
    //Configure target HTML element & clear previous message
    let target = appWindow.speechBox;
    target.innerHTML = "";

    let responseText = response(scene);
    let i = 0;
    // target.innerHTML = responseText;

    const printChar = () => {

        if ( i < responseText.length ) {
            typewriterID = setTimeout(() => {
                printChar();
            }, speed);
            target.innerHTML += responseText.charAt(i);
            i += 1;
        } else {
            clearTimeout(typewriterID);
            i = 0;
        }
    }
    printChar();
}

//combine two functions above into below
const typewriter = ( scene ) => {
    clearTimeout(typewriterID);
    if ( scene.type == "game" ) {
        typeResponse(scene);
    }
    if ( scene.type == "line" ) {
        glitchType(scene);
    }
}

const tSec = ( scene ) => {
    console.info("Calculating time elapsed...");
    let start = scene.t0;
    let end = scene.t1;
    let timeDiff = end - start;
    timeDiff /= 1000;
    scene.tSec = timeDiff.toFixed(2);
    console.info(`tsec is ${timeDiff}`)
    return timeDiff;
}

const guessTracker = () =>{

    //Remove from tracking array
    let guessIndex = currentScene.possibleGuesses.indexOf(guess);
    if ( guessIndex > -1 ) {
        currentScene.possibleGuesses.splice(guessIndex, 1);
    }


    //Update guessGrid classes
    let guessDiv;
    let displayRef = currentScene.displayRef;
    let displayIndex = displayRef.indexOf(guess);
    if ( displayIndex > -1 ) {
        guessDiv = currentScene.gridRef[displayIndex];
        console.info(guessDiv);
    }
    if ( guessDiv && guessDiv.classList.contains("not-guessed") ) {
        guessDiv.classList.remove("not-guessed");
        if ( guess === currentScene.randomNumber ) {
            guessDiv.classList.add("correct");
        } else {
            guessDiv.classList.add("guessed");
        }
    }
}

const counterUpdate = () => {
    let tDelta = Date.now() - score[sceneIndex].player.t0;
    let seconds = (Math.floor(tDelta/1000) % 60).toLocaleString(undefined, {minimumIntegerDigits: 2});
    // let hundredths = Math.floor((tDiff - (seconds * 100))/10).toFixed(3);
    let minutes = Math.floor(tDelta/60000).toLocaleString(undefined, {minimumIntegerDigits: 2});
    let target = appWindow.counter;
    target.innerHTML = minutes + "m:" + seconds + "s";
}

const computer = () => {
    score[sceneIndex].computer.t0 = Date.now();
    let guess = 0;
    let randomNumber = currentScene.randomNumber;
    do {
        if ( !(guess === randomNumber) ) {
            guess += 1;
        }
        if ( guess === randomNumber ) {
            score[sceneIndex].computer.t1 = Date.now();
        }
    } while ( !(guess === randomNumber) )
}