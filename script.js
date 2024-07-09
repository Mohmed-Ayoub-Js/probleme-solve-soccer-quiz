let questions;

fetch('http://localhost:8000/data.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        // عرض السؤال الأول بعد تحميل البيانات بنجاح
        displayQuestion();
    })
    .catch(error => console.error('Error fetching data:', error));

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const answersList = document.getElementById('answers-list');
const nextBtn = document.getElementById('next-btn');
const result = document.getElementById('result');
nextBtn.style.display = 'none';

function displayQuestion() {
    questionText.textContent = questions[currentQuestion].question;
    answersList.innerHTML = '';
    for (let i = 0; i < questions[currentQuestion].answers.length; i++) {
        (function(index) {
            const answerBtn = document.createElement('button');
            answerBtn.textContent = questions[currentQuestion].answers[index];
            answerBtn.classList.add('answer-btn');
            answerBtn.onclick = function() {
                checkAnswer(index); 
            };
            answersList.appendChild(answerBtn);
        })(i); 
    }
}

function checkAnswer(answerIndex) {
    if (answerIndex === questions[currentQuestion].correctAnswer) {
        score++;
        result.textContent = "إجابة صحيحة!";
        result.style.color = "#2ecc71";
    } else {
        result.textContent = "إجابة خاطئة!";
        result.style.color = "#e74c3c";
    }

    nextBtn.style.display = 'block';
    answersList.style.pointerEvents = 'none'; // Disable clicking on answers after choosing one

    // Increase currentQuestion index
    currentQuestion++;
}

function nextQuestion() {
    result.textContent = '';
    answersList.style.pointerEvents = 'auto'; // Enable clicking on answers again
    nextBtn.style.display = 'none';

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showFinalScore();
    }
}


function showFinalScore() {
    questionText.textContent = `انتهت الأسئلة! نتيجتك: ${score} من ${questions.length}`;
    answersList.style.display = 'none';
    nextBtn.style.display = 'none';
}

// دالة لتبديل السمة
function toggleTheme() {
    const isChecked = document.getElementById('theme-toggle').checked;
    if (isChecked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
    // Update the theme on all pages
    updateThemeOnAllPages();
}

// ضبط السمة عند التحميل
window.onload = function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    // Update the theme on all pages
    updateThemeOnAllPages();
}

// Function to update the theme on all pages
function updateThemeOnAllPages() {
    // Get all pages (assuming they have a common class or attribute)
    const pages = document.querySelectorAll('.page');
    pages.forEach((page) => {
        if (localStorage.getItem('theme') === 'dark') {
            page.classList.add('dark-mode');
        } else {
            page.classList.remove('dark-mode');
        }
    });
}
