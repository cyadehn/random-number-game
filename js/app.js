let typewriterID;
let counterID;
let guess;
let sceneIndex = 0;
let currentScene;

// DOM Nodes

const appWindow = {
    speechBox: document.getElementById("speech-box"),
    app: document.getElementById("app"),
    guessGrid: document.getElementById("grid"),
    guessWindow: document.getElementById("guess-window"),
    counter: document.getElementById("counter"),
    commandLine: document.getElementById("guess-input"),
    submit: document.getElementById("guess-submit"),
    gridBtn: document.getElementById("toggle-grid")
}

// Time/Score Storage

let score = [
    {
        computer: {},
        player: {}
    }
]

const scoreCalc = (obj) => { 100000/tSec(obj) }

const updateScore = () => {
    console.info("Updating score...");

    let computer = score[sceneIndex].computer;
    let player = score[sceneIndex].player;
    score[sceneIndex].computer.score = scoreCalc(computer);
    score[sceneIndex].player.score = scoreCalc(player);
}

// Structured Scene Data

const sceneData = [
    [
        "game", //type
        "game-start", //name
        "start", //activeWindow
        300, //upper
        20, //range
        {
            intro: () => { return `> Hi, there! Let's see if you can beat me at a game. Type below to guess a number between 1 and ${currentScene.upper}!` },
            incorrect: () => { return `> Hm. That wasn't it. No worries--just keep guessing! What's another number between 1 and ${currentScene.upper}?` },
            invalid: () => { return `> ...that doesn't look like a number between 1 and ${currentScene.upper}... That's okay! Take a breather and then you're sure to get it!` },
            alreadyGuessed: `> Sorry... you already guessed that number. Try again!`,
            correct: () => { return `> You did it! The number was ${currentScene.randomNumber} and it only took you ${currentScene.attempts} tries and ${score[sceneIndex].player.tSec} seconds to get it. In case you were wondering, it took me ${score[sceneIndex].computer.attempts} attempts and ${score[sceneIndex].computer.tSec < 0.01 ? "less than 0.01" : score[sceneIndex].computer.tSec} seconds. No big deal! :)` }
        } //dialogue
    ],
    [
        "conversation", //type
        "RaNDOM-arrives", //name
        "start", //activeWindow
        [
            {
                type: "flicker, scatter, burst, dialogue, pause, reset, cutscene",
                dialogue: {
                    text: [],
                    ref: "printLine"
                },
                iterations: undefined,
                arguments: undefined
            }
        ] //events
    ]
]

// Scene Constructor Functions

const guessArray = (scene, mode) => {
    let n = scene.randomNumber;
    let upper = scene.upper;
    let range = scene.range;
    console.log(`Number: ${n}, Upper: ${upper}, Range: ${range}`);
    if ( mode === "all" ) {
        let array = [];
        for ( let i = 0; i < upper; i ++ ) {
            array.push( i + 1 );
        }
        return array;
    } 
    if ( mode === "range" ) {
        let array = [];
        if ( upper === range ) {
            let array = [];
            for ( let i = 0; i < upper; i ++ ) {
            array.push( i + 1 );
            }
            console.log(array);
            return array;
        } else {
            let nPosition = getRandomNumber(range) - 1;
            for ( let i = 0; i < nPosition; i ++ ) {
                let number = n - nPosition + i;
                if ( number > 0 ) {
                    array.push(n-nPosition+i);
                }
            }
            array.push(n);
            for ( let i = 1; array.length < range; i++ ) {
                array.push( n + i );
            }
            return array;
        }
    }  
}

const gridArray = (scene) => { //rewrite to build via the guesses array
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

const getRandomNumber = (upper) => {
    let num = 0;
    num = Math.floor(Math.random() * upper) + 1;
    return num;
}

function GameScene(type, name, activeWindow, upper, range, dialogue) {
    this.type = type;
    this.name = name;
    this.activeWindow = activeWindow;
    this.upper = upper;
    this.randomNumber = getRandomNumber(this.upper);
    this.range = range;
    this.displayRef = guessArray(this, "range"); //range-based tracker
    this.possibleGuesses = guessArray(this, "all"); //all possible guesses
    this.gridRef = gridArray(this);
    this.attempts = 0;
    this.dialogue = dialogue;
}

function ConversationScene( type, name, activeWindow, events ) {
    this.type = type;
    this.name = name;
    this.activeWindow = activeWindow;
    this.events = events;
    this.eventIndex = 0;
}

const gameInit = () => {
    let scenes = [];
    for ( i = 0; i < sceneData.length; i ++ ) {
        let type = sceneData[i][0];
        if ( type == "game" ) {
            scenes[i] = new GameScene(...sceneData[i]);
        }
        if ( type == "conversation" ) {
            scenes[i] = new ConversationScene(...sceneData[i]);
        }
        if ( type == "cutscene" ) {
    
        }
    }
    console.info("Game initialized!");
    return scenes;
}

const scenes = gameInit();

// Main Function Library

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
    score[sceneIndex].computer.attempts = 0;
    do {
        if ( !(guess === randomNumber) ) {
            guess += 1;
            score[sceneIndex].computer.attempts += 1;
        }
        if ( guess === randomNumber ) {
            score[sceneIndex].computer.t1 = Date.now();
        }
    } while ( !(guess === randomNumber) )
}

