function results() {
  if($('#results').length > 0) {
    getResults()
    .then(results => {
      displayResults(results);
    })
    .catch(err => {
      console.log(err);
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
  return $('#results .results-content').append(HTML);
}

/********************************************
 **************   GET RESULTS   *************
 ********************************************/

function getResults() {
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: "GET",
      contentType: "application/json",
      headers: {
        "Authorization": localStorage.getItem('token')
      },
			url: config[environment].api + '/api/quiz/results',
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

/********************************************
 *************   POST RESULTS   *************
 ********************************************/

function postResults(resultsObj) {
	$.ajax({
    type: 'POST',
		contentType: 'application/json',
    headers: {
      "Authorization": localStorage.getItem('token');
    }
		url: config[environment].api + '/api/quiz/results',
		data: JSON.stringify(resultsObj),
		success: function(results) {
			console.log('success!');
		}
	});
}
