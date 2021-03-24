var questionNumber = 0;
var timerStart = 60000;
var quizComplete = false;


const questions = [
    {
        question: "what is the colour of the sky?",
        options: ["blue","red","green","yellow"],
        answer: 1
    },
    {
        question: "what colour socks am i wearing?",
        options: ["blue","red","green","yellow"],
        answer: 3
    }
]


//toggle display between start quiz and show quiz
function toggleDisplayStart(){
    document.getElementById("startQuiz").style.display="none";
    document.getElementById("questions").style.display="block";
    document.getElementById("results").style.display="none";
}

function toggleDisplayComplete(){
    document.getElementById("startQuiz").style.display="none";
    document.getElementById("questions").style.display="none";
    document.getElementById("results").style.display="block";
}

function toggleDisplayReset(){
    document.getElementById("startQuiz").style.display="block";
    document.getElementById("questions").style.display="none";
    document.getElementById("results").style.display="none";
}

function startQuiz(){
    event.preventDefault();

    // toggle the display to the questions div
    toggleDisplayStart();

    // fill out questions form with Q1
    renderQuestions();
}

function renderQuestions(){
    //render questions function to show radio boxes.
    rootEl = document.getElementById("questionContent");
    qText = questions[questionNumber].question;
    qOptions = questions[questionNumber].options;
    qAnswer = questions[questionNumber].answer;

    //for loop to render radio buttons.
    for(i=0; i<qOptions.length;i++){
        //
    }
}

function checkAnswer(){
    event.preventDefault();

}

function getScores(){
    toggleDisplayComplete();
}

function resetQuiz(){
    toggleDisplayReset();
}

function startTimer(){
    timer - setInterval(function(){
        timerCount--;
        //html timer text change here

        if(questionsComplete && timerCount>0){
            clearInterval(timer);  //reset timer
            winGame()  // call winGame function
        }
    })
}
