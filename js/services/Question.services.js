/********************************************
 ************   CREATE QUESTION   ***********
 ********************************************/

function createQuestionObject(questionArray) {
	var questionObject = {};
	for(var i = 0; i < questionArray.length; i++) {
		var obj = questionArray[i];
		var key = obj[Object.keys(obj)[0]];
		var value = obj[Object.keys(obj)[1]];
		questionObject[key] = value;
	}
	return(questionObject);
	console.log('Your question object has been created' + questionObject);
};