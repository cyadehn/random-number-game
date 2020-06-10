
function print(message) {
  document.write(message);
}

let quiz = [
  ['What number comes after 1?', '2'],
  ['What is the capital of California?', 'sacramento'],
  ['Who are you?', 'somebody']
];

let correctAnswers = 0;
let incorrectAnswers = 0;
let answer;
let correctString = `<ol>`;
let incorrectString = `<ol>`;

function addIncorrectAnswer(forLoop) {
  incorrectString += `<li>${quiz[forLoop][0]}<ul><li>Your answer: ${answer}</li><li>Correct Answer: ${quiz[forLoop][1]}</li></ul></li>`
}

for ( let i = 0; i < quiz.length; i += 1 ) {
  answer = prompt(`${quiz[i][0]}`);
  quiz[i][2] = `${answer}`;
  if ( answer.toLowerCase() === quiz[i][1] ) {
    correctAnswers += 1;
    correctString += `<li>${quiz[i][0]}<ul><li>Correct Answer: ${quiz[i][1]}</li></ul></li>`;
  } else {
    incorrectAnswers += 1;
    addIncorrectAnswer(i);
  }
}

correctString += `</ol>`;
incorrectString += `</ol>`;
let resultsHTML = `<p>You got <strong>${correctAnswers}</strong> answer(s) correct and <strong>${incorrectAnswers}</strong> answer(s) incorrect.<h2>Correct Answers</h2>${correctString}<h2>Incorrect Answers</h2>${incorrectString}`;

print(resultsHTML);