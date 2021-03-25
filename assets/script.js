var questionNumber = 0;
var quizTime = 60;
var time = quizTime;
var quizComplete = false;
var score = quizTime;

function checkLocal(){
    if(localStorage.getItem("topScores")==null){
        localStorage.setItem("topScores",JSON.stringify([0,0,0,0,0]));
        localStorage.setItem("topScoresNames",JSON.stringify(["None","None","None","None","None"]))
    }

    topScores = JSON.parse(localStorage.getItem("topScores"))  // get top scores
    topScoresNames = JSON.parse(localStorage.getItem("topScoresNames"))
}

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
    document.getElementById("score").style.display="block";
}


function toggleDisplayComplete(){
    document.getElementById("startQuiz").style.display="none";
    document.getElementById("questions").style.display="none";
    document.getElementById("results").style.display="block";
    document.getElementById("score").style.display="none";

    document.getElementById("scores-table").style.display = "none"
    document.getElementById("enter-name").style.display = "block"
    document.getElementById("restart-div").style.display = "none"
}


function toggleDisplayReset(){
    document.getElementById("startQuiz").style.display="block";
    document.getElementById("questions").style.display="none";
    document.getElementById("results").style.display="none";
    document.getElementById("score").style.display="none";
}


function startQuiz(){
    checkLocal();

    event.preventDefault();

    // toggle the display to the questions div
    toggleDisplayStart();

    // fill out questions form with Q1
    renderQuestions();

    scoreTimerUpdate();
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
    resetRadio()  //reset all radio options to unchecked
}


function renderRadioLabels(){
    for(i=0; i<qOptions.length;i++){
        radioLabel = getRadioLabel(i);
        radioLabel.innerHTML = qOptions[i];
    }
}


function resetRadio(){
    for(i=0; i<radios.length;i++){
        radios[i].checked = false;
    } 
}


function getRadioLabel(i){
        var selector = 'label[for=' + radios[i].id + ']';
        var label = document.querySelector(selector);
        return label
}


function answerSubmit(){
    event.preventDefault();

    if(hasNotAnswered()){
        window.alert("please make at least one choice!");
        return 
    }

    //check answer against marking schema
    checkCorrect = checkAnswer();

    if(checkCorrect == false){
        window.alert("Eek, that was wrong ...😢");
    }
    if(checkCorrect == true){window.alert("Yassss, that was correct! 🥳")}

    //update questionNumber
    questionNumber += 1

    if(questionNumber < questions.length){
        renderQuestions();  // go to next question
    } else {
        quizComplete = true; // this stops the timer and calls toggleDisplayComplete
    }
}


function hasNotAnswered(){
    boolRadios = getUserAnswers(radios);
    allFalse = true  //default to true unless one true is found in the responses
    for(i=0; i<boolRadios.length; i++){
        if(boolRadios[i]==true){allFalse = false}
    }
    return allFalse
}


function checkAnswer(){
    // all options and choices (checked values in radio buttons) must match
    boolCorrect = questions[questionNumber].answer;
    boolRadios = getUserAnswers(radios);
    correct = true; //default to true and revert to false if a non-match is found
    for(i=0; i<boolCorrect.length; i++){
        check = boolCorrect[i] == boolRadios[i];
        if(check == false){correct = false}
    }
    return correct;
}


// returns an array of booleans that indicate which option was selected by the user as their answer
function getUserAnswers(radioArray){
    answers=[];
    for(i=0; i<radioArray.length;i++){
        answers[i] = radioArray[i].checked;
    }    
    return answers;
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
    document.getElementById("score").innerHTML = "Your time left is: " + score;
}


function timerCheck(){

    if(time<=0){
        clearInterval(timer);  //reset timer
        window.alert("You're out of time!");  //alert user that they have run out of time without completing quiz
        toggleDisplayComplete();
    }

    if(time > 0 && quizComplete){
        window.alert("You've completed the quiz!")
        clearInterval(timer);
        toggleDisplayComplete();
    }
}

function renderResults(){

    document.getElementById("results-score").innerHTML = score

    renderResultsTable();

    document.getElementById("enter-name").style.display = "none"
    document.getElementById("scores-table").style.display = "block"
    document.getElementById("restart-div").style.display = "block"
}

function renderResultsTable(){
    playerName=document.getElementById("player-name").value
    localStorage.setItem("playerName", playerName)
    minOldScore = Math.min.apply(Math,topScores);

    if(score > minOldScore){
        newTopScores()
        _index = topScores.indexOf(score)
    } else { var _index=99}
    renderTable(_index)
    
    localStorage.setItem("topScores", JSON.stringify(topScores));
    localStorage.setItem("topScoresNames", JSON.stringify(topScoresNames));
}

function newTopScores() {
    topScores.push(score);
    topScoresNames.push(localStorage.getItem("playerName"))

    SortScores();

    topScores.pop()
    topScoresNames.pop()
}

function SortScores(){
    scoresNew = [...topScores]
    namesNew = [...topScoresNames]
    perm = getSortIndex(topScores)

    for(i=0; i<topScores.length; i++){
        scoresNew[i]=topScores[perm[i]];
        namesNew[i]=topScoresNames[perm[i]];
    }

    //reset topScores and topScoresNames
    topScores = scoresNew
    topScoresNames = namesNew
}

function getSortIndex(arr){
    var result = Array.from(Array(arr.length).keys()).sort((a, b) => arr[a] > arr[b] ? -1 : (arr[b] < arr[a]) | 0)
    return result
}

function renderTable(ind){

    for(i=0; i<topScores.length; i++){
        if(i==ind){
            tdScore = document.getElementById("score" + (ind+1));
            tdName = document.getElementById("name" + (ind+1));
            tdScore.textContent = score;
            tdName.textContent = playerName;
            tdScore.style.color = "red";
            tdName.style.color = "red";

            topScoresNames[i] = playerName;
            topScores[i] = score;
        } else {
            tdScore = document.getElementById("score" + (i+1));
            tdName = document.getElementById("name" + (i+1));
            tdScore.textContent = topScores[i];
            tdName.textContent = topScoresNames[i];
        }
    }
}

function restartQuiz(){
    event.preventDefault();

    toggleDisplayReset();
    for(i=0; i<topScores.length; i++){
        tdScore = document.getElementById("score" + (i+1)).style.color = "black"
        tdName = document.getElementById("name" + (i+1)).style.color = "black"
    }

    //reset all quiz variables
    questionNumber = 0;
    quizComplete = false;
    score = quizTime;
    time = quizTime;
}
