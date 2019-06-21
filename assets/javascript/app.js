$(document).ready(function(){


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

    // Generate the Question from trivia Array
  function questionLoad () {

    let questionSec = $('<div>');
    // Add question
    questionSec.append($("<h3>").text(triviaArr[0].question));
    $('.questions').append(questionSec);

    // Add answer
    let answer = $('<ul>').addClass('list-group list-unstyled answers');
   
    $('.questions').append(answer);
    

    for (let i = 0; i < triviaArr[0].answers.length; i++) {
      
      var answerList = $("<li>").addClass('list-group-item d-flex justify-content-between align-items-center').attr('index',i);
      answerList.append($('<input>').attr({ type: "radio", name: "anserRad" }));
      answerList.append($('<label>').text(triviaArr[0].answers[i]));
      $('.questions').append(answerList);
      console.log(i + triviaArr[0].answers[i] )

    }
  }

  questionLoad ();

  });
