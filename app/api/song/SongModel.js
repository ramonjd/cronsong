'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _utilsUtils = require('../../utils/Utils');

var DIR = './mp3s/_processed/';

var filterMp3 = function filterMp3() {
  var fileArray = arguments[0] === undefined ? [] : arguments[0];

  var mp3Array = [];
  if (fileArray.length > 0) {
    mp3Array = fileArray.filter(function (file) {
      return /\.mp3/.test(file);
    });
  }
  return mp3Array;
};

var remodelArray = function remodelArray() {
  var filteredFileArray = arguments[0] === undefined ? [] : arguments[0];

  return filteredFileArray.map(function (file) {
    return {
      'name': file
    };
  });
};

module.exports = {
  find: function find() {
    var callback = arguments[0] === undefined ? function () {} : arguments[0];

    callback(remodelArray(filterMp3(_fs2['default'].readdirSync(DIR))));
  },
  random: function random() {
    var callback = arguments[0] === undefined ? function () {} : arguments[0];

    var files = filterMp3(_fs2['default'].readdirSync(DIR));
    var randomIndex = (0, _utilsUtils.ran)(1, files.length);
    var song = [];
    files.some(function (file, index) {
      song = file;
      return index === randomIndex - 1;
    });
    callback(remodelArray([song]));
  }
};