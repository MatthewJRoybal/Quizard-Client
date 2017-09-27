var templates = {
  trackProgressHTML: function (){
    return '<h2 class="center">Progress: ' + (this.questions.length - this.questionsCopy.length) + ' of ' + this.questions.length + '</h2>';
  },
	trackScoreHTML: function(){
    return '<h2 class="center">Score: ' + (this.answerScore) + ' of ' + (this.questions.length) + '</h2>';
  },
	restartButton: '<div class="btn-wrapper"><button class="btn btn-quiz">Restart Quiz</button></div>',
	returnHomeBtn: '<div class="btn-wrapper"><button class="btn btn-quiz"><a href="results.html">Return Home</a></button></div>',
	nextButton: '<div class="btn-wrapper"><button class="btn btn-quiz next-question-btn">Next Question</button></div>',
  finalButton: '<div class="btn-wrapper"><button class="btn btn-quiz next-question-btn">Finish Quiz</button></div>',
	finalScore: function(score) {
		return 'string here' + this.answerScore;
	}
};
