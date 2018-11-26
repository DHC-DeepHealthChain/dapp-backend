'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _sign = require('../controllers/jkbapp/sign.controller');

var _sign2 = _interopRequireDefault(_sign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/signs - get sign list */
.get(_sign2.default.getList)
/** POST /api/signs - create sign */
.post(_sign2.default.create);

router.route('/signState')
/** GET /api/signs/signState - get sign state */
.get(_sign2.default.getSignState);

exports.default = router;
//# sourceMappingURL=sign.route.js.map
