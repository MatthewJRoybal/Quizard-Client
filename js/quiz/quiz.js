function quiz() {
  $('#quizard').hide();
  $('main').on('click', '#start-quiz', function(event) {
    var choice = $('.quiz-options').find("input:checked").val();
    if (choice == undefined) {
      alert("You must choose a minimum of one category to move forward");
      return false;
    } else {
      event.preventDefault();
      getQuestions().then(function(questions) {
        getQuotes(questions.length + 1).then(function(quotes) {
          $('#quizard').show();
          $('#quiz-start').hide();
          var Quizard = new Quiz($('#test'), questions, quotes);
          Quizard.cycleQuiz();
          Quizard.done(function(quizState) {
            postResults(quizState).then(function() {
  //             3. Push results array to server
              });
            });
          });
        });
      }
    });
}

/*************************************************
 **************    QUIZ FUNCTION    **************
 *************************************************/

var Quiz = function(container, questions, quotes) {
	this.container = container;
  //  Cycle Quiz
  this.cycleQuiz = cycleQuiz.bind(this);
	this.cycleQuestions = cycleQuestions.bind(this);
	this.cycleAnswers = cycleAnswers.bind(this);
  //  Questions
  this.questions = questions;
  this.questionsCopy = questions.slice();
  this.questionsFetch = questionsFetch.bind(this);
  this.questionsBuild = questionsBuild.bind(this);
  this.questionsCurrent = {};
  this.questionsShuffle = questionsShuffle.bind(this);
  // Answers
  this.answerGraded = answerGraded.bind(this);
  this.answerCorrect;
  this.answerScore = 0;
  this.answerResults = [];
  // Quotes
  this.quotes = quotes;
  this.quoteFetch = quoteFetch.bind(this);
	this.quoteBuild = quoteBuild.bind(this);
	// End
  this.endQuiz = endQuiz.bind(this);
  this.done = done.bind(this);
  this.onfinish = function () {};
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
    var question = this.questionsFetch();
    this.questionsCurrent = question;
    this.answerCorrect = (question.options[0]);
    var questionHTML = this.questionsBuild(question);
    this.container.html(questionHTML);
    $('#progress').html(templates.trackProgressHTML.call(this));
    $('#score').html(templates.trackScoreHTML.call(this));

	} else {
		$('#score').html(templates.trackScoreHTML.call(this));
		var endQuote = this.quoteFetch();
    this.endQuiz(endQuote);
  }
};

function cycleAnswers() {
  var choice = this.container.find("input:checked").val();
  if (choice == undefined) {
    alert("You must answer the question to move forward");
    return false;
  } else {
    if (this.questionsCopy.length > 0) {
      $('.grade-question-btn').replaceWith(templates.nextButton);
    } else {
      $('.grade-question-btn').replaceWith(templates.finalButton);
    }
    this.answerGraded(choice);
    var randomQuote = this.quoteFetch();
    var quoteHTML = this.quoteBuild(randomQuote);
    $('#quotes').html(quoteHTML);
  }
};

/*************************************************
 ****************    QUESTIONS    ****************
 *************************************************/

function questionsFetch() {
  var random = Math.floor(Math.random() * this.questionsCopy.length);
  var randomQuestion = this.questionsCopy[random];
  this.questionsCopy.splice(random, 1);
  return randomQuestion;
};

function questionsShuffle(arr) {
    var a = [].concat(arr);
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);

        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
  return a;
}

function questionsBuild(question) {
  var choices = [];
  var HTML = [('<form class="quiz-form">' +
							 '<h2 class="quiz-question">' + question.question + '</h2>' +
							 '<ul class="quiz-options">')];

	for(var i = 0; i < question.options.length; i++) {
		choices.push('<li class="quiz-option">' +
							   '<input type="radio" name="question_' + question._id + '" id="question_' + question._id + '_' + i + '" value="' + question.options[i] + '" required>' +
							   '<label for="question_' + question._id + '_' + i + '">' + question.options[i] + '</label>' +
							   '<div class="check"><div class="inside"></div></div>' +
               '</li>');
	}
  var shuffled = this.questionsShuffle(choices).join("");
  HTML += shuffled;
	HTML += '</ul>' +
						'<div class="btn-wrapper">' +
							'<button class="btn btn-quiz grade-question-btn">Submit Choice</button>' +
						'</div>' +
					'</form>';
	return $(HTML);
};

/******************************************
 *************    GRADING    **************
 ******************************************/

function answerGraded(choice) {
  if (choice === this.answerCorrect) {
    this.answerScore += 1;
  }
  this.questionsCurrent['answer'] = choice;
  this.questionsCurrent['score'] = this.answerScore;
  this.answerResults.push(this.questionsCurrent);
  this.answerCorrect = "";
};

/********************************************
 ****************    QUOTES    **************
 ********************************************/

function quoteFetch() {
  var random = Math.floor(Math.random() * this.quotes.length);
  var randomQuote = this.quotes[random];
  this.quotes.splice(random, 1);
  return randomQuote;
};

function quoteBuild(quoteObj) {
	return ('<h2>' + quoteObj.story + '</h2><p>' + quoteObj.quote + '</p><h3>' + quoteObj.character + '</h3>');
};

/**************************************
 *************    END    **************
 **************************************/

function getFinalScore(arr) {
  var obj = arr[arr.length - 1];
  return obj.score;
}

function endQuiz(quoteObj) {
	var finalHTML =
		('<div id="quiz-end">' +
			 '<h2>Congratulations, you\'ve completed the quiz.</h2>' +
		 		 '<h3>Your score was ' + this.answerScore + ' points out of ' + this.questions.length + '</h3>' +
		 		 '<h2>' + quoteObj.story + '</h2><p>' + quoteObj.quote + '</p><h3>' + quoteObj.character + '</h3>' +
		   '<br>' + templates.returnHomeBtn +
		 '</div>');
	$('#quotes').hide();
  var finalScore = getFinalScore(this.answerResults);
  var finalResult = {
    score: finalScore,
    results: this.answerResults,
    date: Date()
  };
  this.answerResults = finalResult;
  this.container.html(finalHTML);
  this.onfinish(this.answerResults);
};

function done(fn) {
  this.onfinish = fn || function() {};
}
