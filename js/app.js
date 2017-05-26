// Manipulate the DOM
$(document).ready(function() {
  var Quizard = new Quiz($('#quiz'), questions, quotes);
  Quizard.cycleQuiz();
});

$(document).ready(function() {
	displayLogin();
	$('#signup').submit(function(event) {
		event.preventDefault();
		var userArray = $(this).serializeArray();
		var newUser = createUserObject(userArray);
		createUser(newUser);
	})
});