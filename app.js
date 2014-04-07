
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var MongoStore = require('connect-mongo')(express);
var setting = require('./setting');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
	secret: setting.cookieSecret,
	store: new MongoStore({
			db: setting.db
	})
}));

var flash = require('connect-flash');
app.use(flash());

app.use(app.routes);
//app.use(express.router(routes));		// 开发指南上会报错，不使用开发指南上的方法
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);	
//app.get('/', routes.index);
//app.get('/user/:username/:age', routes.getUser);
//app.get(/\/reg\/([^\/]+)\/?/, routes.reg);
//app.get('/edit', routes.edit);

//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
