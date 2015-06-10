"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ran = ran;
exports.filterMp3 = filterMp3;
exports.exec = exec;

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

function exec() {}