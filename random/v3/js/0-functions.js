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
    playerScore.time[sceneIndex + 1] = tSec;
}

