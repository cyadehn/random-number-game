import React, { Component } from 'react';

class GameStart extends Component {
   
   state = {
      randomNumber: 0
   }

   tSec = (end, start) => {
      let timeDiff = end - start;
      timeDiff /= 1000;
      let tSec = Math.round(timeDiff);
      return tSec;
   }

   // Currently working on below 

   

   // correctGuess = false;
   // attempts = 0;
   // guess;
   // t0 = 0;
   // t1 = 0;

   message = () => {
      return (
         <div className="message">
            {/* <p>There you go! You guessed correctly!</p> */}
            {/* <p>The number was <strong>{this.state.randomNumber}</strong>, and it took you {attempts} tries and {this.tSec(t1, t0)} seconds to get it.</p> */}
         </div>
      );
   };

   //    t0 = Date.now();
   //    guess = prompt(`Hey, guess a number between 1 and ${upper}!`);
   //    attempts += 1;
      
   //    if ( parseInt(guess) === randomNumber ) {
   //      t1 = Date.now();
   //      document.write(message());
   //    } else {
   //      do {
   //        guess = prompt(`Hm. That wasn't it, huh? Just keep guessing! What's another number between 1 and ${upper}?`);
   //        attempts += 1;
   //        if (parseInt(guess) === randomNumber ) {
   //          correctGuess = true;
   //        }
   //      } while ( ! correctGuess )
   //      t1 = Date.now();
   //      document.write(message());
   //    }
   
   render() {
      return (
         <div className="gameStart">
            <h1>Let's Make Random Numbers!</h1>
            <footer>
               <span><a href="..">Return to Main Page</a></span>
            </footer>
         </div>
      );
   } 
}

export default GameStart;