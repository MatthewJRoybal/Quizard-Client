/********************************************
 **************   GET QUOTES  ***************
 ********************************************/

function getQuotes(count) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: "GET",
			url: 'http://localhost:8080/quotes?count=' + count,
			success: function(quotes) {
				resolve(quotes);
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
 **************   POST QUOTES   *************
 ********************************************/

function contributeQuote(quoteObj) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/quotes",
			data: JSON.stringify(quoteObj),
			contentType: "application/json",
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