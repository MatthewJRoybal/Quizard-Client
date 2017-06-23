// templates.restartButton
var templates = {
	restartButton: '<div class="btn"><button class="center restart-quiz-btn">Restart Quiz</button></div>',
	returnHomeBtn: '<div><button class="btn btn-quiz"><a href="dashboard.html">Return Home</a></button></div>',
	nextButton: '<div><button class="btn btn-quiz next-question-btn">Next Question</button></div>',
//	trackProgressHTML: ('<h2 class="center">Progress: ' + (this.questions.length - this.questionsCopy.length) + ' of ' + this.questions.length + '</h2>'),
//	trackScoreHTML: '<h2 class="center">Score: ' + score + ' of ' + this.questions.length + '</h2>',
	
	finalScore: function(score) {
		return 'string here' + score;
	}
};


// Create a new array for answered questions 
// Save each question answer as a new key/value pair
// Push question with answer into the new array
// At the end of the quiz, post that new array with answers to the database
// Display all quiz results to the dashboard
// Keep track of the highest score...when pulling all of the quiz results, sort by high to low score...highlight the high score

/*************************************************
 ************    GLOBAL VARIABLES    *************
 *************************************************/

var score = 0;

/*************************************************
 **************    QUIZ FUNCTION    **************
 *************************************************/

var Quiz = function(container, questions, quotes) {
	this.container = container;
	
	// Storage Arrays
  this.questions = questions; // Original questions array
  this.questionsCopy = questions.slice(); // Copy of questions array
	this.quotes = quotes; // // Quotes array
  
  //  Cycle Quiz
  this.cycleQuiz = cycleQuiz.bind(this);
	this.cycleQuestions = cycleQuestions.bind(this);
	this.cycleAnswers = cycleAnswers.bind(this);
	
	//  Scoreboard
//  this.trackProgress = trackProgress.bind(this);
//  this.trackScore = trackScore.bind(this);
  
  //  Questions
  this.fetchQuestion = fetchQuestion.bind(this);
  this.buildQuestion = buildQuestion.bind(this);
	
	//  Grading
  this.gradeAnswer = gradeAnswer.bind(this);
	this.correct;
	
	// Quotes
  this.fetchQuote = fetchQuote.bind(this);
	this.buildQuote = buildQuote.bind(this);

	// End
  this.endQuiz = endQuiz.bind(this);  
};

/*************************************************
 ***************    CYCLE QUIZ    ****************
 ************************************************/

function cycleQuiz() {
	this.cycleQuestions(); 
	this.container.on('click', '.grade-question-btn', this.cycleAnswers);
	this.container.on('click', '.next-question-btn', this.cycleQuestions);
};

function cycleQuestions() {
	if (this.questionsCopy.length > 0) {
    var question = this.fetchQuestion();
    this.correct = (question.options[0]);
    var questionHTML = this.buildQuestion(question);
    this.container.html(questionHTML);
		var trackProgressHTML = ('<h2 class="center">Progress: ' + (this.questions.length - this.questionsCopy.length) + ' of ' + this.questions.length + '</h2>');
		var trackScoreHTML = ('<h2 class="center">Score: ' + score + ' of ' + this.questions.length + '</h2>');
    $('#progress').html(trackProgressHTML);
    $('#score').html(trackScoreHTML);
	} else {
		var trackScoreHTML = ('<h2 class="center">Score: ' + score + ' of ' + this.questions.length + '</h2>');
		$('#score').html(trackScoreHTML);
		console.log(trackScoreHTML);
		var endQuote = this.fetchQuote();
    this.endQuiz(endQuote);
  }
};

function cycleAnswers() {
	this.gradeAnswer();
	$('.grade-question-btn').replaceWith(templates.nextButton);
	var randomQuote = this.fetchQuote();
	var quoteHTML = this.buildQuote(randomQuote);
	$('#quotes').html(quoteHTML);
};

/*************************************************
 ****************    QUESTIONS    ****************
 *************************************************/

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
	console.log(question);
	return $(HTML);
};

/******************************************
 *************    GRADING    **************
 ******************************************/

function gradeAnswer() {
  var choice = this.container.find("input:checked").val();
	if (choice === this.correct) {
    score += 1;
  }
  this.correct = "";
};

/********************************************
 ****************    QUOTES    **************
 ********************************************/

function fetchQuote() {
  var random = Math.floor(Math.random() * this.quotes.length);
  var randomQuote = this.quotes[random];
  this.quotes.splice(random, 1);
  return randomQuote;
};

function buildQuote(quoteObj) {
	return ('<h2>' + quoteObj.story + '</h2><p>' + quoteObj.quote + '</p><h3>' + quoteObj.character + '</h3>');
};

/**************************************
 *************    END    **************
 **************************************/

function endQuiz(quoteObj) {
	var finalHTML = 
		('<div id="quiz-end">' +
			 '<h2>Congratulations, you\'ve completed the quiz.</h2>' +
		 		 '<h3>Your score was ' + score + ' points out of ' + this.questions.length + '</h3>' +
		 		 '<h2>' + quoteObj.story + '</h2><p>' + quoteObj.quote + '</p><h3>' + quoteObj.character + '</h3>' +
		   '<br>' + templates.returnHomeBtn +
		 '</div>');
	$('#quotes').hide();
  this.container.html(finalHTML);
};