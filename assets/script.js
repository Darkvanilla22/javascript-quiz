// DOM elements used in the quiz
var elements = {
    quizContainer: document.getElementById('quiz-container'),
    startContainer: document.getElementById('start-container'),
    endContainer: document.getElementById('end-container'),
    questionElement: document.getElementById('question'),
    optionsElement: document.getElementById('options'),
    feedbackElement: document.getElementById('feedback'),
    timerElement: document.getElementById('timer'),
    timeElement: document.getElementById('time'),
    initialsInput: document.getElementById('initials'),
    finalScoreElement: document.getElementById('final-score'),
};

// Array to store saved scores
var savedScores = [];

// Array of quiz questions related to Web APIs
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
  
// Function to initialize quiz variables
function initializeQuizVariables() {
    return {
      currentQuestionIndex: 0,
      timer: null,
      timeLeft: 100
    };
}
  
// Initialize quiz variables
let quizVariables = initializeQuizVariables();
 
// Function to start the quiz or restart it
function startQuiz() {
    elements.startContainer.style.display = 'none';
    elements.quizContainer.style.display = 'block';
    quizVariables = initializeQuizVariables(); // Reset quiz variables
    loadQuestion();
    quizVariables.timer = setInterval(updateTimer, 1000);
}

// Function to load a question
function loadQuestion() {
    var { question, options } = questions[quizVariables.currentQuestionIndex];
    elements.questionElement.textContent = question;
    elements.optionsElement.innerHTML = options.map(option => `<button onclick="checkAnswer('${option}')">${option}</button>`).join('');
}
  
// Function to check the answer
function checkAnswer(answer) {
    var { correctAnswer } = questions[quizVariables.currentQuestionIndex];
    elements.feedbackElement.textContent = answer === correctAnswer ? 'Correct!' : 'Incorrect!';
    if (answer !== correctAnswer) quizVariables.timeLeft = Math.max(0, quizVariables.timeLeft - 10);
    quizVariables.currentQuestionIndex++;
    quizVariables.currentQuestionIndex < questions.length ? loadQuestion() : endQuiz();
}
  
// Function to update the timer
function updateTimer() {
    elements.timeElement.textContent = quizVariables.timeLeft;
    quizVariables.timeLeft <= 0 ? endQuiz() : quizVariables.timeLeft--;
}
  
// Function to end the quiz
function endQuiz() {
    clearInterval(quizVariables.timer);
    elements.quizContainer.style.display = 'none';
    elements.endContainer.style.display = 'block';
    elements.finalScoreElement.textContent = quizVariables.timeLeft;
    elements.feedbackElement.textContent = ''; // Clear the feedback element
  
    // Add "Save Score" button to save the score
    var saveScoreButton = document.createElement('button');
    saveScoreButton.textContent = 'Save Score';
    saveScoreButton.onclick = () => {
      var initials = elements.initialsInput.value;
      var score = quizVariables.timeLeft;
  
      if (initials && !isNaN(score)) {
        savedScores.push({ initials, score }); // Save the score
        updateSavedScores(); // Update the displayed scores
      } else {
        alert('Please enter initials before saving the score.');
      }
    };
    elements.endContainer.appendChild(saveScoreButton);
  
    // Check if "Start Over" button already exists
    var existingStartOverButton = document.getElementById('start-over-button');
  
    if (!existingStartOverButton) {
      // If not, create and add "Start Over" button
      var startOverButton = document.createElement('button');
      startOverButton.textContent = 'Start Over';
      startOverButton.id = 'start-over-button';
      startOverButton.onclick = () => {
        elements.endContainer.style.display = 'none'; // Hide end container
        elements.feedbackElement.textContent = ''; // Clear the feedback element
        startQuiz(); // Restart the quiz
      };
      elements.endContainer.appendChild(startOverButton);
    }

    // Remove duplicate "Save Score" buttons
  const saveScoreButtons = document.querySelectorAll('#end-container button');
  saveScoreButtons.forEach(button => {
    if (button.textContent === 'Save Score' && button !== saveScoreButton) {
      button.remove();
    }
  });

  // Update the displayed scores
  updateSavedScores();
}
  
// Function to update the displayed scores
function updateSavedScores() {
    var scoresContainer = document.getElementById('saved-scores');
    scoresContainer.innerHTML = ''; // Clear existing scores
  
    savedScores.forEach((score, index) => {
      var scoreItem = document.createElement('li');
      scoreItem.textContent = `#${index + 1}: ${score.initials} - ${score.score}`;
      scoresContainer.appendChild(scoreItem);
    });
}