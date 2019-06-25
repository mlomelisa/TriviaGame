$(document).ready(function(){



  // Variables

  let userAnswer;

  let totalCorrect =0;

  let totalIncorrect =0;

  let totalUnanswer =0;

  let intervalId;

  let clockRunning = false;

  let time = 30;

  let j = 0;
  
  
  let triviaArr = [
    q0 = {
      question: 'update' ,
      answers: [],
      correctAnswer:'update'
    },

    q1 = {
      question: 'update' ,
      answers: [],
      correctAnswer:'update'
    },
    q2 = {
      question: 'update' ,
      answers: [],
      correctAnswer:'update'
    },

    q3 = {
      question: 'update' ,
      answers: [],
      correctAnswer:'update'
    },
    q4 = {
      question: 'update' ,
      answers: [],
      correctAnswer:'update'
    },

    q5 = {
      question: 'update' ,
      answers: [],
      correctAnswer:'update'
    },
    q6 = {
      question: 'update' ,
      answers: [],
      correctAnswer:'update'
    },

    q7 = {
      question: 'update' ,
      answers: [],
      correctAnswer:'update'
    },
    q8 = {
      question: 'update' ,
      answers: [],
      correctAnswer:'update'
    },

    q9 = {
      question: 'update' ,
      answers: [],
      correctAnswer:'update'
    }
  ]
  
  // function getQuestions(){
    var searchQuestions = function(trivia) {
      var queryUrl = "https://opentdb.com/api.php?amount=10";
      $.ajax({
        url: queryUrl,
        method: "GET"
      }).then(function(response) {
        
        // answers.push(response.results[0].correct_answer);
      for (let a=0; a < response.results.length; a++ ){
        $.extend(true, triviaArr[a], {
          question: response.results[a].question,
          answers : response.results[a].incorrect_answers,
          
          correctAnswer: response.results[a].correct_answer
        });
        var newAnsw = response.results[a].correct_answer;
        triviaArr[a].answers.push(newAnsw);
        triviaArr[a].answers.sort();

      }
        
        
      });
    }
  // }

 
 console.log(triviaArr)



// Initial function shows start button

function startButton (){

  let startBtn = $('<button>');

  startBtn.addClass("btn btn-lg btn-outline-success btn-start").text('Start')

  $('.questions').append(startBtn);

  $('.btn-start').on('click' , function(){

 

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

    var answerList = $("<li>").addClass('list-group-item d-flex justify-content-between align-items-center');

    answerList.append($('<input>').attr({ type: "radio", name: "answ", value: i}));

    answerList.append($('<label>').text(triviaArr[j].answers[i]));

    answer.append(answerList);

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


    } else {


     noAnswer();



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

  totalUnanswer++;

  

} //---------------Incorrect Answer


// Function to detect which option was select



function checkAnswer(j) {
  

  $("input:radio").change(function() {

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

    time = 30;

    setTimeout(function(){

      if( j < triviaArr.length){

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

  setTimeout(reset,2000);
  setTimeout(resetTimer,10);
}

//Reset Function

function reset(){
  j=0;
  totalCorrect =0;

  totalIncorrect =0;

  totalUnanswer =0;

  $('.resultGroup').remove();

  return j;

}

startButton();
searchQuestions();


});