// Main Game Functions

const sceneInit = () => {

    currentScene = scenes[sceneIndex];
    if ( currentScene.type == "glitch" || "cutscene" ) {
        // glitch();
    }
    if ( currentScene.type == "game" ) {
        appWindow.submit.disabled = false;
        currentScene.gridRef.forEach( (x) => {
            appWindow.guessGrid.appendChild(x);
        });
        currentScene.gridRef = Array.from(document.querySelectorAll("#grid div"));
        appWindow.guessWindow.setAttribute("style", "visibility: hidden");
        typewriter( currentScene );
    }
    console.info("Scene initialized!");
    appWindow.commandLine.focus();
}

const checkAnswer = (e) => {
    console.info("Checking answer...");
    e.preventDefault();
    if ( currentScene.attempts === 0 ) {
        score[sceneIndex].player.t0 = Date.now();
        computer();
        counterID =  window.setInterval(counterUpdate, 100);
    }
    
    currentScene.attempts += 1;
    guess = parseInt(appWindow.commandLine.value);
    if (!(guess === currentScene.randomNumber)) {
        typewriter( currentScene );
        guessTracker();
    }
    if (guess === currentScene.randomNumber ) {
        score[sceneIndex].player.t1 = Date.now();
        updateScore();
        typewriter( currentScene );
        guessTracker();
        endGame();
    }
    appWindow.commandLine.value = "";
}

const endGame = () => {
    
    console.info("The game is ending...");
    clearInterval(counterID);
    
    appWindow.submit.disabled = true;
    sceneIndex += 1;

    let remainder = currentScene.gridRef.filter( item => item.classList.contains("not-guessed"));
    remainder.forEach( item => item.classList.remove("not-guessed") );
    remainder.forEach( item => item.classList.add("guessed") );

    sceneInit(currentScene);
}

// Event Handlers

const displayGuesses = (event) => {
    const target = appWindow.guessWindow;
    target.setAttribute("style", "visibility: hidden");
    
    if ( event.type == "mousedown" || event.type == "touchstart" ) {
        target.setAttribute("style", "");
        
        //Mobile unfocuses keyboard to reveal grid
        if (event.type == "touchstart") {
            appWindow.commandLine.blur();
        }
    }

    if ( 
      event.type == "mouseup" || 
      event.type == "touchend" || 
      event.type == "mouseout" ||
      event.type == "touchleave" ||
      event.type == "touchcancel" ) {

        target.setAttribute("style", "visibility: hidden")
        appWindow.commandLine.focus();
    }
}
  
appWindow.commandLine.addEventListener("keyup", (e) => {
      if ( e.keyCode === 13 ) {
          appWindow.submit.click();
      }
  });
  
  appWindow.submit.addEventListener("click", (e) => {  
    checkAnswer(e);
  });
  
  appWindow.gridBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
    displayGuesses(e);
  });
  appWindow.gridBtn.addEventListener("mouseup", (e) => {
    e.preventDefault();
    displayGuesses(e);
  });
  appWindow.gridBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    displayGuesses(e);
  });
  appWindow.gridBtn.addEventListener("touchend", (e) => {
    e.preventDefault();
    displayGuesses(e);
  });
  appWindow.gridBtn.addEventListener ("mouseout", (e) => {
    e.preventDefault();
    displayGuesses(e);
  });
  appWindow.gridBtn.addEventListener ("touchleave", (e) => {
    e.preventDefault();
    displayGuesses(e);
  });
  appWindow.gridBtn.addEventListener ("touchcancel", (e) => {
    e.preventDefault();
    displayGuesses(e);
  });
  
  window.addEventListener("load", () => {
      sceneInit();
  });