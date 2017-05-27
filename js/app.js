// Manipulate the DOM
$(document).ready(function() {
  var Quizard = new Quiz($('#quiz'), questions, quotes);
  Quizard.cycleQuiz();
});

$(document).ready(function() {
	if($('#tabs').length > 0) {
		$('#tabs').tabs();
	};
	$('#showLogin').submit(function() {
		displayLogin();
	});
	displayLogin();
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
	})
	$('body').on('click', '#logout', function(event) {
		event.preventDefault();
		logoutUser();
	})
});

// create quiz service
// save quiz
// attach token from local storage
// make a request and see what happens