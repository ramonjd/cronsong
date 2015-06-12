'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Cron = require('./Cron');

var _Cron2 = _interopRequireDefault(_Cron);

var router = _express2['default'].Router();

router.get('/', _Cron2['default'].index);
router.get('/:comment', _Cron2['default'].getJobByComment);
router.post('/', _Cron2['default'].create);
router['delete']('/:comment', _Cron2['default'].deleteJobByComment);
router['delete']('/', _Cron2['default'].clearAll);

module.exports = router;