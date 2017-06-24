/********************************************
 ************   CONVERT TO URL   ************
 ********************************************/

function makeQueryString(categoriesObj) {
	var count = 0;
	var queryString = "";
	for(var prop in categoriesObj) { // Count # name/value pairs
		if (categoriesObj.hasOwnProperty(prop)) {
			++count;
		}
	}
	if(count === 1) { // Determine # questions/category
		var questionsCount = 12;
	} else if(count === 2) {
		var questionsCount = 8;
	} else if(count === 3) {
		var questionsCount = 7;
	} else if(count === 4) {
		var questionsCount = 6;
	} else if(count === 5) {
		var questionsCount = 5;
	}
	for(var prop in categoriesObj) {
		categoriesObj[prop] = questionsCount;
	}
	for(var prop in categoriesObj) { // Create query string
		queryString += (prop + "=" + categoriesObj[prop] + "&");
	}
	queryString = queryString.substring(0, queryString.length - 1);
	return ('http://localhost:8080/questions?' + queryString);	
}

/********************************************
 *************   GET QUESTIONS   ************
 ********************************************/

function getQuestions() {
	var categories = $('#quiz-start-form').serializeArray();
	var categoriesObj = createFormObject(categories);
	var queryString = makeQueryString(categoriesObj);
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: "GET",
			url: queryString,
			success: function(questions) {
				resolve(questions);
			},
			error: function(err) {
				reject(err);
			},
			contentType: "application/json"
		});	
	}).catch(function(err) {
		console.log(err);
	})
}

/********************************************
 *************   POST QUESTIONS   ***********
 ********************************************/

function contributeQuestion(questionObj) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/questions",
			data: JSON.stringify(questionObj),
			contentType: "application/json",
			success: function(question) {
				resolve(question);
			},
			error: function(err) {
				reject(err);
			}
		});
	}).catch(function(err) {
		console.log(err);
	})
}