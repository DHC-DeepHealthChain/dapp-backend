import { addContent } from '../../utils/ipfsFile';
import Score from '../../models/jkbapp/score.model';
import User from '../../models/user.model';
import ScoreLog from '../../models/jkbapp/scorelog.model';
// import TokenContract from '../../helpers/tokenContract';
import scoreLogService from '../../services/jkbapp/scorelog.service';
import ResData from '../../helpers/responseData';
import taskService from '../jkbapp/task.service';
import DateUtil from '../../utils/dateUtil';
// getContent
// const getIpfsContent = async hash => await getContent(hash);

/**
 * 根据用户id获取对应积分
 * @param {*} req
 * @param {*} res
 */
async function getScores(userId) {
  const user = await User.get(userId);
  const score = user.score;
  // let score = await Score.getByUserId(userId);
  // if (score === null) {
  //   score = await create(userId);
  //   score = await Score.getByUserId(userId);
  // }
  // let content = await getIpfsContent(score.ipfsHash);
  // if (content) {
  //   score.content = content;
  // } else {
  //   content = await getIpfsContent(score.ipfsHash);
  //   score.content = content;
  // }
  // content = JSON.parse(score.content);
  // if (content.score === null) {
  //   content.score = 0;
  //   score.content = content;
  // }
  return score;
}

/**
* 为新用户创建积分记录
* @param {*} userid
*/
async function create(userid) {
  // 定义ipfs中存储的数据
  const ipfsData = {
    userId: userid,
    score: 0,
  };
  // 上传到IPFS
  const hash = await addContent(ipfsData);
  // 定义mongo存储的数据
  const score = new Score({
    ipfsHash: hash,
    userId: userid
  });
  // 保存数据库
  const newScore = await Score.create(score);
  // 上传到合约 代做
  return newScore;
}

/**
 * 更新积分
 * @param {*} userid
 * @param {*} taskType
 */
async function update(userid, taskType) {
  const user = await User.get(userid);
  if (!user) {
    return new ResData(null, true, '用户不存在');
  }

  // 通过任务类型获取对应积分
  const addScore = await taskService.getScoreByTaskType(taskType);
  // 获取DHC不能超过10000
  // if (addScore < 10000) {
  //   console.log('addScore', addScore);
  //   // 产生交易
  //   const tokenContract = new TokenContract();
  //   await tokenContract.transferToken(user.publicKey, addScore);
  //   //   if (resultBody.error) {
  //   //     console.log('积分没有发送成功。');
  //   //     // return new ResData(null, true, '操作失败，请重新操作。');
  //   //   }
  // } else {
  //   console.log('发送的积分超过10000。');
  //   // return new ResData(null, true, '操作失败，请重新操作。');
  // }

  // 根据用户id获取用户历史积分
  let oldScore = user.score;
  if (!oldScore) {
    oldScore = 0;
  }
  // 积分累加
  const newScore = parseInt(oldScore, 10) + parseInt(addScore, 10);
  // 更新积分
  console.log(user.mobileNumber, taskType, oldScore, addScore, newScore);
  console.log('-----------------------------------------------');
  await User.findByIdAndUpdate({ _id: userid }, { $set: { score: newScore } });
  return '修改成功';
}

/**
 * 获取积分日志
 * @param {*} userid
 */
async function getScoreLogs(userid, pageSize, page, looked) {
  // 计算总数
  const total = await ScoreLog.countByUserId(userid, looked);
  // 获取日志列表
  const scoreLogs = await scoreLogService.getList(userid, pageSize, page, looked);
  // 组装分页结果
  const pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
  // 下次app发版是解开
  const result = { list: scoreLogs, pagination };
  return result;
}

/**
 * 获取积分排名
 * @param {*} userid
 */
async function getScoreRanking(pageSize, page, order) {
  let scorelist;
  switch (order) {
    case 'today': {
      // 获取今日开始时间
      const todayStartDate = DateUtil.getDayStartDate();
      scorelist = await User.getRankingAndCreatedDateGrateBy(pageSize, page, todayStartDate);
      break;
    }
    case 'total': {
      scorelist = await User.getRanking(pageSize, page);
      break;
    }
    default: {
      break;
    }
  }
  const list = scorelist.map((item, index) => {
    let name = '';
    if (item.nickname) {
      name = item.nickname;
    }
    let score = 0;
    if (item.score !== null) {
      score = item.score;
    }
    return { index: index + 1, username: name, mobile: item.mobileNumber, score };
  });
  return Promise.all(list);
}

/**
 * 设置积分日志已阅读
 * @param {*} scoreLogId
 */
async function lookScoreLog(userId, scoreLogId) {
  const resultBody = await scoreLogService.lookScoreLog(scoreLogId);
  if (!resultBody.error) {
    const taskType = resultBody.result.scoreType;
    // 添加积分
    const scoreResultBody = await update(userId, taskType);
    if (scoreResultBody !== null && scoreResultBody.error) {
      return new ResData(null, true, scoreResultBody.message);
    }
  }
  return new ResData(null, false, '已阅读');
}

/**
 * 批量 设置积分日志已阅读
 * @param {*} scoreLogId
 */
async function lookScoreLogs(userId, scoreLogIds) {
  const scoreLogsTemp = scoreLogIds.map(item => scoreLogService.lookScoreLog(item));
  const scoreLogs = await Promise.all(scoreLogsTemp);
  const scoresTemp = scoreLogs.map(item => taskService.getScoreByTaskType(item.scoreType));
  const scores = await Promise.all(scoresTemp);
  const totalScore = scores.reduce((previousValue, currentValue) => previousValue + currentValue);
  if (totalScore > 0) {
    // 给用户添加积分
    const user = await User.get(userId);
    const score = Number(user.score) + Number(totalScore);
    await User.findByIdAndUpdate({ _id: user._id }, { score });
  }
  return new ResData(null, false, '已阅读');
}

/**
 * 根据积分日志id获取详情
 * @param {*} scoreLogId
 */
async function getScoreLogInfoById(scoreLogId) {
  const result = await scoreLogService.getScoreLogInfoById(scoreLogId);
  return result;
}

async function aa() {
  const result = await scoreLogService.aa();
  return result;
}

export default {
  getScores,
  update,
  create,
  getScoreLogs,
  getScoreRanking,
  lookScoreLog,
  lookScoreLogs,
  getScoreLogInfoById,
  aa
};
