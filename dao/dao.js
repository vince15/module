var MongoClient = require('mongodb').MongoClient;
var setting = require('../setting');

module.exports = function(callback) {
	MongoClient.connect('mongodb://'+setting.host+':'+setting.port+'/'+setting.db, function(err, db) {
		if(err) {
			return callback(err);
		};
		return callback(err, db);
	});
}