'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _SongModel = require('./SongModel');

var _SongModel2 = _interopRequireDefault(_SongModel);

var Song = {

  index: function index(req, res) {
    _SongModel2['default'].find(function (songs) {
      return res.status(200).json(songs);
    });
  },

  random: function random(req, res) {
    _SongModel2['default'].random(function (song) {
      return res.status(200).json(song);
    });
  }

};

exports = module.exports = Song;