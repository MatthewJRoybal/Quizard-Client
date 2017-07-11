function results() {
  if($('#dashboard').length > 0) {
    getResults()
    .then(function(results) {
      displayResults(results);
      console.log("You got results");
    }).catch(function() {
      // If there's an error, how am I going to show the error
      // Call a function that redirects so its reusable
    });
  };
};

/********************************************
 ************   DISPLAY RESULTS   ***********
 ********************************************/

function displayResults(resultsObj) {
  var HTML;
  
  
  
  return $('#results').append(HTML);
}

/********************************************
 **************   GET RESULTS   *************
 ********************************************/

function getResults() {
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: "GET",
     headers: {
        "Authorization": 'Bearer ' + window.localStorage.getItem('token')
      },
			url: "http://localhost:8080/results/display",
			success: function(results) {
				resolve(results);
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
  // POST to endpoint
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: "POST",
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token')
      },
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