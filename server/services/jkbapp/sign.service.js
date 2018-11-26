import Sign from '../../models/jkbapp/sign.model';
import { addContent } from '../../utils/ipfsFile';
import { getContentsByHash } from '../../utils/ipfsList';
import DateUtil from '../../utils/dateUtil';
import Task from '../../models/jkbapp/task.model';
import ResData from '../../helpers/responseData';
// import SignContract from '../../contracts/signContract';
import scoreLogService from './scorelog.service';

// const signContract = new SignContract();

/**
 * 获取签到列表
 * 只回去本周签到记录
 * @param {*} userId
 * @param {*} pageSize
 * @param {*} page
 */
async function getList(userId, pageSize, page) {
  const weekStartDay = DateUtil.getWeekStartDate();
  let signs = await Sign.list({ pageSize, page, userId, weekStartDay });
  if (signs !== null) {
    signs = await getContentsByHash(signs);
  }
  const list = signs.map((item) => {
    const signTime = item.signTime.getTime();
    item.signTime = signTime; // eslint-disable-line
    return item;
  });
  return Promise.all(list);
}

/**
 * 签到
 * @param {*} userid
 */
async function create(userid) {
  // 判断今天是否已签到
  const todayStartDate = DateUtil.getDayStartDate(); // 获取今日开始时间
  const flag = await Sign.getByDateGreatThenAndUserId(todayStartDate, userid);
  if (flag) {
    return new ResData(null, true, '今日已签到');
  }
  // 添加积分日志
  let taskType = 'Sign';
  await scoreLogService.create(userid, taskType);
  // 获取最后一次签到日期
  const lastSign = await Sign.getLast1ByUserId(userid);
  let num = 1;
  if (lastSign !== null && lastSign.length > 0) {
    const lastSignTime = DateUtil.formatDate(lastSign[0].signTime);
    const yesterdayStartDate = DateUtil.getYesterdayStartDate();// 获取昨日开始时间
    if (yesterdayStartDate < lastSignTime && lastSignTime < todayStartDate) {
      num = parseInt(lastSign[0].keepSignNum, 10) + 1;
    }
  }
  // 定义ipfs中存储的数据
  const ipfsData = {
    userId: userid,
    signTime: Date.now,
    keepSignNum: num,
  };
  // 上传到IPFS
  const hash = await addContent(ipfsData);
  // 定义mongo存储的数据
  const newSign = new Sign({
    ipfsHash: hash,
    userId: userid,
    keepSignNum: num,
  });
  // 保存数据库
  await Sign.create(newSign);
  // 上传到合约 代做

  // 判断周签到
  if (num >= 7 && num % 7 === 0) {
    // 添加周签到积分日志
    taskType = 'SignWeek';
    await scoreLogService.create(userid, taskType);
  }
  return new ResData(null, false, '签到成功');
}

/**
 * 获取签到状态
 */
async function getSignState(userId) {
  let num = 0;
  let isSign = false;
  const lastSign = await Sign.getLast1ByUserId(userId);
  if (lastSign !== null && lastSign.length > 0) {
    num = parseInt(lastSign[0].keepSignNum, 10);
    num = Number(num) % 7;
    // 最后一次签到时间
    const lastSignTime = DateUtil.formatDate(lastSign[0].signTime);
    // 获取今日开始时间
    const todayStartDate = DateUtil.getDayStartDate();
    // 获取昨日开始时间
    // const yesterdayStartDate = DateUtil.getYesterdayStartDate();
    // 获取本周开始时间
    const weekStartDate = DateUtil.getWeekStartDate();
    // 判断今日是否签到
    if (lastSignTime > todayStartDate) {
      isSign = true;
    }
    const numTemp = (((lastSignTime - weekStartDate) / 1000) / 86400) + 1;
    num = num > numTemp ? numTemp : num;
    num = parseInt(num, 10);
  }
  // 获取签到积分
  let score = 0;
  const tasks = await Task.fingByTaskType('Sign');
  if (tasks !== null && tasks.length > 0) {
    score = tasks[0].score;
  }
  const result = { isSign, num, score };
  return result;
}

export default { getList, create, getSignState };
