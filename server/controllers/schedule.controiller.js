import scheduleService from '../services/schedule.service';

/**
 * 同步用户积分上ipfs
 */
async function syncScore(req, res) {
  const result = await scheduleService.syncScore();
  return res.json(result);
}

/**
 * 同步积分日志上链
 */
async function syncScoreLog(req, res) {
  const result = await scheduleService.syncScoreLog();
  return res.json(result);
}

export default { syncScore, syncScoreLog };

