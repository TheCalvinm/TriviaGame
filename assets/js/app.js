// Set our elements
const start = document.getElementById("start")
const quiz = document.getElementById("quiz")
const question= document.getElementById("question")
const qImg = document.getElementById("qImg")
const choiceA= document.getElementById("A")
const choiceB= document.getElementById("B")
const choiceC= document.getElementById("C")
const counter = document.getElementById("counter")
const timeGauge = document.getElementById("timeGauge")
const progress = document.getElementById("progress")
const scoreDiv = document.getElementById("scoreContainer")

//Question Creation
let questions = [
    {
        question: "Who's that Pokémon?!",
        imgSrc: "./assets/img/460.gif",
        choiceA: "Klefki",
        choiceB: "Mienshao",
        choiceC: "Abomasnow",
        correct: "C",
    },
    {
        question: "Who's that Pokémon?!",
        imgSrc: "./assets/img/388.gif",
        choiceA: "Grotle",
        choiceB: "Solosis",
        choiceC: "Lunatone",
        correct: "A",
    },
    {
        question: "Who's that Pokémon?!",
        imgSrc: "./assets/img/734.gif",
        choiceA: "Greninja",
        choiceB: "Solosis",
        choiceC: "Yungoos",
        correct: "C",
    },
    {
        question: "Who's that Pokémon?!",
        imgSrc: "./assets/img/271.gif",
        choiceA: "Lombre",
        choiceB: "Kakuna",
        choiceC: "Dewgong",
        correct: "A",
    },
    {
        question: "Who's that Pokémon?!",
        imgSrc: "./assets/img/114.gif",
        choiceA: "Porygon2",
        choiceB: "Tangela",
        choiceC: "Muk",
        correct: "B",
    },
    {
        question: "Who's that Pokémon?!",
        imgSrc: "./assets/img/637.gif",
        choiceA: "Aipom",
        choiceB: "Zapdos",
        choiceC: "Volcarona",
        correct: "C",
    },
    {
        question: "Who's that Pokémon?!",
        imgSrc: "./assets/img/105.gif",
        choiceA: "Marowak",
        choiceB: "Landorus",
        choiceC: "Nidoran ♂",
        correct: "A",
    },
    {
        question: "Who's that Pokémon?!",
        imgSrc: "./assets/img/622.gif",
        choiceA: "Pachirisu",
        choiceB: "Golett",
        choiceC: "Alakazam",
        correct: "B",
    },
    {
        question: "Who's that Pokémon?!",
        imgSrc: "./assets/img/389.gif",
        choiceA: "Dragonite",
        choiceB: "Torterra",
        choiceC: "Leafeon",
        correct: "B",
    },
    {
        question: "Who's that Pokémon?!",
        imgSrc: "./assets/img/157.gif",
        choiceA: "Typhlosion",
        choiceB: "Flareon",
        choiceC: "Sewaddle",
        correct: "A",
    },
]

// Variables
const lastQuestion = questions.length - 1
let runningQuestion = 0
let count = 0
const questionTime = 10 // 10 Seconds
const gaugeWidth = 150 // in pixels
const gaugeUnit = gaugeWidth / questionTime
let TIMER
let score = 0

// Question Creation
function renderQuestion(){
    let q = questions[runningQuestion]
    
    question.innerHTML = "<p>"+ q.question +"</p>"
    qImg.innerHTML = "<img src="+ q.imgSrc +">"
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz)

// Quiz start
function startQuiz(){
    start.style.display = "none"
    renderQuestion()
    quiz.style.display = "block"
    renderProgress()
    renderCounter()
    TIMER = setInterval(renderCounter,1000) // ms
}

// Create progress
function renderProgress(){
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>"
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count
        timeGauge.style.width = count * gaugeUnit + "px"
        count++
    }else{
        count = 0
        answerIsWrong()
        if(runningQuestion < lastQuestion){
            runningQuestion++
            renderQuestion()
        }else{
            // End quiz and show score
            clearInterval(TIMER)
            scoreRender()
        }
    }
}

// checkAnswer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++
        answerIsCorrect()
    }else{
        answerIsWrong()
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++
        renderQuestion()
    }else{
        // End quiz and show score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0"
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00"
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block"
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length)
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "./assets/img/5.png" :
              (scorePerCent >= 60) ? "./assets/img/4.png" :
              (scorePerCent >= 40) ? "./assets/img/3.png" :
              (scorePerCent >= 20) ? "./assets/img/2.png" :
              "./assets/img/1.png"
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}