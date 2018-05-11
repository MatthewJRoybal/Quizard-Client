function quotes() {
  $('#contribute').on('click', '#contribute-quote-submit', function(event) {
    event.preventDefault();
    var quoteArray = $('#contribute-quotes').serializeArray();
    var quoteObject = createFormObject(quoteArray);
    contributeQuote(quoteObject)
    .then(function() {
      // If question exists, say so
      // If success, what do I want to show?
    }).catch(function() {
      // If there's an error, how am I going to show the error
      // Call a function that redirects so its reusable
    });
  });
}

/********************************************
 **************   GET QUOTES  ***************
 ********************************************/

function getQuotes(count) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: "GET",
      contentType: "application/json",
			url: config[environment].api + '/api/quiz/quotes?count=' + count,
			success: function(quotes) {
				resolve(quotes);
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
 **************   POST QUOTES   *************
 ********************************************/

function contributeQuote(quoteObj) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: "POST",
      contentType: "application/json",
			url: config[environment].api + '/api/quiz/quotes',
			data: JSON.stringify(quoteObj),
			success: function(quote) {
				resolve(quote);
			},
			error: function(err) {
				reject(err);
			}
		});
	}).catch(function(err) {
		console.log(err);
	})
}
