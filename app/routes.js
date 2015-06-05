'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _apiSong = require('./api/song');

var _apiSong2 = _interopRequireDefault(_apiSong);

exports['default'] = function (app) {
  app.use('/api/songs', _apiSong2['default']);
};

;
module.exports = exports['default'];