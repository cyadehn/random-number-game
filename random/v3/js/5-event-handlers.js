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
  
  submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if ( attempts === 0 ) {
          t0 = Date.now();
      }
      attempts += 1;
      clearTimeout(typewriterID);
      guess = parseInt(guessInput.value);
      if ( guess > 0 && guess <= upper ) {
          checkAnswer();
          prompt();
      } else {
          invalidGuess = true;
          prompt();
          invalidGuess = false;
      }
      guessInput.value = "";
  });
  
  window.addEventListener("load", () => {
      prompt();
      guessInput.focus();
  });
  