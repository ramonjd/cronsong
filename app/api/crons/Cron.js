'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _CronModel = require('./CronModel');

var _CronModel2 = _interopRequireDefault(_CronModel);

var user = 'skyid';

var Cron = {

  index: function index(req, res) {
    _CronModel2['default'].show().then(function (cron) {
      return res.status(200).json({
        'jobs': cron
      });
    });
  },

  create: function create(req, res, next) {
    var newCron = new _CronModel2['default'](req.body);
    _CronModel2['default'].create(newCron).then(function (cron) {
      return res.status(200).json({
        'jobs': cron
      });
    });
  },

  'delete': function _delete(req, res) {
    var commentBody = req.params.comment;
    _CronModel2['default']['delete']({ comment: commentBody }).then(function (status, tab) {
      return res.status(200).json(tab);
    });
  },

  getJobByComment: function getJobByComment(req, res) {
    var commentBody = req.params.comment;
    _CronModel2['default'].getJobByComment({ comment: commentBody }).then(function (status, tab) {
      return res.status(200).json(tab);
    });
  }

};

exports = module.exports = Cron;