var Temp = require('../model/Temp.js');
var Page = require('../model/Page.js');

/**
 * 超管界面
 */
module.exports = function(app) {
	/**
	 * 删除
	 */	
	app.get('/admin/delTemp', function(req, res) {
		var id = req.query.id;
		if(!id) {
			return res.send('请输入ID');
		}
		Temp.del(id, function(err, count) {
			if(err) {
				return res.send('删除失败：', +err);
			}
			return res.send('成功删除'+count+'条记录');
		});
	});
	
	app.get('/admin/delPage', function(req, res) {
		var id = req.query.id;
		if(!id) {
			return res.send('请输入ID');
		}
		Page.del(id, function(err, count) {
			if(err) {
				return res.send('删除失败：', +err);
			}
			return res.send('成功删除'+count+'条记录');
		});
	});
};