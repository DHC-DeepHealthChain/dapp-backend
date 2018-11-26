'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _score = require('../controllers/jkbapp/score.controller');

var _score2 = _interopRequireDefault(_score);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/scores - 根据 userId 获取个人积分 */
.get(_score2.default.getScores)
/** GET /api/scores - create scores */
.post(_score2.default.create)
/** GET /api/scores - update scores */
.put(_score2.default.update);

router.route('/rank')
/** GET /api/scores - 获取积分排名 */
.get(_score2.default.getScoreRanking);

router.route('/scoreLogs')
/** GET /api/scores/scoreLogs - 获取积分日志列表 */
.get(_score2.default.getScoreLogs)
/** PUT /api/scores/scoreLogs - 批量 阅读 积分日志 */
.put(_score2.default.lookScoreLogs);

router.route('/scoreLogs/:scoreLogId')
/** GET /api/scores/scoreLogs - 根据积分日志id获取详情 */
.get(_score2.default.getScoreLogInfoById)
/** PUT /api/scores/scoreLogs/:scoreLogId - 根据 objectId 设置积分日志已阅读，并增加积分 */
.put(_score2.default.lookScoreLog);

// router.route('/aa')
//   .get(scoreCtrl.aa);

exports.default = router;
//# sourceMappingURL=score.route.js.map
