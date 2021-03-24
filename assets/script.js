var questionNumber = 0;
var timerStart = 60000;
var quizComplete = false;
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

    if(checkCorrect == false){window.alert("wrong!!")}
    if(checkCorrect == true){window.alert("right!!")}

    //update questionNumber
    questionNumber += 1

    if(questionNumber < questions.length){
        renderQuestions();  // go to next question
    } else {
        toggleDisplayComplete() // go to results screen
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
