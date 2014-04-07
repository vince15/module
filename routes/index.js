
var Temp = require('../model/Temp.js');

var dev = require('./dev.js');
var seller = require('./seller.js');
var admin = require('./admin.js');
var buyer = require('./buyer.js');

module.exports = function(app) {
	
	dev(app);
	seller(app);
	admin(app);
	buyer(app);
	
	app.get('/', function(req, res) {
		res.render('index', { title: 'Express' });
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
	
	
	
	app.get('/show/:id', function(req, res) {
		res.render('page/show');
	});
	
	
	
};
 
