'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _apiSongs = require('./api/songs');

var _apiSongs2 = _interopRequireDefault(_apiSongs);

var _apiCrons = require('./api/crons');

var _apiCrons2 = _interopRequireDefault(_apiCrons);

exports['default'] = function (app) {
  app.use('/api/songs', _apiSongs2['default']);
  app.use('/api/crons', _apiCrons2['default']);
};

;
module.exports = exports['default'];