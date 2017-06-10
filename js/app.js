$(document).ready(function() {
	setTimeout(function() {
		$('#js-video-delay')[0].play()
	}, 5000);
	if($('#tabs').length > 0) {
		$('#tabs').tabs();
	};
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
		var categories = $('#xyz').serializeArray();
		var categoriesObj = createFormObject(categories);
		var queryString = makeQueryString(categoriesObj);
		getQuestions(queryString).then(function(questions) {
			$('#dashboard').toggleClass('hidden');
			var Quizard = new Quiz($('#quiz'), questions, quotes);
			var html = "<div id='start'><button class='btn'>Start</button></div>"
			$('#quiz').html(html);
  		Quizard.cycleQuiz();
		});
	});
	if($('#contribute').length > 0) {
		$('#contribute').on('click', '#contribute-submit', function(event) {
			event.preventDefault();
			var contributeArray = $('#container-contribute').serializeArray();
			var contributeObject = createFormObject(contributeArray);
			console.log(contributeObject);
			contributeConnect(contributeObject)
			.then(function() {
				// If question exists, say so
				// If success, what do I want to show?
			}).catch(function() {
				// If there's an error, how am I going to show the error
				// Call a function that redirects so its reusable
			})
		});
	};
});

			 

	