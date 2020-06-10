//Provided functions
//Prints message to document
function print(message) {
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = message;
}


//My Functions
//Adds String with Correct vs. Incorrect Answer to incorrectString variable
function addIncorrectAnswer(forLoop) {
  incorrectString += `<li>${quiz[forLoop][0]}<ul><li>Your answer: ${response}</li><li>Correct Answer: ${quiz[forLoop][1]}</li></ul></li>`
}
// Initial Quiz Array
let quiz = [
  ['What number comes after 1?', '2'],
  ['What is the capital of California?', 'sacramento'],
  ['Who are you?', 'somebody']
];


//Original Variables
let correctAnswers = 0;
let incorrectAnswers = 0;
let answer;
let correctString = `<ol>`;
let incorrectString = `<ol>`;
//Added Variables
let question;
let response;


//Improved Function (Dave's)
for ( let i = 0; i < quiz.length; i += 1 ) {
  //Captures quiz data for readability
  question = quiz[i][0];
  answer = quiz[i][1];
  //Capture prompt with question and initialize quiz array with response data
  response = prompt(question);
  quiz[i][2] = `${answer}`;
  //Cond. statement checks if answer is correct or not
  if ( response.toLowerCase() === answer ) {
    //Updates answer # and adds HTML to correctString
    correctAnswers += 1;
    correctString += `<li>${quiz[i][0]}<ul><li>Correct Answer: ${quiz[i][1]}</li></ul></li>`;
  } else {
    //Updates answer # and calls addIncorrectAnswer function
    incorrectAnswers += 1;
    addIncorrectAnswer(i);
  }
}


//adds ending </ol> tags to string variables
correctString += `</ol>`;
incorrectString += `</ol>`;

//Initialize variable for final message
let resultsHTML = `<p>You got <strong>${correctAnswers}</strong> answer(s) correct and <strong>${incorrectAnswers}</strong> answer(s) incorrect.<h2>Correct Answers</h2>${correctString}<h2>Incorrect Answers</h2>${incorrectString}`;

//call print function with resultsHTML variable
print(resultsHTML);