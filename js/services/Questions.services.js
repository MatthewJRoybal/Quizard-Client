/********************************************
 *************   GET QUESTIONS   ************
 ********************************************/

function makeQueryString(categoriesObj) {
	// Count how many name/value pairs
	var count = 0;
	var queryString = "";
	for(var prop in categoriesObj) {
		if (categoriesObj.hasOwnProperty(prop)) {
			++count;
		}
	}
	// Determine number of questions per category
	var questionsCount = (12 / count);
	// Change values from true to questionsCount
	for(var prop in categoriesObj) {
		categoriesObj[prop] = questionsCount;
	}
	// Now make a query string
	for(var prop in categoriesObj) {
		queryString += (prop + "=" + categoriesObj[prop] + "&");
	}
	queryString = queryString.substring(0, queryString.length - 1);
	return ('http://localhost:8080/questions?' + queryString);	
}

function getQuestions(queryString) {
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
 *************   POST QUESTIONS   ************
 ********************************************/

function contributeConnect(questionObj) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/contribute",
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