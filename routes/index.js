
var Temp = require('../model/Temp.js');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index', { title: 'Express' });
	});

	app.get('/edit', function(req, res) {
		res.render('page/edit', { error: '' });
	});
	
	app.get('/get', function(req, res) {
		var _tempId = -1;
		var id = req.query.id;
		if(id) {
			_tempId = id;
		}
		Temp.get(_tempId, function(err, temp) {
			res.send(temp);
		});
	});
	
	app.get('/update', function(req, res) {
		var _tempId = -1;
		var id = req.query.id;
		if(id) {
			_tempId = id;
		}
		Temp.update(_tempId, function(err, temp) {
			res.send(temp);
		});
	});
	
	app.get('/getList', function(req, res) {
		Temp.getList(function(err, temp) {
			res.send(temp);
		});
	});
	
	app.post('/save', function(req, res) {
		if(!req.body['json']) {
			return res.redirect('/edit');
		}
		if(!req.body['temp']) {
			return res.redirect('/edit');
		}
		var temp = new Temp();
		temp.developer = '105362360';
		temp.json = req.body['json'];
		temp.temp = req.body['temp'];
			
		temp.save(function(err) {
			if(err) {
				return res.render('page/edit', {error:err});
			}
			return res.render('page/success', {success:'插入成功'});
		});
	});
	
};
 
