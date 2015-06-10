'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Song = require('./Song');

var _Song2 = _interopRequireDefault(_Song);

var router = _express2['default'].Router();

router.get('/', _Song2['default'].index);
router.get('/random', _Song2['default'].random);

module.exports = router;