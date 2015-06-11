'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _utilsUtils = require('../../utils/Utils');

var _configEnvDev = require('../../config/env/dev');

var _configEnvDev2 = _interopRequireDefault(_configEnvDev);

var DIR = './mp3s/_processed/';

var remodelArray = function remodelArray() {
  var filteredFileArray = arguments[0] === undefined ? [] : arguments[0];

  return filteredFileArray.map(function (file) {
    return {
      'name': file
    };
  });
};

var SongModel = (function () {
  function SongModel(properties) {
    _classCallCheck(this, SongModel);

    this.properties = properties;
  }

  _createClass(SongModel, null, [{
    key: 'find',
    value: function find() {
      var callback = arguments[0] === undefined ? function () {} : arguments[0];

      callback(remodelArray((0, _utilsUtils.filterMp3)(_fs2['default'].readdirSync(_configEnvDev2['default'].DIR))));
    }
  }, {
    key: 'random',
    value: function random() {
      var callback = arguments[0] === undefined ? function () {} : arguments[0];

      var files = (0, _utilsUtils.filterMp3)(_fs2['default'].readdirSync(_configEnvDev2['default'].DIR));
      var randomIndex = (0, _utilsUtils.ran)(1, files.length);
      var song = (0, _utilsUtils.filterByIndex)(files, randomIndex - 1);
      callback(remodelArray([song]));
    }
  }]);

  return SongModel;
})();

exports['default'] = SongModel;
module.exports = exports['default'];