var questionNumber = 0;
var quizTime = 60;
var time = quizTime;
var quizComplete = false;
var score = quizTime;
localStorage.setItem("topScores",JSON.stringify([0,0,0,0,0,0,0,0,0,0]));

const radios = document.getElementsByName("radio")  //get radios collection

const questions = [
    {
        question: "what is the colour of the sky?",
        options: ["blue","red","green","yellow"],
        answer: [true,false,false,false]
    },
    {
        question: "what colour socks am i wearing?",
        options: ["blue","red","green","yellow"],
        answer: [false,true,false,false]
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

    startTimer();
}

function renderQuestions(){
    //render questions function to show radio boxes.
    rootEl = document.getElementById("questionContent");
    qText = questions[questionNumber].question;
    qOptions = questions[questionNumber].options;
    qAnswer = questions[questionNumber].answer;

    //update question text
    document.getElementById("questionText").innerHTML = qText;

    //for loop to render radio button labels
    renderRadioLabels()  // go to next question
}

function getRadioLabel(i){
        var selector = 'label[for=' + radios[i].id + ']';
        var label = document.querySelector(selector);
        return label
}

function renderRadioLabels(){
    for(i=0; i<qOptions.length;i++){
        radioLabel = getRadioLabel(i);
        radioLabel.innerHTML = qOptions[i];
    }
}

function answerSubmit(){
    event.preventDefault();

    //check answer against marking schema
    checkCorrect = checkAnswer();

    if(checkCorrect == false){window.alert("Eek, that was wrong ...😢")}
    if(checkCorrect == true){window.alert("Yassss, that was correct! 🥳")}

    //update questionNumber
    questionNumber += 1

    if(questionNumber < questions.length){
        renderQuestions();  // go to next question
    } else {
        quizComplete = true; // this stops the timer and calls toggleDisplayComplete
    }
}

function checkAnswer(){
    // all options and choices (checked values in radio buttons) must match
    boolCorrect = questions[questionNumber].answer;
    boolRadios = getAnswers(radios);
    correct = true; //default to true and revert to false if a non-match is found
    for(i=0; i<boolCorrect.length; i++){
        check = boolCorrect[i] == boolRadios[i];
        if(check == false){correct = false}
    }
    return correct;
}

// returns an array of booleans that indicate which option was selected by the user as their answer
function getAnswers(radioArray){
    answers=[];
    for(i=0; i<radioArray.length;i++){
        answers[i] = radioArray[i].checked;
    }    
    return answers;
}

function results(){
    topScores = JSON.parse(localStorage.getItem("topScores"))  // get top scores
    topScores.sort(function(a, b){return b-a});
    _index = topScores.indexOf(score)
    renderResults(_index);
}

function renderResults(_index){
    if(_index>=0){
        renderTopScore()  //function to enter this score in the topScores array in the correct position
    } else {
        renderScore()     // renders score with 'not top scores' text
    }
}

function renderTopScore(){

}

function renderScore(){

}

function restartQuiz(){
    resetQuiz()
}

function resetQuiz(){
    toggleDisplayReset();

    //reset all quiz variables
    questionNumber = 0;
    quizComplete = false;
    score = quizTime;
    time = quizTime;
}

function startTimer(){
    timer = setInterval(quizTimer,1000)
}

function quizTimer(){
    time--;   //update time
    score--;  //update score

    scoreTimerUpdate();  //update html for score and timer

    timerCheck();  //check any completion conditions
}

function scoreTimerUpdate(){
    document.getElementById("score").innerHTML = "Your score (and time left!) is: " + score;
}

function timerCheck(){

    if(time<=0){
        clearInterval(timer);  //reset timer
        window.alert("You're out of time!");  //alert user that they have run out of time without completing quiz
        results();
        toggleDisplayComplete();
    }

    if(time > 0 && quizComplete){
        window.alert("You've completed the quiz!")
        clearInterval(timer);
        results();
        toggleDisplayComplete();
    }
}
