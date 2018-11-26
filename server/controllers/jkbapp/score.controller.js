import ResData from '../../helpers/responseData';
import { getUserId } from '../../utils/jwtUtil';
import scoreService from '../../services/jkbapp/score.service';

/**
 * 根据用户id获取对应积分
 * @param {*} req
 * @param {*} res
 */
async function getScores(req, res) {
  const userId = getUserId(req, res);
  const result = await scoreService.getScores(userId);
  return res.json(new ResData(result, false, null));
}

/**
 * 为新用户创建积分记录
 * @param {*} req
 * @param {*} res
 */
async function create(req, res) {
  const userid = getUserId(req, res);
  const result = await scoreService.create(userid);
  if (result !== null) {
    return res.json(new ResData(null, false, '添加成功'));
  }
  return res.json(new ResData(null, false, '添加失败'));
}

/**
 * 更新积分
 * @param {*} req
 * @param {*} res
 */
async function update(req, res) {
  const taskType = req.query.taskType;
  const userid = getUserId(req, res);
  const result = await scoreService.update(userid, taskType);
  return res.json(new ResData(result));
}

/**
 * 获取积分日志
 * @param {*} req
 * @param {*} res
 */
async function getScoreLogs(req, res) {
  const userid = getUserId(req, res);
  const { pageSize = 20, page = 0, looked } = req.query;
  const result = await scoreService.getScoreLogs(userid, pageSize, page, looked);
  return res.json(new ResData(result));
}

/**
 * 获取积分排名
 * @param {*} req
 * @param {*} res
 */
async function getScoreRanking(req, res) {
  const { pageSize = 20, page = 0, order } = req.query;
  const result = await scoreService.getScoreRanking(pageSize, page, order);
  return res.json(new ResData(result, false, null));
}

/**
 * 设置积分日志已阅读
 * @param {*} req
 * @param {*} res
 */
async function lookScoreLog(req, res) {
  const userId = getUserId(req, res);
  const scoreLogId = req.params.scoreLogId;
  const result = await scoreService.lookScoreLog(userId, scoreLogId);
  return res.json(result);
}

/**
 * 批量 阅读 积分日志
 * @param {*} req
 * @param {*} res
 */
async function lookScoreLogs(req, res) {
  const userId = getUserId(req, res);
  const scoreLogIds = req.body.scoreLogIds;
  const result = await scoreService.lookScoreLogs(userId, scoreLogIds);
  return res.json(result);
}

/**
 * 根据积分日志id获取详情
 * @param {*} req
 * @param {*} res
 */
async function getScoreLogInfoById(req, res) {
  const scoreLogId = req.params.scoreLogId;
  const result = await scoreService.getScoreLogInfoById(scoreLogId);
  return res.json(result);
}

async function aa(req, res) {
  const result = await scoreService.aa();
  return res.json(result);
}

export default {
  getScores,
  create,
  update,
  getScoreLogs,
  getScoreRanking,
  lookScoreLog,
  lookScoreLogs,
  getScoreLogInfoById,
  aa,
};
