// Quiz dataS
const quizData = [
    {
      question: '1. In which language is React.js written?',
      type: 'radio',
      choices: [
        { text: 'Python', correct: false },
        { text: 'JavaScript', correct: true },
        { text: 'Java', correct: false },
        { text: 'PHP', correct: false }
      ]
    },
    {
      question: '2. React.js covers only the view layer of the app.',
      type: 'radio',
      choices: [
        { text: 'True', correct: true },
        { text: 'False', correct: false },
      ]
    },
    {
      question: 'In ES6 Which are the keywords to define variables?',
      type: 'checkbox',
      choices: [
        { text: 'var', correct: true },
        { text: 'key', correct: false },
        { text: 'let', correct: true },
        { text: 'props', correct: false }
      ]
    },
    {
      question: 'What are arbitrary inputs of components in react also known as?',
      type: 'text',
      correctAnswer: 'props'
    }
  ];
  
  // Variables
  const quizForm = document.getElementById('quiz-form');
  const questionElement = document.getElementById('question');
  const choicesElement = document.getElementById('choices');
  const submitButton = document.getElementById('submit-btn');
  
  let currentQuestion = 0;
  let score = 0;
  
  // Load question and choices
  function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionElement.textContent = currentQuiz.question;
    choicesElement.innerHTML = '';
  
    if (currentQuiz.type === 'text') {
      const input = document.createElement('input');

      input.type = 'text';
      input.name = 'choice';

      choicesElement.appendChild(input);
    } 
    
    else {
      currentQuiz.choices.forEach(function (choice) {
        const li = document.createElement('li');
        const input = document.createElement('input');

        input.type = currentQuiz.type;
        input.name = 'choice';
        input.value = choice.text;

        li.appendChild(input);
        li.appendChild(document.createTextNode(choice.text));
        choicesElement.appendChild(li);
      });
    }
  }
  
  // Check answers and move to the next question
  function checkAnswers(event) {
    event.preventDefault();
  
    let userChoices;
  
    if (quizData[currentQuestion].type === 'text') {
      const input = document.querySelector('input[name="choice"]');
      userChoices = input.value.trim().toLowerCase();
    } else {
      userChoices = Array.from(document.querySelectorAll('input[name="choice"]:checked'));
    }
  
    
  if (!userChoices || userChoices.length === 0) {
    // No answer selected, display an error message or take appropriate action
    alert('Please select an answer');
    return;
  }
  
    let isCorrect = false;
  
    if (quizData[currentQuestion].type === 'text') {
      isCorrect = (userChoices === quizData[currentQuestion].correctAnswer.toLowerCase());
    } 
    
    else {
      isCorrect = userChoices.every(function (choice) {
        const currentQuiz = quizData[currentQuestion];
        const selectedChoice = currentQuiz.choices.find(function (c) {
          return c.text === choice.value;
        });
        return selectedChoice.correct;
      });
    }
  
    if (isCorrect) {
      score++;
    }
  
    currentQuestion++;
  
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }
  
  // Show final score
function showResults() {
    questionElement.textContent = `You scored ${score} out of ${quizData.length}!`;
    choicesElement.innerHTML = '';
  
    // Create a "Play Again" button
    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.className = 'Play';
    playAgainButton.addEventListener('click', resetQuiz);
  
    // Append the "Play Again" button to the choices element
    choicesElement.appendChild(playAgainButton);
  
    submitButton.style.display = 'none';
  
    // if (score === quizData.length) {
    //   choicesElement.classList.add('perfect-score');
    // }
  }
  
  // Reset the quiz
  function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    submitButton.style.display = 'block';
  }
  
  // Rest of the code remains the same...
  
  // Event listeners
  quizForm.addEventListener('submit', checkAnswers);
  
  // Load the first question
  loadQuestion();
                 