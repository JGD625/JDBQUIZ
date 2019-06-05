'use strict';

const questionSet = [
  { 
    number: 1,
    text: `Which of these cities have I lived in?`,
    ans1:'Los Angeles',
    ans2:'Tokyo',
    ans3:'Atlanta',
    ans4:'All of the above.'
  }, 

  {
    number: 2,
    text: 'Which book have I read the most?',
    ans1: 'The Hobbit & Lord of the Rings',
    ans2: 'Harry Potter',
    ans3: 'My Grandmother Said to Tell You She\'s Sorry',
    ans4: 'Walk Two Moons'
  }, 

  {
    number: 3,
    text: 'Which of these do I collect?',
    ans1: 'Baseball cards',
    ans2: 'Teas & Tea Accessories',
    ans3: 'Shoes',
    ans4: 'House Plants'
  }, 

  {
    number: 4, 
    text: 'Which of these pets have I kept?',
    ans1: 'Dogs',
    ans2: 'Guinea Pigs',
    ans3: 'Birds',
    ans4: 'All of the above'
  }, 

  {
    number: 5,
    text: 'I can play a few instruments, which of them is on this list?',
    ans1: 'Banjo',
    ans2: 'Trumpet',
    ans3: 'Drums',
    ans4: 'Flute'
  }, 

  {
    number: 6,
    text: 'My dog is named for a southern folk monster. Which one?',
    ans1: 'Altamaha-ha, but I call her Altie',
    ans2: 'Snallygaster, but I call her Snally',
    ans3: 'Ozark Howler, but I call her Ozzie',
    ans4: 'Tailypo, but I call her Po'
  }, 

  {
    number: 7,
    text: 'I share a birthday with Anthony Bourdain. Out of respect, I try a lot of odd local foods, including...',
    ans1: 'Hákarl, an Icelandic dish made of fermented shark ',
    ans2: 'Fugu, the poisonous pufferfish',
    ans3: 'Deep fried crickets, south-east asian street food',
    ans4: 'All of the above. Gross, maybe, but my curiosity is fierce.'
  }, 

  {
    number: 8,
    text: 'Only one of these statements is true. Which?',
    ans1: 'I\'m an excellent break dancer',
    ans2: 'I am totally ambidextrious',
    ans3: 'I love sky diving and go every chance I get',
    ans4: 'I am bilingual.'
  }, 

  {
    number: 9,
    text: 'I have never been to...?',
    ans1: 'Iceland',
    ans2: 'Taiwan',
    ans3: 'Spain',
    ans4: 'Guam'
  }, 

  {
    number: 10,
    text: 'It\'s the weekend, what am I probably doin?',
    ans1: 'Hiking and exploring, I love the outdoors.',
    ans2: 'Carpentry, it really centers me.',
    ans3: 'A spin class, I\'m always at the gym!',
    ans4: 'Relaxing by my pool. I need a break.'
  }
];

const ANSWERS = [ 
  'All of the above.', 
  'The Hobbit & Lord of the Rings', 
  'Teas & Tea Accessories', 
  'All of the above', 
  'Banjo', 
  'Tailypo, but I call her Po', 
  'All of the above. Gross, maybe, but my curiosity is fierce.', 
  'I am bilingual.', 
  'Spain', 
  'Hiking and exploring, I love the outdoors.'
];

const STORIES = [
  'All of them! Also Ichinomiya, Yamasaki, Kyoto, Woodstock, and Pine Mountain. I moved a lot.',
  'Really, they are all good. However, I have read The Hobbit & Lord of the Rings about 10 times.',
  'I studied 茶道 (Sadou, Japanese Tea Ceremony) at a temple for years and collect tea, teapots, and tea cups.',
  'I grew up on a farm, so I have had a menagerie of pets. Right now I have two dogs.',
  'I play the banjo, but not very well. I am not musically talented at all, but I play for fun.',
  'Tailypo, AKA Po, was named because she was in rough shape when I adopted her. She looked less like a dog and more like a monster.',
  'It is all of the above. I could probably win Survivor, because I will try anything once, even if I have to close my eyes first.',
  'I speak English and Japanese. I love language and am always studying a new one. It made learning programming fun!',
  'I love to travel and have been to many places, but never Spain. It is on my list, though!',
  'If only I had a pool! I do spend a lot of time outdoors though, and Georgia is great for hiking!'
];

