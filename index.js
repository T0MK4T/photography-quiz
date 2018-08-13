'use strict';

let currentNum=0;
let grade = 0;

function renderContent(content,append=false){
  if(append){
    $('.content-box').append(content);
  }else{
    $('.content-box').html(content);
  }
  renderGrade();
}
function renderGrade(){
  let content = `
            Question: ${currentNum+1}/${STORE.length} Score: ${grade}
          `;
  $('.scoreboard').html(content);
}
function handleStart(){
  $('.content-box').on('click','.js-start-button',function(event){
    event.preventDefault();
    $(".scoreboard").removeClass("hidden");
    nextQuestion();
  });
}
function mainScreen(){
  let message = '';
  let button = '';
  if(currentNum==10){
    message = '';
    button = 'Play Again?';
    currentNum=0;
    grade=0;
  } else{
    message = 'Ready to Take Your Best Shot?';
    button = 'Start Quiz';
  }
  const content = `
    <h2>${message}</h2>
      <button class="js-start-button" type="button">${button}</button>
      `;
  renderContent(content,true);
}
function getQuestion(){
   return STORE[currentNum];
}
function generateQuestion(currentQuestion){
  const question = currentQuestion.question;
  const choice = currentQuestion.choices;
  let answers ='';
  let htmlOut ='';
  for(let i=0;i<choice.length;i++){
    answers += (`<label class="question-choice">
      <input type="radio" name="answer" data-choice="${i}" required>
      <span class="answer-option">${choice[i]}</span>
      </label>`);
  }
  htmlOut = `
    <form class="quiz-form">
      <fieldset>
      <legend>
        <h2 class="question-message">${question}</h2>
      </legend>
      ${answers}
      <button class="js-enter-button" type="submit">Submit</button>
      </fieldset>
    </form>
  `;
  return htmlOut;
}
function nextQuestion(){
  if (currentNum <10){
    let question = generateQuestion(getQuestion());
    renderContent(question);
    
  }else{
    renderResults();
  }
}
function giveFeedback(userKey,correctKey){
  let message = '';

  if(userKey==correctKey){
    message = 'Correct!';
    grade += 1;
  }else{
    message = `Sorry!  The correct answer is ${getQuestion().choices[correctKey]}`;
  }
let content = `
       <h2 class="answer-message">${message}</h2>
      <button class="js-start-button" type="button">Continue</button> 
    `;
  renderContent(content);
}
function handleFeedback(){
  $('.content-box').on('submit','.quiz-form',(function(event){
    event.preventDefault();
    console.log('here');
    let userAnswer = $("input[name='answer']:checked").data("choice");
    let correctAnswer = getQuestion().answerKey;
    giveFeedback(userAnswer,correctAnswer);
    
    currentNum ++;
  }));
}
function renderResults(){
  $(".scoreboard").addClass("hidden");
  let result = '';
  if(grade==10){
    result = `You're a Photography Master!`;
  }else if(grade>=7){
    result = `You know alot about Photography!`;
  } else if(grade>=5){
    result = `You seem to know a thing or two`;
  }else if(grade>=3){
    result = `Don't take pictures much, huh?`;
  }else{
    result = `Don't worry Ansel Adams, your IPhone default camera will work just fine for you`;
  }
  let score = `
    You got ${grade} out of ${STORE.length}  
  `;
  let content =`
      <h2>${score}</h2>
      <p class="feedback-message">${result}</p>
  `;
  renderContent(content);
  mainScreen();
}
function handleQuiz(){
  mainScreen();
  handleStart();
  handleFeedback();
}
$(handleQuiz);