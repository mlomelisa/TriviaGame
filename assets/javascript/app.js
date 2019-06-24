$(document).ready(function(){

  // Variables
  let userAnswer;
  let totalCorrect =0;
  let totalIncorrect =0;
  let totalUnanswer =0;
  let startBttn = false;
  let intervalId;
  let clockRunning = false;
  let time = 5;
   let j = 0;


  let triviaArr = [

    q1 = {
      question : 'Where will be the olymipic games on 2020?',
      answers : ['Tokyo','Paris','Rio','Shangai'],
      correctAnswer: 'Tokyo',
      image : ''
    },

    q2 = {
      question : 'Where was the olymipic games on 2016?',
      answers : ['Tokyo','Paris','Rio','Shangai'],
      correctAnswer: 'Rio',
      image : ''
    }

  ]

// Initial function shows start button
function startButton (){
  let startBtn = $('<button>');
  startBtn.addClass("btn btn-lg btn-outline-success btn-start").text('Start')
  $('.questions').append(startBtn);
  $('.btn-start').on('click' , function(){
    console.log(j)
    $('.btn-start').remove();
    
    generateQ(j);
    questionTimer();
    checkAnswer(j);
    
    // loadNewQ();  
    
    startBttn = true;
  });
}; // ---------------------------------Start button

// Generate new question
function generateQ(j){
  $(".questionTitle").text(triviaArr[j].question);

  let answer = $('<ul>').addClass('list-group list-unstyled answers').attr('id', "answ"+j);
  
  $('.questions').append(answer);
  
  
  for (let i = 0; i < triviaArr[j].answers.length; i++) {
    
    var answerList = $("<li>").addClass('list-group-item d-flex justify-content-between align-items-center').attr({ dataindex: i});
    answerList.append($('<input>').attr({ type: "radio", name: "answ" , value: i }));
    answerList.append($('<label>').text(triviaArr[0].answers[i]));
    answer.append(answerList);
    console.log(i + triviaArr[j].answers[i] )
  
  }
 
}//----------------------------------------generate new question

function loadNewQ(j){
      
      generateQ(j);
      checkAnswer(j);
      
} //---------------------------Load New Question

// Timer Function
function questionTimer(){
  let displayClock = $('<div>').addClass('display');
      $('.display').attr('id','clock').text(time);
      $('.display-main').append(displayClock);
      $('.display').text(time);
  
  if(!clockRunning) {   // Validate clockRunning variable is in false state
     intervalId = setInterval(function(){
     
      
       if(time > 0) {
       
       time--;
       $('.display').text(time);
      
       console.log(time);
    } else {
     console.log('Need pull next question');
     noAnswer();
    console.log(time);
    //  return false; 
    } }, 1000);
    clockRunning = true;
 }
   

} //------------------------------Func SetTimer

//Evaluate Correct question

function correctAnswer(){
  $('ul').remove();
  $('li').remove();
  $('.display').remove();
  $(".questionTitle").text('Correct Answer!!!')
  
  resetTimer();
      
} //---------------correct Answer

//Evaluate Incorrect question

function incorrectAnswer(){
  $('ul').remove();
  $('li').remove();
  $('.display').remove();
  $(".questionTitle").text('Wrong Answer!!!')
  $(".correctAnswer").text('Correct answer is: ' + triviaArr[j].correctAnswer);
   
  resetTimer();
} //---------------Incorrect Answer

//Evaluate No answer question

function noAnswer(){
  $('ul').remove();
  $('li').remove();
  $('.display').remove();
  $(".questionTitle").text('You didnt answer!!')
  $(".correctAnswer").text('Correct answer is: ' + triviaArr[j].correctAnswer);
  resetTimer();
  
  
} //---------------Incorrect Answer


// Function to detect which option was select

function checkAnswer(j) {
  $("input[name='answ']").change(function() {

    userAnswer = this.value;
    if ( triviaArr[j].correctAnswer === triviaArr[j].answers[userAnswer]) {
      totalCorrect++;
      correctAnswer();
    } else {
     
      totalIncorrect++;
      incorrectAnswer();
     } 
     
  });
}; //------------------------------Func CheckAnswer

// Reset Timer
function resetTimer(){
  
    clearInterval(intervalId);
    clockRunning = false;
    time = 5;
    
    setTimeout(function(){
      if( j < triviaArr.length){
     console.log(j);
     console.log(triviaArr.length);
      $(".correctAnswer").text('');
     
      
      questionTimer();
      loadNewQ(j);
      return j;
    }
    else{
      result();
      
    }
  
  },2000);
    
    j++;

 


} //--------------Reset Timer

//Function Final result

function result(){
  $(".questionTitle").text('Result!!')
  $(".correctAnswer").text('')

  let resultList = $('<ul>').addClass('list-group list-unstyled resultGroup');

 let correctAns = $("<li>").addClass('list-group-item d-flex justify-content-between align-items-center resultGroup').text('You have Total Answers correct: ' + totalCorrect);
  resultList.append(correctAns)

  let incorrectAns = $("<li>").addClass('list-group-item d-flex justify-content-between align-items-center resultGroup').text('You have Total Answers incorrect: ' + totalIncorrect);
  resultList.append(incorrectAns)

  let unAns = $("<li>").addClass('list-group-item d-flex justify-content-between align-items-center resultGroup').text('You have Total questions without Answer: ' + totalUnanswer);
  resultList.append(unAns)

  $('.questions').append(resultList);
   
   
  
}

startButton();

});
