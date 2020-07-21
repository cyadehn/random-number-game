let sceneIndex = 0;
let currentScene = scenes[sceneIndex];
let counterID;

const initializeGame = () => {
    currentScene = scenes[sceneIndex];
    resetWindow
    
    //reset guess grid
    appWindow.guessGrid.innerHTML = "";
    currentScene.guessGrid.forEach( (x) => {
        appWindow.guessGrid.appendChild(x);
    });
    currentScene.guessGrid = Array.from(document.querySelectorAll("#guess-grid div"));
    
    //capture start time
    if ( attempts === 0 ) {
        t0 = Date.now();
    }
    counterID =  window.setInterval(counterUpdate, 100);
    displayGuesses();
    typewriter( char, introDX );
}

const checkAnswer = (e) => {
    e.preventDefault();
    set start time & counter if attempts === 0 (currentScene.t0 = Date.now())
    let guess = parseInt(guessInput.value);
    guessTracker();
    currentScene.attempts += 1;
    clearTimeout(typewriterID);
    
    guessInput.value = "";
    let response;
    checkanswer :
        if ( invalid ) {

        } else if ( already guessed ) {
            
        } else if ( incorrect ) {

        } else if ( correct ) {
            
        }    
        
        // let invalidGuess;
        // let correctGuess = false;
        // if ( guess > 0 && guess <= upper ) {
        //     checkAnswer();
        //     prompt();
        // } else {
        //     invalidGuess = true;
        //     prompt();
        //     invalidGuess = false;
        // }

        invalid response if not within range {guess = invalid}
        if incorrect { guess = incorrect }
        if correct { 
            set end time (currentScene.t1 = Date.now())
            clear counterID
            submit.input.disabled = true
            endGame()
            sceneIndex += 1;
            currentScene = findSceneIndex
        }
    typewriter(char, response)
    
}

const endGame = () => {
    updateScore();
    clearInterval(counterID);
    sceneIndex += 1;

    let remainder = guessGrid.filter( item => item.classList.contains("not-guessed"));
    remainder.forEach( item => item.classList.remove("not-guessed") );
    remainder.forEach( item => item.classList.add("guessed") );
    
    if ( currentScene.type == "game" ) {
        initializeGame(currentScene);
    }
    if ( currentScene.type == "glitch" || "cutscene" ) {
        glitch()
    }
}






// let glitchID;
// let glitchInterval = 1000;
// let glitchRepeat = 20;
// let interval;
// let repeat;
// let glitchStarted;

// const glitch = () => {
//     if (glitchStarted) {
//         interval = glitchInterval;
//         repeat = glitchRepeat;
//         glitchStarted = false;
//     }
//     if ( !app.classList.contains("glitch") && repeat ) {
//         app.classList.add("glitch");
//         console.log("Glitch added!");
//     } else {
//         app.classList.remove("glitch");
//         console.log("Glitch removed!");
//     }
//     if ( interval >= 250 ) {
//         interval -= 50;
//         console.log(interval);
//         glitchID = setTimeout(glitch, interval);
//         console.log("glitch increase");
//     } else if ( repeat ) {
//         glitchID = setTimeout(glitch, interval);
//         repeat -= 1;
//         console.log("glitch repeat");
//     }
// }

// const glitchStart = () => {
//     glitchStarted = true;
//     glitch();
// }

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