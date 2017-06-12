// templates.restartButton
var templates = {
	restartButton: '<div class="btn"><button class="center restart-quiz-btn">Restart Quiz</button></div>',
	finalScore: function(score) {
		return 'string here' + score;
	}
};

var Quiz = function(container, questions, quotes) {
  //  Create properties for arguments
  this.container = container;
  this.questions = questions;
  this.questionsCopy = questions.slice();
  this.quotes = quotes;
  
  //  Load quiz and cycle questions
  this.cycleQuiz = cycleQuiz.bind(this);
  
  //  Fetch, build, and finally pull question
  this.fetchQuestion = fetchQuestion.bind(this);
  this.buildQuestion = buildQuestion.bind(this);
  this.pullQuestion = pullQuestion.bind(this);
  this.answer;
  
  //  Grade questions
  this.gradeQuestion = gradeQuestion.bind(this);
  this.yourDestiny = yourDestiny.bind(this);
  
  //  Next question
  
  this.nextQuestion = nextQuestion.bind(this);
  
  //  Track progress & score
  this.trackProgress = trackProgress.bind(this);
  this.trackScore = trackScore.bind(this);
  
  this.restartQuiz = restartQuiz.bind(this);  
};

var score = 0;

/*************************************************************
 *********************    CYCLE QUIZ    **********************
 *************************************************************/

function cycleQuiz() {
	this.pullQuestion();
//  this.container.on('click', '#start', this.pullQuestion);
	this.container.on('click', '.grade-question-btn', this.gradeQuestion);
  this.container.on('click', '.grade-question-btn', this.nextQuestion);
  this.container.on('click', '.next-question-btn', this.pullQuestion);
  this.container.on('click', '.restart-quiz-btn', function() {
    location.reload();
  });
};

/*************************************************************
 **********************    SCOREBOARD   **********************
 *************************************************************/

function trackProgress() {
  var total = this.questions.length;
  var progress = this.questions.length - this.questionsCopy.length;
  var HTML = ('<h2 class="center">Progress: ' + progress + ' of ' + total + '</h2>');
  return $('#progress').html(HTML);
};

function trackScore() {
  var total = this.questions.length;
  var HTML = ('<h2 class="center">Score: ' + score + ' of ' + total + '</h2>');
  return $('#score').html(HTML);
};

/*************************************************************
 ********************    ASK QUESTIONS    ********************
 *************************************************************/

function pullQuestion() {
  if (this.questionsCopy.length > 0) {
    var question = this.fetchQuestion();
    this.answer = (question.options[0]);
    var questionHTML = this.buildQuestion(question);
    this.container.html(questionHTML);
    this.trackProgress();
    this.trackScore();
  } else {
    this.restartQuiz();
  }
};

function fetchQuestion() {
  var random = Math.floor(Math.random() * this.questionsCopy.length);
  var randomQuestion = this.questionsCopy[random];
  this.questionsCopy.splice(random, 1);
  return randomQuestion;
};

function buildQuestion(question) {
	var HTML = '<form class="quiz-container">' +
							 '<h2 class="quiz-question">' + question.question + '</h2>' +
							 '<ul class="quiz-choices">';

	for(var i = 0; i < question.options.length; i++) {
		HTML += '<li class="quiz-option">' +
							'<input type="radio" name="question_' + question.id + '" id="question_' + question.id + '_' + i + '" value="' + question.options[i] + '" required>' +
							'<label for="question_' + question.id + '_' + i + '">' + question.options[i] + '</label>' +
							'<div class="check"><div class="inside"></div></div>' +
						'</li>';
	}

	HTML += '</ul>' +
						'<div>' +
							'<button class="btn grade-question-btn">Submit Choice</button>' +
						'</div>' +
					'</form>';

	return $(HTML);
};

function nextQuestion() {
  var nextButton = '<div><button class="btn next-question-btn">Next Question</button></div>';
  $('.grade-question-btn').replaceWith(nextButton);
};

/*************************************************************
 *******************    GRADE QUESTIONS    *******************
 *************************************************************/

function yourDestiny(array, whichSide) {
  var arrayItem = array[Math.floor(Math.random() * array.length)];
  var HTML = ('<h2 class="' + whichSide + '">' + arrayItem + '</h2>');
  return HTML;
};

function gradeQuestion(quotes) {
  var choice = this.container.find("input:checked").val();
  var jedi = this.quotes.jedi;
  var sith = this.quotes.sith;
  
  if (choice === this.answer) {
    this.container.append(yourDestiny(jedi, "jedi"));
    score += 1;
  } else {
    this.container.append(yourDestiny(sith, "sith"));
  }
  this.answer = "";
};

/*************************************************************
 ******************    RESTART QUIZ CYCLE    *****************
 *************************************************************/

function restartQuiz() {
//  var restartBtn = ('<div class="btn"><button class="center restart-quiz-btn">Restart Quiz</button></div>');
	
	var restartBtn = (
			'<div class="start-quiz-form">' +
				'<form id="xyz">' +
					'<p>Select the types of quiz questions you\'d like to practice:</p>' +
					'<label><input type="checkbox" name="html" value="true">HTML</label>' +
					'<label><input type="checkbox" name="css" value="true">CSS</label>' +
					'<label><input type="checkbox" name="javascript" value="true">JavaScript</label>' +
					'<label><input type="checkbox" name="nodejs" value="true">Node JS</label>' +
					'<label><input type="checkbox" name="git" value="true">Git</label>' +
					'<button id="start-quiz" class="btn btn-start">Submit</button>' +
				'</form>' +
			'</div>');
	
	
	
	var returnHomeBtn = ('<div class="btn"><button class="center return-home-btn"><a href="dashboard.html">Return Home</a></button></div>');
  var finalHTML;
  var quote;
  var total = this.questions.length;
    if ( score >= 1 ) {
      quote = ('<h2 class="center jedi">The Force will be with you, always.</h2><audio src="audio/theForceWillBeWithYouAlways.mp3" autoplay="autoplay"></audio>');
    } else {
      quote = ('<h2 class="center sith">Learn to know the dark side of the force and you will achieve a power greater than any Jedi.</h2><audio src="audio/learnToKnowTheDarkSide.mp3" autoplay="autoplay"></audio>');
    }
  finalHTML = ('<h2 class="center">Congratulations, youve completed the quiz.</h2>' +
               '<h3 class="center">Your score was ' + score + ' points out of ' + total + '</h3>' + '<br>' +
                quote + '<br>' + restartBtn + returnHomeBtn);
	// consider submitting questions asked to be saved to the database so that they can possibily be displayed later for recall by the user
  this.container.html(finalHTML);
};