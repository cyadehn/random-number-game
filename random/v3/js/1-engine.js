let counterID;
let dialogue;
let guess;

const gameInit = () => {
    for ( let i = 0; i < scenes.length; i ++ ) {
        if ( scenes[i].type == "game" ) {
            scenes[i].randomNumber = getRandomNumber(scenes[i]);
            scenes[i].guessTracker = guessArray(scenes[i]);
            console.log(scenes[i].guessTracker);
        }
    }
}

const sceneInit = () => {

    currentScene = scenes[sceneIndex];
    dialogue = currentScene.dialogue;
    
    // resetWindow
    appWindow.submit.disabled = false;
    //reset guess grid
    appWindow.guessGrid.innerHTML = "";
    currentScene.guessGrid.forEach( (x) => {
        appWindow.guessGrid.appendChild(x);
    });
    currentScene.guessGrid = Array.from(document.querySelectorAll("#guess-grid div"));
    typewriter( dialogue.intro );
}

const checkAnswer = (e) => {
    e.preventDefault();

    if ( currentScene.attempts === 0 ) {
        t0 = Date.now();
        counterID =  window.setInterval(counterUpdate, 100);
    }
    
    guess = parseInt(appWindow.commandLine.value);
    guessTracker();
    currentScene.attempts += 1;
    clearTimeout(typewriterID);
    guessInput.value = "";
    typewriter(char, response());
}

const endGame = () => {
    updateScore();
    currentScene.t1 = Date.now();
    clearInterval(counterID);
    
    appWindow.submit.disabled = true;
    sceneIndex += 1;

    let remainder = guessGrid.filter( item => item.classList.contains("not-guessed"));
    remainder.forEach( item => item.classList.remove("not-guessed") );
    remainder.forEach( item => item.classList.add("guessed") );
    
    if ( currentScene.type == "game" ) {
        sceneInit(currentScene);
    }
    if ( currentScene.type == "glitch" || "cutscene" ) {
        glitch();
    }
}

// const glitch = () => {
//     //iterate set amount of glitches according to the number of lines present (only before first and after last RANDOM scene)
//        for (   ) {
//        typewriter( char,  )
//     }
//    }
   
//    const windowGlitch = () => {
//        ranx = random#(upper=VW)
//        rany = random(upper=vh)
//        StyleSheet translate()
//    }