const questions = [
    {
        question: "Quelle est la capitale de la France ?",
        options: ["Paris", "Lyon", "Marseille", "Toulouse"],
        answer: 0
    },
    {
        question: "Quelle est la plus grande ville de France ?",
        options: ["Paris", "Lyon", "Marseille", "Toulouse"],
        answer: 0
    },
    {
        question: "Quel langage est utilisé pour le web ?",
        options: ["Python", "JavaScript", "C++", "Java"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("repondre");
const optionButtons = optionsContainer.querySelectorAll("button");
const timerElement = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn");
const result = document.getElementById("result");

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 60;
    timerElement.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft === 0) {
            nextQuestion();
        }
    }, 1000);

    const q = questions[currentQuestion];
    questionElement.textContent = q.question;

    optionButtons.forEach((btn, index) => {
        btn.textContent = q.options[index];
        btn.disabled = false;
        btn.onclick = () => {
            if (index === q.answer) {
                score++;
            }
            nextQuestion();
        };
    });

    result.textContent = "";
    optionsContainer.style.display = "block";
    nextBtn.style.display = "inline-block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.textContent = "Quiz terminé !";
    optionsContainer.style.display = "none";
    nextBtn.style.display = "none";
    result.textContent = `Votre score: ${score} / ${questions.length}`;

    clearInterval(timer);
}

nextBtn.onclick = nextQuestion;

loadQuestion();