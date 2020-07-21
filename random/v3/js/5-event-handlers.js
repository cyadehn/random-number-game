gridBtn.addEventListener(onclick/Touch, displayGuesses());
gridBtn.addEventListener(clickoff/lift, displayGuesses());

guessInput.addEventListener("input", () => {
    guess = parseInt(guessInput.value);
  });
  
  guessInput.addEventListener("keyup", (e) => {
      e.preventDefault();
      if ( e.keyCode === 13 ) {
          document.querySelector("#guess-submit").click();
      }
  });
  
  submitBtn.addEventListener("click", submit(e));
  
  window.addEventListener("load", () => {
      prompt();
      guessInput.focus();
  });
  