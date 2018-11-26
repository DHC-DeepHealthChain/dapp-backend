'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _apk = require('../controllers/jkbapp/apk.controller');

var _apk2 = _interopRequireDefault(_apk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap
router.route('/apkVersion')
/** GET /api/apks - get apkVersion */
.get(_apk2.default.getApkVersion);

exports.default = router;
//# sourceMappingURL=apk.route.js.map