let questionNum = 1;

let correctAnswers = 0;

function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
    <section id="question-page" role="main">
    <h2 id="question">${question.text}</h2>
    
    <form id="question-form">
      <fieldset>
        <label class="answerOption">
          <input class="answer" type="radio" name="option" required></input>
          <span>${question.ans1}</span>
        </label>
  
        <label class="answerOption">
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans2}</span>
        </label>
  
        <label class="answerOption">
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans3}</span>
        </label>
  
        <label class="answerOption">
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans4}</span>
        </label>
      </fieldset>  
      <button id="js-submit-button" class="submitbutton">Submit</button>

    </form>

    <div id="status-bar">
    <ul>
    <li><span id="question-count">Question: ${question.number}</span></li>
    <li> <span id="score-count">Score: ${correctAnswers}/10</span></li>
    </ul>
    </div>
  </section>
  `;
}

function handleStartButton() {
  $('#js-start-button').click(function(event) {
    nextQuestion();
  });
}

$(document).ready(function() {
  var target = $("#title");
  $("#js-start-button").click(function() {
    removeElement(target);
  });
});

function removeElement(target) {
  target.animate({
    opacity: "-=1"
  }, 1000, function() {
     target.remove();
     showImage();
  });
}




function showImage(){
    document.getElementById('logo').style.visibility='visible';
    }



function handleSubmitButton() {
  $('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault()

    const answer = $('input:checked').siblings('span');

    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } 
      else if ( $("input[type=radio]:checked").length < 1 ) {
      swal('Please select one.');
}
      else {
      generateIncorrectFeedback();
    }
  });
}

function handleNextButton() {
  $('#container').on('click', '#js-next-button', function(event) {

    if(questionNum === 10) {
      createResultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
  }
  });
}

function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {

    questionNum = 1;

    correctAnswers = 0;

    nextQuestion();
  });
}

function nextQuestion() {

  const question = questionSet[questionNum - 1];

  const questionsAnswered = questionNum - 1;

  $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function checkUserAnswer(answer) {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}

function generateCorrectFeedback() {
  $('#container').html(correctFeedbackTemplate(questionNum));
  iterateCorrectAnswers();
}


function correctFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2>YUP!</h2>
      <h3>${STORIES[questionNum - 1]}!</h3>
      <button id="js-next-button">Next</button>
    </section>
`;
}

function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedbackTemplate(questionNum));
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2>Nope!</h2>
      <h3>${STORIES[questionNum - 1]}!</h3>
      <button id="js-next-button">Next</button>
    </section>
`;
}

function iterateQuestion() {
  questionNum++;
}

function iterateCorrectAnswers() {
  correctAnswers++;
}

function createResultsPage(correctAnswers) {
    if (correctAnswers >= 8) {
      $('#container').html(`<div class="results correctFeedback"><h3>No, really, have we met?.</h3><p>You got ${correctAnswers} / 10</p><p>Maybe we should hang out.</p><button id="js-restart-button">Restart Quiz</button></div>`);
    } else if (correctAnswers < 8 && correctAnswers >= 5) {
      $('#container').html(`<div class="results correctFeedback"><h3>Not half bad.</h3><p>You got ${correctAnswers} / 10</p><button id="js-restart-button">Restart Quiz</button></div>`);
    } else {
      $('#container').html(`<div class="results correctFeedback"><h3>I guess we've never met.</h3><p>You got ${correctAnswers} / 10</p><p>At least you learned a little about me.</p><button id="js-restart-button">Restart Quiz</button></div>`);
    }
  }

function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleButtons();
