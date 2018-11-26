'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _paramValidation = require('../../config/param-validation');

var _paramValidation2 = _interopRequireDefault(_paramValidation);

var _user = require('../controllers/user.controller');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/users - Get list of users */
.get(_user2.default.list)

/** POST /api/users - Create new user */
.post((0, _expressValidation2.default)(_paramValidation2.default.createUser), _user2.default.create);

// router.route('/all')
//   /** GET /api/users - Get list of users */
//   .get(userCtrl.getAll);

router.route('/resetPassword')
/** POST /api/users/resetPassword - reset password by userId */
.post((0, _expressValidation2.default)(_paramValidation2.default.resetPassword), _user2.default.resetPassword);

router.route('/invite')
/** GET /api/users/invite - 获取邀请码 */
.get(_user2.default.getInviteCode)
/** GET /api/users/invite/:inviteCode - 校验邀请码 */
.post(_user2.default.checkInviteCode);

router.route('/:userId')
/** GET /api/users/:userId - Get user */
.get(_user2.default.get)

/** PUT /api/users/:userId - Update user */
.put(_user2.default.update)

/** DELETE /api/users/:userId - Delete user */
.delete(_user2.default.remove);

router.route('/sendCaptcha/:mobileNumber')
/** POST /api/users/feedback - Post feedback by userId */
.get(_user2.default.sendCaptchaByMobile);

/** Load user when API with userId route parameter is hit */
router.param('userId', _user2.default.load);

exports.default = router;
//# sourceMappingURL=user.route.js.map
