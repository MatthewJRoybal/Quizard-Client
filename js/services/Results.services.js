/********************************************
 **************   GET RESULTS   *************
 ********************************************/

function getResults() {
  // Find username from sessions?
  // GET results from endpoint
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: "GET",
			url: "http://localhost:8080/results/" + username,
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
 *************   POST RESULTS   *************
 ********************************************/

function postResults(resultsObj) {
  // Find results Obj
  // POST to endpoint
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/results",
			data: JSON.stringify(resultsObj),
			contentType: "application/json",
			success: function(results) {
				resolve(results);
			},
			error: function(err) {
				reject(err);
			}
		});
	}).catch(function(err) {
		console.log(err);
	})
}