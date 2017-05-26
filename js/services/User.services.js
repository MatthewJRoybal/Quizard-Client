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
	$('#tabs').tabs();
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
 **************   LOGIN USER   *************
 ********************************************/

function loginUser(userObject) {
	$.ajax({
			type: "POST",
			url: 'http://localhost:8080/user/login',
			data: JSON.stringify(userObject),
			success: function(user) {
				window.location.href = "dashboard.html";
			},
			contentType: "application/json"
		});	
}

/********************************************
 *************   LOGIN LOGOUT   *************
 ********************************************/

function logoutUser(userObject) {
	$.ajax({
			type: "POST",
			url: 'http://localhost:8080/user/logout',
			data: JSON.stringify(userObject),
			success: function(user) {
				window.location.href = "index.html";
			},
			contentType: "application/json"
		});	
}