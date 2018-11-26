import express from 'express';
import scoreCtrl from '../controllers/jkbapp/score.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/scores - 根据 userId 获取个人积分 */
  .get(scoreCtrl.getScores)
  /** GET /api/scores - create scores */
  .post(scoreCtrl.create)
  /** GET /api/scores - update scores */
  .put(scoreCtrl.update);

router.route('/rank')
  /** GET /api/scores - 获取积分排名 */
  .get(scoreCtrl.getScoreRanking);

router.route('/scoreLogs')
  /** GET /api/scores/scoreLogs - 获取积分日志列表 */
  .get(scoreCtrl.getScoreLogs)
  /** PUT /api/scores/scoreLogs - 批量 阅读 积分日志 */
  .put(scoreCtrl.lookScoreLogs);

router.route('/scoreLogs/:scoreLogId')
  /** GET /api/scores/scoreLogs - 根据积分日志id获取详情 */
  .get(scoreCtrl.getScoreLogInfoById)
  /** PUT /api/scores/scoreLogs/:scoreLogId - 根据 objectId 设置积分日志已阅读，并增加积分 */
  .put(scoreCtrl.lookScoreLog);

// router.route('/aa')
//   .get(scoreCtrl.aa);

export default router;
