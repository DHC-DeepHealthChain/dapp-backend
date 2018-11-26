'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _paramValidation = require('../../config/param-validation');

var _paramValidation2 = _interopRequireDefault(_paramValidation);

var _auth = require('../controllers/auth.controller');

var _auth2 = _interopRequireDefault(_auth);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login').post((0, _expressValidation2.default)(_paramValidation2.default.login), _auth2.default.login);

/** POST /api/auth/thirdLogin - Returns token if correct username and password is provided */
router.route('/thirdLogin').post(_auth2.default.thirdLogin); // validate(paramValidation.thirdLogin),

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number').get((0, _expressJwt2.default)({ secret: _config2.default.jwtSecret }), _auth2.default.getRandomNumber);

router.route('/associatedWeixinAccount')
/** POST /api/auth/associatedWeixinAccount - 关联微信账户 */
.post(_auth2.default.associatedWeixinAccount);
exports.default = router;
//# sourceMappingURL=auth.route.js.map
