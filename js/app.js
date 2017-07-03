$(document).ready(function() {
  navUX();
  $(window).resize(function() {
    navUX();
  });
  
  $('#tabs ul li a').click(function(){
    $('li a').removeClass("active");
    $(this).addClass("active");
  });
  
  
	setTimeout(function() {
		$('#js-video-delay')[0].play()
	}, 1000);	
	if($('#tabs').length > 0) {
		$('#tabs').tabs();
	};
  logInOutBtn();
  
	$('body').on('click', '.js-toggle-hidden', function() {
		$('#login').toggleClass('hidden');
	})
	$('#signUp').submit(function(event) {
		event.preventDefault();
		var userArray = $(this).serializeArray();
		var newUser = createUserObject(userArray);
		createUser(newUser);
	});
	$('#signIn').submit(function(event) {
		event.preventDefault();
		var userCredentials = $(this).serializeArray();
		var returningUser = createUserObject(userCredentials);
		loginUser(returningUser);
	});
	$('body').on('click', '#logout', function(event) {
		event.preventDefault();
		logoutUser();
	});
  
	$('main').on('click', '#start-quiz', function(event) {
		event.preventDefault();
		getQuestions().then(function(questions) {
			getQuotes(questions.length + 1).then(function(quotes) {
				$('#quiz-results, #quiz-start').addClass('hidden');
				var Quizard = new Quiz($('#quiz'), questions, quotes);
  			Quizard.cycleQuiz();
				Quizard.done(function(quizState) {
          console.log(quizState);
          postResults(quizState).then(function() {
//             3. Push results array to server
            });
          });
        });
		  });
		});
  
  
	if($('#contribute').length > 0) {
		$('#contribute').on('click', '#contribute-question-submit', function(event) {
			event.preventDefault();
			var questionArray = $('#contribute-question').serializeArray();
			var questionObject = createFormObject(questionArray);
			contributeQuestion(questionObject)
			.then(function() {
				// If question exists, say so
				// If success, what do I want to show?
			}).catch(function() {
				// If there's an error, how am I going to show the error
				// Call a function that redirects so its reusable
			})
		});
		$('#contribute').on('click', '#contribute-quote-submit', function(event) {
			event.preventDefault();
			var quoteArray = $('#contribute-quotes').serializeArray();
			console.log(quoteArray);
			var quoteObject = createFormObject(quoteArray);
			console.log(quoteObject);
			contributeQuote(quoteObject)
			.then(function() {
				// If question exists, say so
				// If success, what do I want to show?
			}).catch(function() {
				// If there's an error, how am I going to show the error
				// Call a function that redirects so its reusable
			})
		})
	};
});	