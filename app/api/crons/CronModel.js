'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _crontab = require('crontab');

var _crontab2 = _interopRequireDefault(_crontab);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

//https://github.com/dachev/node-crontab/blob/master/test/runner.js
// http://www.sebastianseilund.com/nodejs-async-in-practice

var remodelArray = function remodelArray() {
  var tabs = arguments[0] === undefined ? [] : arguments[0];

  return tabs.map(function (tab) {
    return {
      'expression': tab.minute().toString() + tab.hour().toString() + tab.dom().toString() + tab.month().toString() + tab.dow().toString(),
      'command': tab.command(),
      'comment': tab.comment()
    };
  });
};

var CronModel = (function () {
  function CronModel() {
    var properties = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, CronModel);

    //model something here
    return {
      command: properties.command.toString(),
      expression: decodeURIComponent(properties.expression),
      comment: properties.comment.toString()
    };
  }

  _createClass(CronModel, null, [{
    key: 'show',
    value: function show() {
      var user = arguments[0] === undefined ? '' : arguments[0];

      return new _promise2['default'](function (resolve, reject) {
        _crontab2['default'].load('', function (err, tab) {
          if (err) {
            reject(err);
          } else {
            resolve(remodelArray(tab.jobs()));
          }
        });
      });
    }
  }, {
    key: 'create',
    value: function create() {
      var cron = arguments[0] === undefined ? {} : arguments[0];
      var user = arguments[1] === undefined ? '' : arguments[1];

      return new _promise2['default'](function (resolve, reject) {
        _crontab2['default'].load('', function (err, tab) {
          if (err) {
            reject(err);
          } else {
            tab.create(cron.command, cron.expression, cron.comment);
            tab.save(function (err, tab) {
              if (err) {
                reject(err);
              } else {
                resolve(remodelArray(tab.jobs()));
              }
            });
          }
        });
      });
    }
  }, {
    key: 'delete',
    value: function _delete() {
      var cron = arguments[0] === undefined ? {} : arguments[0];
      var user = arguments[1] === undefined ? '' : arguments[1];

      return loadTabs(user).then(function (status, tab) {
        return {
          'status': status,
          'jobs': tab.remove(comment)
        };
      });
    }
  }, {
    key: 'getJobByComment',
    value: function getJobByComment() {
      var comment = arguments[0] === undefined ? {} : arguments[0];
      var user = arguments[1] === undefined ? '' : arguments[1];

      return loadTabs(user).then(function (status, tab) {
        return {
          'status': status,
          'jobs': tab.jobs(comment)
        };
      });
    }
  }]);

  return CronModel;
})();

exports['default'] = CronModel;
module.exports = exports['default'];