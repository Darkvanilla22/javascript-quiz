var quizContainer = document.getElementById('quiz-container');
var startContainer = document.getElementById('start-container');
var endContainer = document.getElementById('end-container');
var questionElement = document.getElementById('question');
var optionsElement = document.getElementById('options');
var feedbackElement = document.getElementById('feedback');
var timerElement = document.getElementById('timer');
var timeElement = document.getElementById('time');
var initialsInput = document.getElementById('initials');
var finalScoreElement = document.getElementById('final-score');

var questions = [
    {
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Advanced Programming Interface", "Application Program Interface", "Advanced Program Interface"],
      correctAnswer: "Application Programming Interface"
    },
    {
      question: "Which Web API allows you to manipulate the document structure, style, and content?",
      options: ["DOM API", "Fetch API", "Canvas API", "Web Storage API"],
      correctAnswer: "DOM API"
    },
    {
      question: "What does JSON stand for?",
      options: ["JavaScript Object Notation", "JavaScript Oriented Notation", "JavaScript Object Navigation", "JavaScript Ordered Notation"],
      correctAnswer: "JavaScript Object Notation"
    },
    {
      question: "Which API is used for asynchronous HTTP requests in JavaScript?",
      options: ["DOM API", "Fetch API", "Canvas API", "Web Storage API"],
      correctAnswer: "Fetch API"
    },
    {
      question: "What does CORS stand for?",
      options: ["Cross-Origin Resource Sharing", "Cross-Origin Request Sharing", "Cross-Origin Resource System", "Cross-Origin Request System"],
      correctAnswer: "Cross-Origin Resource Sharing"
    },
    {
      question: "Which API allows you to draw graphics and animations on a web page?",
      options: ["DOM API", "Fetch API", "Canvas API", "Web Storage API"],
      correctAnswer: "Canvas API"
    },
    {
      question: "What is the purpose of the Local Storage API?",
      options: ["To store data on the server", "To store data temporarily in the browser", "To manipulate the DOM", "To draw graphics and animations"],
      correctAnswer: "To store data temporarily in the browser"
    },
    {
      question: "Which API provides a way to store key-value pairs locally in the user's browser?",
      options: ["DOM API", "Fetch API", "Canvas API", "Web Storage API"],
      correctAnswer: "Web Storage API"
    },
    {
      question: "What method is used to make a synchronous HTTP request in JavaScript?",
      options: ["fetch()", "XHR.open()", "XMLHttpRequest()", "await()"],
      correctAnswer: "XMLHttpRequest()"
    },
    {
      question: "Which API allows you to work with dates and times in JavaScript?",
      options: ["DOM API", "Fetch API", "Canvas API", "Date API"],
      correctAnswer: "Date API"
    }
  ];
  
let currentQuestionIndex = 0,
    timer,
    timeLeft = 60;

function startQuiz() {
  elements.startContainer.style.display = 'none';
  elements.quizContainer.style.display = 'block';
  loadQuestion();
  timer = setInterval(updateTimer, 1000);
}

function loadQuestion() {
  const { question, options } = questions[currentQuestionIndex];
  elements.questionElement.textContent = question;
  elements.optionsElement.innerHTML = options.map(option => {
    const button = `<button onclick="checkAnswer('${option}')">${option}</button>`;
    return button;
  }).join('');
}

function checkAnswer(answer) {
  const { correctAnswer } = questions[currentQuestionIndex];
  elements.feedbackElement.textContent = answer === correctAnswer ? 'Correct!' : 'Incorrect!';
  if (answer !== correctAnswer) timeLeft = Math.max(0, timeLeft - 10);
  currentQuestionIndex++;
  currentQuestionIndex < questions.length ? loadQuestion() : endQuiz();
}

function updateTimer() {
  elements.timeElement.textContent = timeLeft;
  timeLeft <= 0 ? endQuiz() : timeLeft--;
}

function endQuiz() {
  clearInterval(timer);
  elements.quizContainer.style.display = 'none';
  elements.endContainer.style.display = 'block';
  elements.finalScoreElement.textContent = timeLeft;
}

function saveScore() {
  const initials = elements.initialsInput.value;
  alert(`Score saved for ${initials}: ${timeLeft}`);
}