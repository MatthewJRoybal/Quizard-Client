function questions() {
  if($('#contribute').length > 0) {
		$('#contribute').on('click', '#contribute-question-submit', function(event) {
			event.preventDefault();
			var questionArray = $('#contribute-questions').serializeArray();
			var questionObject = createFormObject(questionArray);
			contributeQuestion(questionObject)
			.then(function() {
				// If question exists, say so
				// If success, what do I want to show?
			}).catch(function() {
				// If there's an error, how am I going to show the error
				// Call a function that redirects so its reusable
			})
		});
  }
};

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
	return (config[environment].api + '/api/quiz/questions?' + queryString);	// config[environment].api
}

/********************************************
 *************   GET QUESTIONS   ************
 ********************************************/

function getQuestions() {
	var categories = $('.quiz-form').serializeArray();
	var categoriesObj = createFormObject(categories);
	var queryString = makeQueryString(categoriesObj);
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: "GET",
      headers: {
        contentType: "application/json",
        "Authorization": localStorage.getItem('token')
      },
			url: queryString,
			success: function(questions) {
				resolve(questions);
			},
			error: function(err) {
				reject(err);
			},

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
      contentType: "application/json",
			url: config[environment].api + '/api/quiz/questions',
			data: JSON.stringify(questionObj),
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
