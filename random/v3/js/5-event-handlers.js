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
gridBtn.addEventListener(onclick/Touch, displayGuesses());
gridBtn.addEventListener(clickoff/lift, displayGuesses());

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
  
  appWindow.displayGrid.addEventListener("mousedown", displayGuesses(e));
  appWindow.displayGrid.addEventListener("mouseup", displayGuesses(e));
  appWindow.displayGrid.addEventListener("touchstart", displayGuesses(e));
  appWindow.displayGrid.addEventListener("touchend", displayGuesses(e));
  window.addEventListener("load", () => {
      prompt();
      guessInput.focus();
  });
  