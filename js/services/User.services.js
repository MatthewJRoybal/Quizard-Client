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
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
			url: config[environment].api + '/user/create',
			data: JSON.stringify(userObject),
			success: function(user) {
				loginUser(userObject);
			},
			contentType: "application/x-www-form-urlencoded" // "application/json"
		});
}

/********************************************
 **************   LOGIN USER   **************
 ********************************************/

function loginUser(userObject) {
	$.ajax({
			type: "POST",
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
			url: config[environment].api + '/user/login',
			data: JSON.stringify(userObject),
			success: function(user) {
        window.location.href = "../html/results.html";
				window.localStorage.setItem('token', user.token);
			},
			contentType: "application/x-www-form-urlencoded", // "application/json",
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
		});
}

/********************************************
 *************   LOGIN LOGOUT   *************
 ********************************************/

function logoutUser() {
	window.localStorage.setItem('token', null);
  if (window.location.pathname === "/html/results.html") {
    window.location.assign("../index.html");
  } else {
    location.reload();
  }
}
