'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _utilsUtils = require('../utils/Utils');

var _configEnvDev = require('../config/env/dev');

var _configEnvDev2 = _interopRequireDefault(_configEnvDev);

var song = null;
var args = process.argv.slice(2);

if (args[0]) {

  if (args[0] === 'random') {
    var files = (0, _utilsUtils.filterMp3)(_fs2['default'].readdirSync(_configEnvDev2['default'].DIR));
    var randomIndex = (0, _utilsUtils.ran)(1, files.length);
    song = (0, _utilsUtils.filterByIndex)(files, randomIndex - 1)[0];
  } else {
    song = args[0];
  }
  console.log(_configEnvDev2['default'].CMD + ' ' + _configEnvDev2['default'].DIR + song);
  //execute(config.CMD + ' ' + config.DIR + song);
} else {
  console.log('No song argument passed');
}