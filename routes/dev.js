var Temp = require('../model/Temp.js');
var ResultObject = require('../model/ResultObject.js');

/**
 * 开发者页面相关
 */
module.exports = function(app) {
	/**
	 * 进入编辑页面
	 */
	app.get('/dev/edit', function(req, res) {
		res.render('page/dev/edit', { error: '' });
	});

	/**
	 * 获取对象详情
	 */	
	app.get('/dev/get', function(req, res) {
		var _tempId = -1;
		var id = req.query.id;
		if(id) {
			_tempId = id;
		}
		Temp.get(_tempId, function(err, temp) {
			res.send(temp);
		});
	});

	/**
	 * 获取列表
	 */	
	app.get('/dev/getList', function(req, res) {
		Temp.getList(function(err, temps) {
			res.send(ResultObject.createInstance(temps));
		});
	});

	/**
	 * 保存
	 */	
	app.post('/dev/save', function(req, res) {
		var _name = req.body['name'];
		var _desc = req.body['desc'];
		var _json = req.body['json'];
		var _css = req.body['css'];
		var _temp = req.body['temp'];
		
		if(!_name) {
			return res.send(ResultObject.createErrorInstance('请输入组件名称'));
		}
		if(!_json) {
			return res.send(ResultObject.createErrorInstance('请输入JSON'));
		}
		if(!_temp) {
			return res.send(ResultObject.createErrorInstance('请输入渲染模板'));
		}
		
		var temp = new Temp();
		temp.developer = '105362360';
		temp.name = _name;
		try {
			temp.json = JSON.parse(_json);
		}catch(e) {
			return res.send(ResultObject.createErrorInstance('JSON格式不正确'));
		}
		temp.temp = req.body['temp'];
		if(_desc) {
			temp.desc = _desc;
		}
		if(_css) {
			temp.css = _css;
		}
		
		temp.save(function(err) {
			if(err) {
				return res.send(ResultObject.createErrorInstance({error:err}));
			}
			return res.send(ResultObject.createInstance('插入成功'));
		});
	});

};