/* Event Handlers */
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

/* Event Listeners */
  
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

