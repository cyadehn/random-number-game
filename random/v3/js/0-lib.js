let typewriterID;
//scene.dialogue must contain an array

const response = (scene) => {
    //Check guess to set response text
    let responseText;
    let dx = scene.dialogue;
    
    // console.log(`%cThe upper number is ${scene.upper}, and the guessed number (type: ${typeof guess}) is ${guess}`, "color: blue;")

    if ( scene.attempts === 0 ) {
        responseText = dx.intro;
    } else if ( guess < 0 || guess > scene.upper || !guess ) {
        responseText = dx.invalid;
    } else if ( scene.notGuessed.indexOf(guess) === -1 ) {
        responseText = dx.alreadyGuessed;
    } else if ( guess != scene.randomNumber ) {
        responseText = dx.incorrect;
    } else {
        responseText = dx.correct;
    }
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
            console.info("Finished printing!");
            clearTimeout(typewriterID);
            i = 0;
        }
    }
    printChar();
}

//combine two functions above into below
const typewriter = ( scene ) => {
    clearTimeout(typewriterID);
    console.info(`Printing message for ${scene.name}...`)
    if ( scene.type == "game" ) {
        typeResponse(scene);
    }
    if ( scene.type == "line" ) {
        glitchType(scene);
    }
}

const getRandomNumber = (scene) => {
    let num = 0;
    num = Math.floor(Math.random() * scene.upper) + 1;
    return num;
}

const guessArray = (scene) => {
    let array = [];
    for ( let i = 0; i < scene.upper; i ++ ) {
        array.push( i + 1 );
    }
    return array;
}

const gridArray = (scene) => {
    let array = [];
    for ( let i = 1; i <= scene.upper; i ++ ) {
        let div = document.createElement("div");
        div.innerHTML = i;
        div.classList.add(i, "not-guessed");
        array.push(div);
    }
    return array;
}

const tSec = ( scene ) => {
    console.info("Calculating time elapsed...");
    let start = scene.t0;
    let end = scene.t1;
    let timeDiff = end - start;
    timeDiff /= 1000;
    let tSec = timeDiff.toFixed(2);
    playerScore.time[sceneIndex] = tSec;
}

const updateScore = () => {
    console.info("Updating score...");
    tSec( currentScene );
    playerScore.attempts[sceneIndex] = currentScene.attempts;
}

const guessTracker = () =>{
    
    console.info(`Updating guesses...`);

    //Remove from tracking array
    if ( currentScene.notGuessed[guess-1] ) {
        currentScene.notGuessed.splice( (
            currentScene.notGuessed.indexOf(guess)
        ) , 1 );
    }

    //Update guessGrid classes
    let guessDiv = currentScene.gridRef[guess - 1];
    if (guessDiv) {
        guessDiv.classList.remove("not-guessed");
        if ( guess === currentScene.randomNumber ) {
            guessDiv.classList.add("correct");
        } else {
            guessDiv.classList.add("guessed");
        }
    }
}

const counterUpdate = () => {
    let tDelta = Date.now() - t0;
    let seconds = (Math.floor(tDelta/1000) % 60).toLocaleString(undefined, {minimumIntegerDigits: 2});
    // let hundredths = Math.floor((tDiff - (seconds * 100))/10).toFixed(3);
    let minutes = Math.floor(tDelta/60000).toLocaleString(undefined, {minimumIntegerDigits: 2});
    let target = appWindow.counter;
    target.innerHTML = minutes + "m:" + seconds + "s";
}