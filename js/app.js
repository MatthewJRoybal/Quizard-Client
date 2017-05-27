// Manipulate the DOM
$(document).ready(function() {
  var Quizard = new Quiz($('#quiz'), questions, quotes);
  Quizard.cycleQuiz();
});

$(document).ready(function() {
	$('#showlogin').submit(function(event) {
		event.preventDefault();
			displayLogin();
		$('#tabs').tabs();
	});
	displayLogin();
	$('#signup').submit(function(event) {
		event.preventDefault();
		var userArray = $(this).serializeArray();
		var newUser = createUserObject(userArray);
		createUser(newUser);
	});
	$('#logout').submit(function(event) {
		event.preventDefault();
		logoutUser();
	})
});