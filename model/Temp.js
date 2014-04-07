var connect = require('../db');

//var MongoClient = require('mongodb').MongoClient;
var BSON = require('mongodb').BSONPure;


function Temp(tmp) {
	this._id = null;	// 系统自带的objectid
	this.developer = '';	// 模板开发者
	this.name = '';
	this.desc = '';
	this.css = '';
	this.json = '';
	this.temp = '';
	if(tmp) {
		for(var i in this) {
			if(tmp[i]) {
				this[i] = tmp[i];
			}
		}
	}
}

module.exports = Temp;

Temp.prototype.save = function(callback) {
	var temp = {
		name : this.name,
		desc : this.desc,
		developer : this.developer,
		json : this.json,
		css : this.css,
		temp : this.temp
	};
	
	connect(function(err, db) {
		var collection = db.collection('temps');
		collection.insert(temp, {save : true}, function(err, temp) {
			db.close();
			callback(err, temp);
		});
	});
	
	/*
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
	*/
};

Temp.update = function(id, callback) {
	var temp = {
		name : this.name,
		desc : this.desc,
		developer : this.developer,
		json : this.json,
		css : this.css,
		temp : this.temp
	};
	
	connect(function(err, db) {
		var collection = db.collection('temps');
		var obj_id = BSON.ObjectID.createFromHexString(id);
		collection.update({_id:obj_id}, {json:'2222',temp:'3333'}, {upsert:true}, function(err, temp) {
			db.close();
			callback(err, temp);
		});
	});
};

Temp.get = function(id, callback) {
	connect(function(err, db) {
		var collection = db.collection('temps');
		var obj_id = BSON.ObjectID.createFromHexString(id);
		collection.findOne({_id : obj_id}, function(err, doc) {
			db.close();
			if(doc) {
				var temp = new Temp(doc);
				return callback(err, temp);
			}else {
				return callback(err, null);
			}
		});
	});
};

Temp.getList = function(callback) {
	connect(function(err, db) {
		var collection = db.collection('temps');
		collection.find().toArray(function(err, docs) {
			db.close();
			var temps = [];
			docs.forEach(function(doc, index) {
				var temp = new Temp(doc);
				temps.push(temp);
			});
			return callback(err, temps);
		});
	});
};

Temp.del = function(id, callback) {
	connect(function(err, db) {
		var collection = db.collection('temps');
		var obj_id = BSON.ObjectID.createFromHexString(id);
		collection.remove({_id : obj_id}, {save : true}, function(err, count) {
			db.close();
			callback(err, count);
		});
	});
};