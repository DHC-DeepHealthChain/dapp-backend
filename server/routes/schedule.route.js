import express from 'express';
import scheduleCtrl from '../controllers/schedule.controiller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/syncScore')
  /** GET /api/schedules/syncScore - 同步用户积分上ipfs */
  .get(scheduleCtrl.syncScore);

router.route('/syncScoreLog')
  /** GET /api/schedules/syncScoreLog - 同步积分日志上链 */
  .get(scheduleCtrl.syncScoreLog);

export default router;
