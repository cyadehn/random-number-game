//Provided functions
//Prints message to document
function print(message) {
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = message;
}


//My Functions
function responsePush(array) {
  array.push([`${answer}`, `${response}`, `${question}`]);
}
function buildString(answersVar, stringVar) {
  if ( answersVar === correct ) {
    for ( let i = 0; i < answersVar.length; i += 1) {
      stringVar += `<li>${answersVar[i][2]}<ul><li>Your Answer: ${answersVar[i][1]}</li></ul></li>`;
    }
    stringVar += `</ol>`
  } else {
    for ( let i = 0; i < answersVar.length; i += 1) {
      stringVar += `<li>${answersVar[i][2]}<ul><li>Your Answer: ${answersVar[i][1]}</li><li>Correct Answer: ${answersVar[i][0]}</li></ul></li>`
    }
    stringVar += `</ol>`
  }
  return stringVar;
}

// Initial Quiz Array
let quiz = [
  {
    question: 'What number comes after 1?',
    answer: '2'
  },
  {
    question: 'What is the capital of California?',
    answer: 'sacramento'
  },
  {
    question: 'Who are you?',
    answer: 'somebody'
  }
];


//Original Variables
let correctAnswers = 0;
let incorrectAnswers = 0;
let answer;
let question;
let response;
let incorrectString = `<ol>`;
let correctString = `<ol>`;
//Empty arrays for correct and incorrect answers
let correct = [];
let incorrect = [];


//Improved Function
for ( let i = 0; i < quiz.length; i += 1 ) {
  //Captures quiz data for readability
  question = quiz[i].question;
  answer = quiz[i].answer;
  //Capture prompt with question and initialize quiz array with response data
  response = prompt(question);
  //Cond. statement checks if answer is correct or not
  if ( response.toLowerCase() === answer ) {
    //Updates answer # and adds HTML to correctString
    correctAnswers += 1;
    responsePush(correct);
  } else {
    //Updates answer # and calls addIncorrectAnswer function
    incorrectAnswers += 1;
    responsePush(incorrect);
  }
}

//Initialize variable for final message
let resultsHTML = `<p>You got <strong>${correctAnswers}</strong> answer(s) correct and <strong>${incorrectAnswers}</strong> answer(s) incorrect.<h2>Correct Answers</h2>${buildString(correct, correctString)}<h2>Incorrect Answers</h2>${buildString(incorrect, incorrectString)}`;

//call print function with resultsHTML variable
print(resultsHTML);