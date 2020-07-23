/* Event Handlers */
const displayGuesses = (e) => {
    const target = appWindow.displayGrid;
    target.setAttribute("style", "display: none");
    
    if ( e.type == "mousedown" || e.type == "touchstart" ) {
        target.setAttribute("style", "");
        
        //Mobile unfocuses keyboard to reveal grid
        if (e.type == "touchstart") {
            appWindow.commandLine.blur();
        }
    }

    if ( e.type == "mouseup" || e.type == "touchend" ) {
        target.setAttribute("style", "display: none")
        
        //Mobile refocuses on keyboard input
        if (e.type == "touchend") {
            appWindow.commandLine.focus();
        }
    }
}

/* Event Listeners */
appWindow.commandLine.addEventListener("input", () => {
    guess = parseInt(guessInput.value);
  });
  
appWindow.commandLine.addEventListener("keyup", (e) => {
      e.preventDefault();
      if ( e.keyCode === 13 ) {
          appWindow.submit.click();
      }
  });
  
  appWindow.submit.addEventListener("click", checkAnswer(e));
  
  appWindow.gridBtn.addEventListener("mousedown", displayGuesses(e));
  appWindow.gridBtn.addEventListener("mouseup", displayGuesses(e));
  appWindow.gridBtn.addEventListener("touchstart", displayGuesses(e));
  appWindow.gridBtn.addEventListener("touchend", displayGuesses(e));
  
  window.addEventListener("load", () => {
      initializeGame();
      guessInput.focus();
  });
  