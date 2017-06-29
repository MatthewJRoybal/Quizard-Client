var templates = {
  trackProgressHTML: function (){
    return '<h2 class="center">Progress: ' + (this.questions.length - this.questionsCopy.length) + ' of ' + this.questions.length + '</h2>';
  },
	trackScoreHTML: function(){
    return '<h2 class="center">Score: ' + (this.answerScore) + ' of ' + (this.questions.length) + '</h2>';
  },
	restartButton: '<div class="btn"><button class="center restart-quiz-btn">Restart Quiz</button></div>',
	returnHomeBtn: '<div><button class="btn btn-quiz"><a href="dashboard.html">Return Home</a></button></div>',
	nextButton: '<div><button class="btn btn-quiz next-question-btn">Next Question</button></div>',
  finalButton: '<div><button class="btn btn-quiz next-question-btn">Finish Quiz</button></div>',
	finalScore: function(score) {
		return 'string here' + this.answerScore;
	}
};