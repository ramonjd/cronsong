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
    console.log('newCron from', req.body);
    console.log('newCron to', newCron);
    _CronModel2['default'].create(newCron).then(function (cron) {
      return res.status(200).json({
        'jobs': cron
      });
    });
  },

  deleteJobByComment: function deleteJobByComment(req, res) {

    var commentBody = req.params.comment;
    console.log('deleteJobByComment', commentBody);

    _CronModel2['default'].deleteJobByComment(commentBody).then(function (cron) {
      return res.status(200).json({
        'jobs': cron
      });
    });
  },

  getJobByComment: function getJobByComment(req, res) {
    var commentBody = req.params.comment;
    console.log('getJobByComment', commentBody);
    _CronModel2['default'].getJobByComment(commentBody).then(function (cron) {
      return res.status(200).json({
        'jobs': cron
      });
    });
  }

};

exports = module.exports = Cron;