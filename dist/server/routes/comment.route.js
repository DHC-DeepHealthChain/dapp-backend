'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _comment = require('../controllers/jkbapp/comment.controller');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/commments - get commments list by userId */
.get(_comment2.default.getList)
/** POST /api/commments - create commment */
.post(_comment2.default.create);

router.route('/:commentId')
/** DELETE /api/commments - delete commment by commentId */
.delete(_comment2.default.remove);

exports.default = router;
//# sourceMappingURL=comment.route.js.map
