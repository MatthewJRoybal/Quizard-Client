/********************************************
 *************   DISPLAY LOGIN   ************
 ********************************************/

function displayLogin() {
	
	$('.btn-login' || '.btn-cancel').click(function() {
		$('.login').toggleClass('hidden');
	});
	$('.btn-cancel').click(function() {
		$('.login').toggleClass('hidden');
	});
}

/********************************************
 ************   GET USER OBJECT   ***********
 ********************************************/

function createUserObject(userArray) {
	var userObject = {};
	for(var i = 0; i < userArray.length; i++) {
		var obj = userArray[i];
		var key = obj[Object.keys(obj)[0]];
		var value = obj[Object.keys(obj)[1]];
		userObject[key] = value;
	}
	return(userObject);
};

/********************************************
 ************   CREATE NEW USER   ***********
 ********************************************/

function createUser(userObject) {
	$.ajax({
			type: "POST",
			url: 'http://localhost:8080/user/create',
			data: JSON.stringify(userObject),
			success: function(user) {
				loginUser(userObject);
			},
			contentType: "application/json"
		});
}

/********************************************
 **************   LOGIN USER   **************
 ********************************************/

function loginUser(userObject) {
	console.log(userObject);
	$.ajax({
			type: "POST",
			url: 'http://localhost:8080/user/login',
			data: JSON.stringify(userObject),
			success: function(user) {
				window.location.href = "html/dashboard.html";
				window.localStorage.setItem('token', user.token);
			},
			contentType: "application/json"
		});	
}

/********************************************
 *************   LOGIN LOGOUT   *************
 ********************************************/

function logoutUser() {
	window.localStorage.setItem('token', null);
	window.location.href = "../index.html";
}