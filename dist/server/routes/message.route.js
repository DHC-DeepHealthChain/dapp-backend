'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _message = require('../controllers/jkbapp/message.controller');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/messages - get messags list by userId */
.get(_message2.default.getList)
/** POST /api/messages - create messags */
.post(_message2.default.create);

router.route('/read/:messageId')
/** GET /api/messages/read/:messageId - set messags read */
.put(_message2.default.read);

exports.default = router;
//# sourceMappingURL=message.route.js.map
