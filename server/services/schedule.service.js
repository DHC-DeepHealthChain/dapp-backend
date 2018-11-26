import User from '../models/user.model';
import ResData from '../helpers/responseData';
import Score from '../models/jkbapp/score.model';
import ScoreLog from '../models/jkbapp/scorelog.model';
import scoreService from '../services/jkbapp/score.service';
// import scoreLogService from '../services/jkbapp/scorelog.service';
import taskService from '../services/jkbapp/task.service';
import { addContent } from '../utils/ipfsFile';
import TokenContract from '../helpers/tokenContract';

/**
 * 同步用户积分上ipfs
 */
async function syncScore() {
  const users = await User.findAllUsers();
  const usersTemp = users.map(item => syncScoreMethod(item));
  await Promise.all(usersTemp);
  return new ResData('完成', false, null);
}
async function syncScoreMethod(item) {
  let score = await Score.getByUserId(item._id);
  if (score === null) {
    score = await scoreService.create(item._id);
    score = await Score.getByUserId(item._id);
  }
  // 定义ipfs中存储的数据
  const ipfsData = {
    userId: item._id,
    score: item.score,
  };
  // 上传到IPFS
  const hash = await addContent(ipfsData);
  await Score.findByIdAndUpdate({ _id: score._id }, { ipfsHash: hash });
}

  /**
   * 同步积分日志上链
   */
async function syncScoreLog() {
  const scoreLogs = await ScoreLog.findByOnChain();
  const usersTemp = scoreLogs.map(item => syncScoreLogMethod(item));
  await Promise.all(usersTemp);
  return new ResData('完成', false, null);
}
async function syncScoreLogMethod(scoreLog) {
  // await scoreLogService.scoreLogOnIpfs(scoreLog._id);
  const taskScore = await taskService.getScoreByTaskType(scoreLog.scoreType);
  console.log('taskScore', taskScore);
  if (taskScore < 10000) {
    // 产生交易
    const tokenContract = new TokenContract();
    const user = await User.get(scoreLog.userId);
    if (user && user.publicKey) {
      console.log(user.publicKey, taskScore);
      await tokenContract.transferToken(user.publicKey, taskScore);
    }
  } else {
    console.log('发送的积分超过10000');
  }
}

export default { syncScore, syncScoreLog };
