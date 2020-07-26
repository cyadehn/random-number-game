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
        appWindow.guessGrid.innerHTML = "<p>Previous Guesses:</p>";
        currentScene.gridRef.forEach( (x) => {
            appWindow.guessGrid.appendChild(x);
        });
        currentScene.gridRef = Array.from(document.querySelectorAll("#grid div"));
        appWindow.guessGrid.setAttribute("style", "display: none");
        typewriter( currentScene );
    }
    console.info("Scene initialized!")
}

const checkAnswer = (e) => {

    console.info("Checking answer...");

    e.preventDefault();

    if ( currentScene.attempts === 0 ) {
        t0 = Date.now();
        counterID =  window.setInterval(counterUpdate, 100);
    }
    
    currentScene.attempts += 1;
    guess = parseInt(appWindow.commandLine.value);
    typewriter( currentScene );
    guessTracker();
    if (guess === currentScene.randomNumber ) {
        endGame();
    }
    appWindow.commandLine.value = "";
}

const endGame = () => {
    
    console.info("The game is ending...");

    updateScore();
    currentScene.t1 = Date.now();
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