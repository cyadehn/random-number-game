let counterID;
let guess;

const sceneInit = () => {

    currentScene = scenes[sceneIndex];


    if ( currentScene.type == "glitch" || "cutscene" ) {
        // glitch();
    }
    if ( currentScene.type == "game" ) {
        // resetWindow
        appWindow.submit.disabled = false;
        //reset guess grid
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