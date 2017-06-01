/********************************************
 *************   GET QUESTIONS   ************
 ********************************************/

function getQuestions() {
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: "GET",
			url: 'http://localhost:8080/questions',
			success: function(questions) {
				resolve(questions);
				console.log("You have successfully gotten the questions:" + questions);
			},
			error: function(err) {
				reject(err);
			},
			contentType: "application/json"
		});	
	})
}