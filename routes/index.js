
var Temp = require('../model/Temp.js');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index', { title: 'Express' });
	});

	app.get('/edit', function(req, res) {
		res.render('page/edit', { title: 'Express' });
	});
	
	app.get('/get', function(req, res) {
		var temp = new Temp();
		temp.get(temp.id, function(err, temp) {
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
		temp.id = 2;
		temp.json = req.body['json'];
		temp.temp = req.body['temp'];
		temp.get(temp.id, function(err, tmp) {
			if(tmp) {
				err = '记录已存在';
			}
			if(err) {
				return res.render('page/edit', {error:err});
			}
			
			temp.save(function(err) {
				if(err) {
					return res.render('page/edit', {error:err});
				}
				return res.render('page/success', {success:'插入成功'});
			});
		});
	});
	
};
 
