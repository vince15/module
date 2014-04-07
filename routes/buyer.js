var Page = require('../model/Page.js');
var ResultObject = require('../model/ResultObject.js');

module.exports = function(app){
	app.get('/buyer/show/:id', function(req, res) {
		res.render('page/buyer/show', {id : req.params.id});
	});
	
	app.get('/buyer/get', function(req, res) {
		var id = req.query.id;
		if(!id) {
			return res.send(ResultObject.createErrorInstance('请输入ID'));
		}
		Page.get(id, function(err, page) {
			if(err) {
				return res.send(ResultObject.createErrorInstance(err));
			}
			return res.send(ResultObject.createInstance(page));
		});
	});
};