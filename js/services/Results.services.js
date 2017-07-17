function results() {
  if($('#results').length > 0) {
    getResults()
    .then(function(results) {
      displayResults(results);
    }).catch(function() {
      // If there's an error, how am I going to show the error
      // Call a function that redirects so its reusable
    });
  };
};

/********************************************
 ************   DISPLAY RESULTS   ***********
 ********************************************/

function dateBreakdown(d) {
  var date, year, month, day, hours, minutes;
  date = new Date(d);
  year = date.getFullYear();
  month = date.getMonth()+1;
  day = date.getDate();
  hours = date.getHours();
  minutes = date.getMinutes();

  if (day < 10) {
    day = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }
  
  if (minutes < 10) {
      minutes = '0' + minutes;
  }

  return (year + '-' + month + '-' + day + ' @ ' + hours + ':' + minutes);
}

function displayResults(resultsObj) {
  // Loop through the array of objects
  // Get each object date and score
  // Build a table with dates and scores
  var theDate;
  var HTML = (
			'<div class="header-group">' +
				'<div class="header-cell date">Date</div>' +
				'<div class="header-cell score">Score</div>' +
			'</div>');

  resultsObj.forEach((obj) => {
    theDate = dateBreakdown(obj.date);
    HTML += (
      '<div class="row-group">' +
        '<div class="row-cell">' + theDate + '</div>' +
        '<div class="row-cell">' + obj.score + '</div>' +
      '</div>'); 
  }) 
  return $('#results .display').append(HTML);
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