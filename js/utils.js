/********************************************
 ************   GET FORM OBJECT   ***********
 ********************************************/

//function createFormObject(formArray) {
//	var formObject = {};
//	for(var i = 0; i < formArray.length; i++) {
//		var obj = formArray[i];
//		var key = obj[Object.keys(obj)[0]];
//		var value = obj[Object.keys(obj)[1]];
//		formObject[key] = value;
//	}
//	return(formObject);
//};

/********************************************
 ************   GET FORM OBJECT   ***********
 ********************************************/

function createFormObject(formArray) {
	var formObject = {};
	var options = [];
	for(var i = 0; i < formArray.length; i++) {
		var obj = formArray[i];		
		if(obj[Object.keys(obj)[0]] === 'options') {
			options.push(obj[Object.keys(obj)[1]]);
		} else {
			var key = obj[Object.keys(obj)[0]];
			var value = obj[Object.keys(obj)[1]];
			formObject[key] = value;
		}
	}
	formObject['options'] = options;
	return(formObject);
};