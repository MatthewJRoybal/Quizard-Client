/********************************************
 ************   USER SERVICES   *************
 ********************************************/

function users() {
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

	$('body').on('click', '.js-logout', function(event) {
		event.preventDefault();
		logoutUser();
	});
}

/********************************************
 ************   GET USER OBJECT   ***********
 ********************************************/

function createUserObject(userArray) {
	var userObject = {};
	for (var i = 0; i < userArray.length; i++) {
		var obj = userArray[i];
		var key = obj[Object.keys(obj)[0]];
		var value = obj[Object.keys(obj)[1]];
		userObject[key] = value;
	}
	return userObject;
}

/********************************************
 ************   CREATE NEW USER   ***********
 ********************************************/

function createUser(userObject) {
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: config[environment].api + '/api/user/signup',
		data: JSON.stringify(userObject),
		success: function(user) {
			loginUser(userObject);
			localStorage.setItem('token');
			location.window.href = config[environment].api + '/results.html';
		}
	});
}

/********************************************
 **************   LOGIN USER   **************
 ********************************************/

function loginUser(userObject) {
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: config[environment].api + '/api/user/signin',
		data: JSON.stringify(userObject),
		success: function(user) {
			window.location.href = 'results.html';
			window.localStorage.setItem('token', user.token);
		}
	});
}

/********************************************
 *************   LOGIN LOGOUT   *************
 ********************************************/

function logoutUser() {
	localStorage.removeItem('token');
	window.location.href = 'http://quizard.me';
}
