//var mongoDB = require('../db');

var MongoClient = require('mongodb').MongoClient


function Temp(tmp) {
	//this.id = (new Date()).getTime() + '-' + (Math.random()+'').replace('0.', '');
	this.id = 1;
	this.json = '';
	this.temp = '';
	if(tmp) {
		for(var i in this) {
			this[i] = tmp[i];
		}
	}
}

module.exports = Temp;

Temp.prototype.save = function(callback) {
	var temp = {
		id : this.id,
		json : this.json,
		temp : this.temp
	};
	
	
	MongoClient.connect('mongodb://127.0.0.1:27017/module', function(err, db) {
		if(err) {
			return callback(err);
		};

		var collection = db.collection('temps');
		
		collection.insert(temp, {save : true}, function(err, temp) {
				db.close();
				callback(err, temp);
		});
	});
	
	/*
	mongoDB.open(function(err, db) {
		if(err) {
			return callback(err);
		}
		db.collection('temps', function(err, collection) {
			if(err) {
				mongoDB.close();
				return callback(err);
			}
			
			collection.ensureIndex('id', {unique : true});
			
			collection.insert(temp, {save : true}, function(err, temp) {
				mongoDB.close();
				callback(err, temp);
			});
		});
	});
	*/
};

Temp.prototype.get = function(id, callback) {

	MongoClient.connect('mongodb://127.0.0.1:27017/module', function(err, db) {
		if(err) {
			return callback(err);
		};

		var collection = db.collection('temps');
		
		collection.findOne({id:id}, function(err, doc) {
			db.close();
			if(doc) {
				var temp = new Temp(doc);
				return callback(err, temp);
			}else {
				return callback(err, null);
			}
		});
	});
	
	/*
	mongoDB.open(function(err, db) {
		if(err) {
			return callback(err);
		}
		db.collection('temps', function(err, db) {
			if(err) {
				mongoDB.close();
				return callback(err);
			}
			collection.findOne({id:id}, function(err, doc) {
				mongoDB.close();
				if(doc) {
					var temp = new Temp(doc);
					return callback(err, temp);
				}else {
					return callback(err, null);
				}
			});
		});
	});
	*/
};