var setting = require('./setting');
var MongoClient = require('mongodb').MongoClient;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new MongoClient(new Server(setting.host, Connection.DEFAULT_PORT), {native_parser: true});