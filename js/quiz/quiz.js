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
	this.quotesCopy = quotes.slice();
  
  //  Load quiz and cycle questions
  this.cycleQuiz = cycleQuiz.bind(this);
	this.cycleQuestions = cycleQuestions.bind(this);
	this.cycleAnswers = cycleAnswers.bind(this);
  
  //  Fetch, build, and finally pull question
  this.fetchQuestion = fetchQuestion.bind(this);
  this.buildQuestion = buildQuestion.bind(this);
  this.answer;
  
  //  Grade questions
  this.gradeAnswer = gradeAnswer.bind(this);
	this.fetchQuote = fetchQuote.bind(this);
	this.buildQuote = buildQuote.bind(this);
  
  //  Next question
  this.nextQuestion = nextQuestion.bind(this);
  
  //  Track progress & score
  this.trackProgress = trackProgress.bind(this);
  this.trackScore = trackScore.bind(this);
  
  this.restartQuiz = restartQuiz.bind(this);  
};

var score = 0;

/*********************************************************
 *********************    CYCLES    **********************
 *********************************************************/

function cycleQuiz() {
	this.cycleQuestions(); 
	this.container.on('click', '.grade-question-btn', this.cycleAnswers);
	this.container.on('click', '.next-question-btn', this.cycleQuestions);
//		this.gradeQuestion();
//		this.container.append(this.nextQuestion);
//		var randomQuote = this.fetchQuote(); // Fetch a quote
//		console.log(randomQuote);
//		var quoteHTML = this.buildQuote(randomQuote); // Build quote html
//		$('#quotes').append(quoteHTML); // Display quote html
//		this.container.on('click', '.next-question-btn', this.cycleQuestion);
//  this.container.on('click', '.restart-quiz-btn', function() {
//    location.reload(); // Reload page when restart button clicked
//  });
};

function cycleQuestions() {
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
}

function cycleAnswers() {
	this.gradeAnswer();
	this.container.append(this.nextQuestion);
	var randomQuote = this.fetchQuote();
	var quoteHTML = this.buildQuote(randomQuote);
	$('#quotes').html(quoteHTML);
}

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
							'<input type="radio" name="question_' + question._id + '" id="question_' + question._id + '_' + i + '" value="' + question.options[i] + '" required>' +
							'<label for="question_' + question._id + '_' + i + '">' + question.options[i] + '</label>' +
							'<div class="check"><div class="inside"></div></div>' +
						'</li>';
	}

	HTML += '</ul>' +
						'<div>' +
							'<button class="btn btn-quiz grade-question-btn">Submit Choice</button>' +
						'</div>' +
					'</form>';

	return $(HTML);
};

/********************************************************
 *****************    GRADE ANSWERS    ******************
 ********************************************************/

function gradeAnswer() {
  var choice = this.container.find("input:checked").val();
  if (choice === this.answer) {
    score += 1;
  }
  this.answer = "";
};

function nextQuestion() {
  var nextButton = '<div><button class="btn btn-quiz next-question-btn">Next Question</button></div>';
  $('.grade-question-btn').replaceWith(nextButton);
};


/******************************************************
 ********************    QUOTES    ********************
 ******************************************************/

function fetchQuote() {
  var random = Math.floor(Math.random() * this.quotesCopy.length);
  var randomQuote = this.quotesCopy[random];
  this.quotesCopy.splice(random, 1);
  return randomQuote;
};

function buildQuote(quoteObj) {
	return ('<h2>' + quoteObj.story + '</h2><p>' + quoteObj.quote + '</p><h3>' + quoteObj.character + '</h3>');
}

/*************************************************************
 ******************    RESTART QUIZ CYCLE    *****************
 *************************************************************/

function restartQuiz() {
	var returnHomeBtn = (
		'<div><button class="btn btn-quiz"><a href="dashboard.html">Return Home</a></button></div>');
  var finalHTML;
  var quote;
	$('#quiz-start').removeClass('hidden').append(returnHomeBtn);
	
	
  var total = this.questions.length;
    if ( score >= 1 ) {
      quote = ('<h2 class="center jedi">The Force will be with you, always.</h2>');
    } else {
      quote = ('<h2 class="center sith">Learn to know the dark side of the force and you will achieve a power greater than any Jedi.</h2>');
    }
  finalHTML = ('<h2 class="center">Congratulations, you\'ve completed the quiz.</h2>' +
               '<h3 class="center">Your score was ' + score + ' points out of ' + total + '</h3>' + '<br>' +
                quote + '<br>' + returnHomeBtn);
  this.container.html(finalHTML);
};