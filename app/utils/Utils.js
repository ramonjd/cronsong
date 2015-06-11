'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.ran = ran;
exports.filterMp3 = filterMp3;
exports.filterByIndex = filterByIndex;
exports.execute = execute;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _sys = require('sys');

var _sys2 = _interopRequireDefault(_sys);

var _child_process = require('child_process');

var puts = function puts(error, stdout, stderr) {
  console.log(stdout);
};

function ran() {
  var min = arguments[0] === undefined ? 1 : arguments[0];
  var max = arguments[1] === undefined ? 10 : arguments[1];

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function filterMp3() {
  var fileArray = arguments[0] === undefined ? [] : arguments[0];

  var mp3Array = [];
  if (fileArray.length > 0) {
    mp3Array = fileArray.filter(function (file) {
      return /\.mp3/.test(file);
    });
  }
  return mp3Array;
}

;

function filterByIndex(thisArray, index) {
  if (thisArray === undefined) thisArray = [];

  return thisArray.filter(function (item, i) {
    return i === index;
  });
}

;

function execute(str) {
  (0, _child_process.exec)(str, puts);
}