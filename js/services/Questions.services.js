/********************************************
 ************   GET FORM OBJECT   ***********
 ********************************************/

function createFormObject(formArray) {
	var formObject = {};
	for(var i = 0; i < formArray.length; i++) {
		var obj = formArray[i];
		var key = obj[Object.keys(obj)[0]];
		var value = obj[Object.keys(obj)[1]];
		formObject[key] = value;
	}
	return(formObject);
}; // Put in utilities file

/********************************************
 *************   GET QUESTIONS   ************
 ********************************************/

function getQuestions() {
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: "GET",
			url: 'http://localhost:8080/quiz',
			success: function(questions) {
				resolve(questions);
			},
			error: function(err) {
				reject(err);
			},
			contentType: "application/json"
		});	
	})
}