/********************************************
 ************   GET FORM OBJECT   ***********
 ********************************************/

function createFormObject(formArray) {
	var formObject = {};
	var options = [];
	for(var i = 0; i < formArray.length; i++) {
		var obj = formArray[i];
		// Contribute form uses answer options and they need to be separated
		if(obj[Object.keys(obj)[0]] === 'options') {
			options.push(obj[Object.keys(obj)[1]]);
			formObject['options'] = options; // Moved this from being right above the return...does it still work?
		} else {
			var key = obj[Object.keys(obj)[0]];
			var value = obj[Object.keys(obj)[1]];
			formObject[key] = value;
		}
	}
	return(formObject);
};