// Manipulate the DOM
$(document).ready(function() {
  var Quizard = new Quiz($('#quiz'), questions, quotes);
  Quizard.cycleQuiz();
});

function displayLogin() {
	$('.btn-login' || '.btn-cancel').click(function() {
		$('.login').toggleClass('hidden');
	});
	$('.btn-cancel').click(function() {
		$('.login').toggleClass('hidden');
	});
}

function loginTabs() {
	$('#tabs').tabs();
}

$(document).ready(function() {
	displayLogin();
	loginTabs();
});


$(document).ready(function() {
	$('#signup').submit(function(e) {
		e.preventDefault();
		console.log($(this).serializeArray());
		// Loop throught array values into an object and post to users endpoint ...should look like userModel obj...put this into a function to reuse it
		$.ajax({
			type: "POST", // this will send a post request to this url with this data
			url: config.local.api + "/users",
			data: {userObject}, // this is going to be your user object that needs to be built above
			success: function(user) {
				// server is sending back the user object from the login endpoint
				// This is the time to decide if the user should also be logged in? or something else?
				// Any redirects? -- dashboard.html?
			},
			error: function(err) {
				// if the server broke, send this error What kind of error do I want to display on the page....maybe use a function(s) to clean it up or be reused elsewhere?
			}
		})
		
	})
})