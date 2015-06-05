'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var app = (0, _express2['default'])();
var server = require('http').createServer(app);

app.use(_bodyParser2['default'].urlencoded({ extended: false }));

(0, _routes2['default'])(app);

app.use(_express2['default']['static'](_path2['default'].join(__dirname, '/public')));

server.listen('8888', 'localhost', function () {
  console.log('Express server listening on %d', '8888');
});

exports = module.exports = app;