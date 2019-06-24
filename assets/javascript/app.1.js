$(document).ready(function(){

  // Variables
  let userAnswer;
  let totalCorrect;
  let totalIncorrect;
  let totalUnanswer;
  let startBttn = false;
  let intervalId;
  let clockRunning = false;
  let time = 5;
  let arrayQuestion = 0;


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

// Function that generates the Question from trivia Array
  function questionLoad (j) {

      let questionSec = $('<div>');
      // Add question
      questionSec.append($("<h3>").text(triviaArr[j].question));
      $('.questions').append(questionSec);

      // Add answers array
      let answer = $('<ul>').addClass('list-group list-unstyled answers').attr('id', "answ"+j);
    
      $('.questions').append(answer);
      

      for (let i = 0; i < triviaArr[j].answers.length; i++) {
        
        var answerList = $("<li>").addClass('list-group-item d-flex justify-content-between align-items-center').attr({ dataindex: i});
        answerList.append($('<input>').attr({ type: "radio", name: "answ" , value: i }));
        answerList.append($('<label>').text(triviaArr[0].answers[i]));
        questionSec.append(answerList);
        console.log(i + triviaArr[j].answers[i] )

      }
  } //--------------------------------Func Question load

// Function to detect which option was select

  function checkAnswer () {
    let radios = document.getElementsByName('answ'); // Get the name from input
    
    for(let i = 0; i < radios.length; i++){
        radios[i].onclick = function(){
           
            userAnswer = this.value;
            if ( triviaArr[0].correctAnswer === triviaArr[0].answers[userAnswer]) {
              totalCorrect++;
              correctAnswer();
            } else {
             
              totalIncorrect++;
              incorrectAnswer();
            }

        }
    }
}; //------------------------------Func CheckAnswer



// Function set a timer

function questionTimer(){
 
  
   if(!clockRunning) {
     
      intervalId = setInterval(function(){
        if(time > 0) {
        time--;
        $('.display').attr('id','clock').text(time);
       
        console.log(time);
     } else {
      console.log('Need pull next question');
      correctAnswer();
      return false; 
     } }, 1000);
     clockRunning = true;
  }
    

} //------------------------------Func SetTimer

// Reset Timer
function resetTimer(){
  clearInterval(intervalId);
  clockRunning = false;
  time = 5;

}

//Evaluate Correct question

function correctAnswer(){
  $('ul').remove();
  $('li').remove();
  $('.display').remove();
  $("div > h3").text('Correct Answer!!!')
  
  clearInterval(intervalId);
  arrayQuestion++;
  // resetTimer();
      
  // changeQuestion()


} //---------------correct Answer

//Evaluate Incorrect question

function incorrectAnswer(){
  $('ul').remove();
  $('li').remove();
  $('.display').remove();
  $("div > h3").text('Wrong Answer!!!')
  var correctAns = $("<h2>").text('Correct answer is: ' + triviaArr[arrayQuestion].correctAnswer);
  $("div").append(correctAns);
  

  
  clearInterval(intervalId);
  arrayQuestion++;
  // resetTimer();
      
  // changeQuestion()


} //---------------correct Answer


function changeQuestion(){
   

    if (clockRunning) {

    } else{
       
     questionLoad(arrayQuestion);
      questionTimer();
      console.log(triviaArr[arrayQuestion].correctAnswer)
      
    }
    
    
}


// Initial function shows start button
function startButton (){
  let startBtn = $('<button>');
  startBtn.addClass("btn btn-lg btn-outline-success btn-start").text('Start')
  $('.questions').append(startBtn);
  $('.btn-start').on('click' , function(){
      changeQuestion();
      checkAnswer ();
      $('.btn-start').remove();
    startBttn = true;
  });
}; // ---------------------------------Start button

startButton();

});
