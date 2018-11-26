'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _feedback = require('../controllers/jkbapp/feedback.controller');

var _feedback2 = _interopRequireDefault(_feedback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/feedbacks - get feedback list */
.get(_feedback2.default.getList)
/** GET /api/feedbacks - create feedback */
.post(_feedback2.default.create);

router.route('/:feedbackId')
/** GET /api/feedbacks/:feedbackId - get feedback info */
.get(_feedback2.default.getInfo)
/** POST /api/feedbacks/:feedbackId - 采纳反馈意见 */
.post(_feedback2.default.take);

exports.default = router;
//# sourceMappingURL=feedback.route.js.map
