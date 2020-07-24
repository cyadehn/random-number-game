/* Event Handlers */
const displayGuesses = (event) => {
    const target = appWindow.displayGrid;
    target.setAttribute("style", "display: none");
    
    if ( event.type == "mousedown" || event.type == "touchstart" ) {
        target.setAttribute("style", "");
        
        //Mobile unfocuses keyboard to reveal grid
        if (event.type == "touchstart") {
            appWindow.commandLine.blur();
        }
    }

    if ( event.type == "mouseup" || event.type == "touchend" ) {
        target.setAttribute("style", "display: none")
        
        //Mobile refocuses on keyboard input
        if (event.type == "touchend") {
            appWindow.commandLine.focus();
        }
    }
}

/* Event Listeners */
  
appWindow.commandLine.addEventListener("keyup", (e) => {
      if ( e.keyCode === 13 ) {
          appWindow.submit.click();
          console.log("Command line is clicking submit...")
      }
  });
  
  appWindow.submit.addEventListener("click", (e) => {  
    console.log("The submit button was clicked!")
    checkAnswer(e);
  });
  
  appWindow.gridBtn.addEventListener("mousedown", (e) => {
    displayGuesses(e);
  });
  appWindow.gridBtn.addEventListener("mouseup", (e) => {
    displayGuesses(e);
  });
  appWindow.gridBtn.addEventListener("touchstart", (e) => {
    displayGuesses(e);
  });
  appWindow.gridBtn.addEventListener("touchend", (e) => {
    displayGuesses(e);
  });
  
  window.addEventListener("load", () => {
      gameInit();
      sceneInit();
      appWindow.commandLine.focus();
  });
  