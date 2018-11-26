import ScoreLog from '../../models/jkbapp/scorelog.model';
import { addContent, getContent } from '../../utils/ipfsFile';
import { getContentsByHash } from '../../utils/ipfsList';
import taskService from './task.service';
import ResData from '../../helpers/responseData';
import User from '../../models/user.model';
import Task from '../../models/jkbapp/task.model';

/**
 * 获取积分日志列表
 * @param {*} userId
 * @param {*} pageSize
 * @param {*} page
 */
async function getList(userId, pageSize, page, looked) {
  let scoreLogs = await ScoreLog.list(pageSize, page, userId, looked);
  if (scoreLogs !== null) {
    scoreLogs = await getContentsByHash(scoreLogs);
  }
  return scoreLogs;
}

/**
 * 添加积分日志
 * @param {*} userid
 * @param {*} taskType
 * @param {*} addScore
 */
async function create(userid, taskType) {
  // 校验userid.
  // 校验taskType.

  // 通过任务类型获取对应积分
  const addScore = await taskService.getScoreByTaskType(taskType);
  // 定义ipfs中存储的数据
  const ipfsData = {
    userId: userid,
    scoreType: taskType,
    score: addScore,
  };
  // 上传到IPFS
  const hash = await addContent(ipfsData);
  // 定义mongo存储的数据
  const scoreLog = new ScoreLog({
    ipfsHash: hash,
    userId: userid,
    scoreType: taskType,
    looked: false,
    onIpfs: false
  });
  // 保存数据库
  ScoreLog.create(scoreLog);
  // 上传到合约 代做
  return '添加成功';
}

/**
 * 设置积分日志已阅读
 * 并给用户添加对应积分
 * @param {*} scoreLogId
 */
async function lookScoreLog(_id) {
  // 设置积分日志为已阅读
  let scoreLog = await ScoreLog.get(_id);
  if (scoreLog.looked) {
    return new ResData(null, true, '已添加过对应积分');
  }
  scoreLog = await ScoreLog.findOneAndUpdate({ _id }, { looked: true });
  return new ResData(scoreLog, false, null);
}

/**
 * 设置积分日志  上链
 * @param {*} scoreLogId
 */
async function scoreLogOnIpfs(_id) {
  // 设置积分日志为已阅读
  let scoreLog = await ScoreLog.get(_id);
  if (scoreLog.onChain) {
    return new ResData(null, true, '已上传至链');
  }
  scoreLog = await ScoreLog.findOneAndUpdate({ _id }, { onIpfs: true });
  return new ResData(scoreLog, false, null);
}

/**
 * 根据积分日志id获取详情
 * @param {*} scoreLogId
 */
async function getScoreLogInfoById(scoreLogId) {
  const scorelog = await ScoreLog.get(scoreLogId);
  scorelog.content = await getContent(scorelog.ipfsHash);
  return new ResData(scorelog, false, null);
}

/**
 * 检查积分不对的账户
 */
async function aa() {
  const users = await User.findAllUsers();
  const usersTemp = users.map(item => bb(item));
  const newUsers = await Promise.all(usersTemp);
  return new ResData(newUsers, false, null);
}

async function bb(item) {
  const scoreLogs = await ScoreLog.findAllByUserId(item._id, true);
  const addTemp = scoreLogs.map(scoreLog => cc(scoreLog.scoreType));
  const add = await Promise.all(addTemp);
  let totalScore = 0;
  if (add.length > 0) {
    totalScore = add.reduce((previousValue, currentValue) => previousValue + currentValue);
  }
  item.newScore = totalScore; // eslint-disable-line
  if (Number(item.score) !== Number(item.newScore)) {
    const result = { mobile: item.mobileNumber, score: item.score, newScore: item.newScore };
    // await User.findByIdAndUpdate({ _id: item._id }, { score: item.newScore });
    return result;
  }
  return null;
}

async function cc(scoreType) {
  let score = 0;
  const task = await Task.fingByTaskType(scoreType);
  score = Number(score) + Number(task[0].score);
  return score;
}

export default { getList, create, lookScoreLog, getScoreLogInfoById, aa, scoreLogOnIpfs };
