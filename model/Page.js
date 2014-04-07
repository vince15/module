var connect = require('../db');
var BSON = require('mongodb').BSONPure;


function Page(model) {
	this._id = null;	// 系统自带的objectid
	this.seller = '105362360';	// 模板开发者
	this.name = '';
	this.json = '';
	if(model) {
		for(var i in this) {
			if(model[i]) {
				this[i] = model[i];
			}
		}
	}
}

module.exports = Page;

Page.prototype.save = function(callback) {
	var page = {
		name : this.name,
		seller : this.seller,
		json : this.json
	};
	
	connect(function(err, db) {
		var collection = db.collection('page');
		collection.insert(page, {save : true}, function(err, page) {
			db.close();
			callback(err, page);
		});
	});
	
};

Page.update = function(page, callback) {
	
};

Page.get = function(id, callback) {
	connect(function(err, db) {
		var collection = db.collection('page');
		var obj_id = BSON.ObjectID.createFromHexString(id);
		collection.findOne({_id : obj_id}, function(err, doc) {
			db.close();
			if(doc) {
				var page = new Page(doc);
				return callback(err, page);
			}else {
				return callback(err, null);
			}
		});
	});
};

Page.getList = function(callback) {
	connect(function(err, db) {
		var collection = db.collection('page');
		collection.find().toArray(function(err, docs) {
			db.close();
			var pages = [];
			docs.forEach(function(doc, index) {
				var page = new Page(doc);
				pages.push(page);
			});
			return callback(err, pages);
		});
	});
};

Page.del = function(id, callback) {
	connect(function(err, db) {
		var collection = db.collection('page');
		var obj_id = BSON.ObjectID.createFromHexString(id);
		collection.remove({_id : obj_id}, {save : true}, function(err, count) {
			db.close();
			callback(err, count);
		});
	});
};