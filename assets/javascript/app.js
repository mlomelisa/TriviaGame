$(document).ready(function(){

  // Variables
  let userAnswer;
  let totalCorrect;
  let totalIncorrect;
  let totalUnanswer;
  let startBttn = false;
  let intervalId;
  let clockRunning = false;
  let time = 30;


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
  function questionLoad () {

      let questionSec = $('<div>');
      // Add question
      questionSec.append($("<h3>").text(triviaArr[0].question));
      $('.questions').append(questionSec);

      // Add answers array
      let answer = $('<ul>').addClass('list-group list-unstyled answers');
    
      $('.questions').append(answer);
      

      for (let i = 0; i < triviaArr[0].answers.length; i++) {
        
        var answerList = $("<li>").addClass('list-group-item d-flex justify-content-between align-items-center').attr({ dataindex: i, id:("answ"+i)});
        answerList.append($('<input>').attr({ type: "radio", name: "answ" , value: i }));
        answerList.append($('<label>').text(triviaArr[0].answers[i]));
        $('.questions').append(answerList);
        console.log(i + triviaArr[0].answers[i] )

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

            } else {
             
              totalIncorrect++;

            }
        }
    }
}; //------------------------------Func CheckAnswer



// Function set a timer

function questionTimer(){
 
  
   if(!clockRunning) {
    intervalId = setInterval(function(){
      time--;
      $('.display').attr('id','clock').text(time);
     
      console.log(time);
    }, 1000);
    clockRunning = true;
    
    
   }
    

} //------------------------------Func SetTimer



// Initial function shows start button
function startButton (){
  let startBtn = $('<button>');
  startBtn.addClass("btn btn-lg btn-outline-success btn-start").text('Start')
  $('.questions').append(startBtn);
  $('.btn-start').on('click' , function(){
      questionLoad ();
      checkAnswer ();
      $('.btn-start').remove();
      questionTimer();
    startBttn = true;
  });
}; // ---------------------------------Start button

startButton();

});
