'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _account = require('../controllers/account.controller');

var _account2 = _interopRequireDefault(_account);

var _paramValidation = require('../../config/param-validation');

var _paramValidation2 = _interopRequireDefault(_paramValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap
router.route('/')
/** POST /api/users - Create new user */
.post((0, _expressValidation2.default)(_paramValidation2.default.createAccount), _account2.default.create);

router.route('/myAddress')
/** GET /api/accounts - Get list of accounts */
.get(_account2.default.getByName);

router.route('/:accountId')
/** DELETE /api/users/:userId - Delete user */
.delete(_account2.default.remove);
exports.default = router;
//# sourceMappingURL=account.route.js.map
