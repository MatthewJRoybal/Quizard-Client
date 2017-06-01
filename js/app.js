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
	});
	$('body').on('click', '#logout', function(event) {
		event.preventDefault();
		logoutUser();
	});
	$('#dashboard').on('click', '#start-quiz', function() {
		getQuestions().then(function(questions) {
			// Do Quizard code here
			var Quizard = new Quiz($('#quiz'), questions, quotes);
  		Quizard.cycleQuiz();
			// Seed questions into database for testing GET here...write a script with faker or similar
			
			// Need to be able to save the results in association with user...how would that endpoint look? users.id.quiz
		});
	})
	if($('#contribute').length > 0) {
		$('#contribute').submit(function(event) {
			event.preventDefault();
			var contributeArray = $(this).serializeArray();
			var contributeObject = createFormObject(contributeArray);
			contributeConnect(contributeObject);
			console.log("Your question array has been created" + contributeArray);
		});
	};
});

// create questions service
// save quiz
// attach token from local storage
// make a request and see what happens