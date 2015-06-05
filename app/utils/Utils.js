"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ran = ran;
exports.exec = exec;

function ran() {
  var min = arguments[0] === undefined ? 1 : arguments[0];
  var max = arguments[1] === undefined ? 10 : arguments[1];

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function exec() {}