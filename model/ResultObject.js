
var obj = {
	errorCode : 0,
	msg : 'success',
	data : null,
	ret : 0
};

function ResultObject(obj) {
	
}

module.exports = ResultObject;



ResultObject.createInstance = function(code, data, msg) {
	if(arguments.length == 1) {
		obj.errorCode = 0;
		obj.data = arguments[0];
	}else if(arguments.length == 2) {
		obj.errorCode = arguments[0];
		obj.data = arguments[1];
	}else if(arguments.length == 3) {
		obj.errorCode = arguments[0];
		obj.data = arguments[1];
		obj.msg = arguments[2];
	}
	return obj;
};

ResultObject.createErrorInstance = function(code, msg) {
	if(arguments.length == 1) {
		obj.errorCode = -1;
		obj.msg = arguments[0];
	}else if(arguments.length == 2) {
		obj.errorCode = arguments[0];
		obj.msg = arguments[1];
	}
	return obj;
};