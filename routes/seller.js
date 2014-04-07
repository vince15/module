var Page = require('../model/Page.js');
var Temp = require('../model/Temp.js');
var ResultObject = require('../model/ResultObject.js');
var async = require('async'); 
/**
 * 卖家编辑页面
 */
module.exports = function(app){

	app.get('/seller/edit', function(req, res) {
		res.render('page/seller/edit');
	});
	
	/**
	 * 获取对象详情
	 */	
	app.get('/seller/get', function(req, res) {
		var _tempId = -1;
		var id = req.query.id;
		if(id) {
			_tempId = id;
		}
		Temp.get(_tempId, function(err, temp) {
			res.send(temp);
		});
	});
	
	app.get('/seller/getList', function(req, res) {
		Page.getList(function(err, pages) {
			res.send(ResultObject.createInstance(pages));
		});
	});
	
	app.post('/seller/save', function(req, res) {
		var _json = req.body['json'];
		if(!_json) {
			return res.send(ResultObject.createErrorInstance('请输入页面内容'));
		}
		
		var modelList = [];
		try{
			modelList = JSON.parse(_json);
		}catch(e) {
			res.send(ResultObject.createErrorInstance('请输入正确的组件内容'));
		}
		
		async.mapSeries(modelList, function(node, cb) {
			var item = node;
			var item_json = {};
			var id = '';
			
			for(var j in item) {
				id = j;
				item_json = item[j];
				break;
			}
			id = id.split('_')[0];
			Temp.get(id, function(err, temp) {
				var model = {};
				model.rid = (Math.random()+'').replace('0.', '');
				model.css = temp.css;
				model.temp = temp.temp;
				model.json = item_json;
				// 回调到同步函数中
				cb(null, model);
			});
		}, function(err, result) {
			var page = new Page();
			page.name = 'kenluo test';
			page.json = result;
			page.save(function(err, result2) {
				res.send(ResultObject.createInstance(result2));
			});
			
		});
	});
};