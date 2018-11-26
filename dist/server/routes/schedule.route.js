'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _schedule = require('../controllers/schedule.controiller');

var _schedule2 = _interopRequireDefault(_schedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/syncScore')
/** GET /api/schedules/syncScore - 同步用户积分上ipfs */
.get(_schedule2.default.syncScore);

router.route('/syncScoreLog')
/** GET /api/schedules/syncScoreLog - 同步积分日志上链 */
.get(_schedule2.default.syncScoreLog);

exports.default = router;
//# sourceMappingURL=schedule.route.js.map
