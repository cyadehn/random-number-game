let typewriterID;
//scene.dialogue must contain an array

const response = (scene) => {
    //Check guess to set response text
    let responseText;
    let dx = scene.dialogue;
    
    console.info(`%cThe upper number is ${scene.upper} and the guessed number is ${guess}`, "color: blue;")

    console.log("Determining response...");
    if ( scene.attempts === 0 ) {
        console.info("%cResponse: intro", "color: blue;");
        responseText = dx.intro;
    } else if ( guess < 0 || guess > scene.upper || !guess ) {
        console.info(`%cThe guess is ${guess}`, "color: blue;");
        console.info("%Response: invalid.", "color: blue;");
        responseText = dx.invalid;
    } else if ( scene.notGuessed.indexOf(guess) === -1 ) {
        console.info(`%cThe guess is ${guess}`, "color: blue;");
        console.info("%Response: alreadyGuessed.", "color: blue;");
        responseText = dx.alreadyGuessed;
    } else if ( guess != scene.randomNumber ) {
        console.info(`%cThe guess is ${guess}`, "color: blue;");
        console.info("%cResponse: incorrect.", "color: blue;");
        responseText = dx.incorrect;
    } else {
        console.info(`%cThe guess is ${guess}`, "color: blue;");
        console.info("%cResponse: correct.", "color: blue;");
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
    let speed = 25;
    //Configure target HTML element & clear previous message
    let target = appWindow.speechBox;
    target.innerHTML = "";

    var text = response(scene);

    let i = 0;

    target.innerHTML = text;

    // const printChar = ( text ) => {
    //     console.log("Printing!");
    //     console.log( text );
    //     if ( i < text.length ) {
    //         typewriterID = setTimeout(printChar(text), speed);
    //         target.innerHTML += text.charAt(i);
    //         i += 1;
    //     } else {
    //          clearTimeout(typewriterID);
    //      }
    // }
    // printChar(text);
}

//combine two functions above into below
const typewriter = ( scene ) => {
    console.log("Typing message...")
    if ( scene.type == "game" ) {
        typeResponse(scene);
    }
    if ( scene.type == "line" ) {
        glitchType(scene);
    }
}

const getRandomNumber = (scene) => {
    // console.log("getRandomNumber has started");
    let num = 0;
    // console.log(`The type of num is ${typeof num}!`);
    // console.log(`The upper number is ${scene.upper} and its type is ${typeof scene.upper}`);
    num = Math.floor(Math.random() * scene.upper) + 1;
    // console.log(`The type of num is ${typeof num}!`);
    // console.log(num);
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
    console.log("Calculating time elapsed...");
    let start = scene.t0;
    let end = scene.t1;
    let timeDiff = end - start;
    timeDiff /= 1000;
    let tSec = timeDiff.toFixed(2);
    playerScore.time[sceneIndex] = tSec;
}

const updateScore = () => {
    console.log("Updating score...");
    tSec( currentScene );
    playerScore.attempts[sceneIndex] = currentScene.attempts;
}

const guessTracker = () =>{
    
    console.log(`Your guess is ${guess}, type: "${typeof guess}." Updating guesses...`);

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