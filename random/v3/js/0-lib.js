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
        console.log("array push");
    }
    return array;
}

const gridArray = (scene) => {
    let array = [];
    for ( let i = 1; i <= scene.upper; i ++ ) {
        div = document.createElement("div");
        div.innerHTML = i;
        div.classList.add(i, "not-guessed");
        array = array.push(div);
        console.log(array);
    }
    return array;
}

//combine two functions above into below
const typewriter = ( scene ) => {
    if ( scene.type == "game" ) {
        typeResponse(scene);
    }
    if ( scene.type == "line" ) {
        glitchType(scene);
    }
}

const tSec = ( scene ) => {
    let start = scene.t0;
    let end = scene.t1;
    let timeDiff = end - start;
    timeDiff /= 1000;
    let tSec = timeDiff.toFixed(2);
    playerScore.time[sceneIndex] = tSec;
}

const updateScore = () => {
    tSec( currentScene );
    playerScore.attempts[sceneIndex] = currentScene.attempts;
}

const guessTracker = () =>{
    let guessDiv = currentScene.guessGrid[guess - 1];
    guessDiv.classList.remove("not-guessed");
    if ( guess === randomNumber ) {
        guessDiv.classList.add("correct");
    } else {
        guessDiv.classList.add("guessed");
    }
}

const response = () => {
    let response;
    let dx = currentScene.dialogue;
    if ( !guess > 0 || !guess <= currentScene.upper ) {
        response = dx.invalid
    } else if ( !currentScene.guesses[guess-1] ) {
        response = dx.alreadyGuessed;
    } else if ( guess != currentScene.randomNumber ) {
        response = dx.incorrect;
    } else {
        response = dx.correct;
        endGame();
    }
    return response;
}

const counterUpdate = () => {
    let tDiff = Date.now() - t0;
    let seconds = Math.floor(tDiff/1000);
    // let hundredths = Math.floor((tDiff - (seconds * 100))/10).toFixed(3);
    let minutes = Math.floor(seconds/60);
    let target = appWindow.counter;
    target.innerHTML = minutes + "m:" + seconds + "s";
}