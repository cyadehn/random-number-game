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

    if ( 
      event.type == "mouseup" || 
      event.type == "touchend" || 
      event.type == "mouseout" ||
      event.type == "touchleave" ||
      event.type == "touchcancel" ) {

        target.setAttribute("style", "display: none")
        appWindow.commandLine.focus();

        //Mobile refocuses on keyboard input
        // if (
        //   event.type == "touchend" ||
        //   event.type == "touchleave" ||
        //   event.type == "touchcancel" ) {
            
        // }
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
  appWindow.gridBtn.addEventListener ("mouseout", (e) => {
    displayGuesses(e);
  });
  appWindow.gridBtn.addEventListener ("touchleave", (e) => {
    displayGuesses(e);
  });
  appWindow.gridBtn.addEventListener ("touchcancel", (e) => {
    displayGuesses(e);
  });
  
  window.addEventListener("load", () => {
      gameInit();
      sceneInit();
      appWindow.commandLine.focus();
  });

  function monitorEvents(element) {
    var log = function(e) { 
      document.getElementById("monitor").innerHTML = e;
      console.log(e);
     };
    var events = [];
  
    for(var i in element) {
      if(i.startsWith("on")) events.push(i.substr(2));
    }
    events.forEach(function(eventName) {
      element.addEventListener(eventName, log);
    });
  }

  monitorEvents(document.getElementById("display-grid"));