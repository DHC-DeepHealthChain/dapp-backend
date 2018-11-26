import Feedback from '../../models/jkbapp/feedback.model';
import { addContent, getContent } from '../../utils/ipfsFile';
import { getContentsByHash } from '../../utils/ipfsList';
import User from '../../models/user.model';
import ResData from '../../helpers/responseData';
import scoreLogService from './scorelog.service';

const getIpfsContent = async hash => await getContent(hash);

/**
 * 获取意见反馈列表
 * @param {*} req
 * @param {*} res
 */
async function getList(pageSize, page) {
  let feedbacks = await Feedback.list();
  if (feedbacks) {
    feedbacks = await getContentsByHash(feedbacks);
  }
  const list = feedbacks.map(async (item) => {
    const user = await User.get(item.userId);
    const content = JSON.parse(item.content).content;
    return { content, username: user.username, mobileNumber: user.mobileNumber, createdDate: item.createdDate.getTime() }; // eslint-disable-line
  });
  // 计算总数
  const total = await Feedback.countAll();
  // 组装分页结果
  const pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
  // 下次app发版是解开
  // const result = { list: await Promise.all(list), pagination };
  return await Promise.all(list);
}

/**
 * 获取意见反馈详情
 * @param {*} req
 * @param {*} res
 */
async function getInfo(_id) {
  const feedback = await Feedback.get(_id);
  if (feedback) {
    feedback.content = await getIpfsContent(feedback.ipfsHash);
  }
  return feedback;
}

/**
 * 添加新意见反馈
 * @param {*} req
 * @param {*} res
 */
async function create(userId, content) {
  // 定义ipfs中存储的数据
  const ipfsData = {
    userId,
    content
  };
  // 上传到IPFS
  const hash = await addContent(ipfsData);
  // 定义mongo存储的数据
  const feedback = new Feedback({
    ipfsHash: hash,
    userId,
  });
  // 保存数据库
  await Feedback.create(feedback);
  return '谢谢您的反馈！';
}

/**
 * 采纳 意见反馈 发放积分
 * @param {*} _id
 */
async function take(_id) {
  const feedback = await Feedback.get(_id);
  if (!feedback) {
    return new ResData(null, true, '未查到对应反馈信息');
  }
  if (feedback.taked === true) {
    return new ResData(null, true, '次反馈信息已被管理员采纳');
  }
  // 标记此条反馈信息已被采纳
  await Feedback.findByIdAndUpdate({ _id }, { taked: true });
  // 给提交此条反馈信息的用户发送积分
  const taskType = 'Feedback';
  await scoreLogService.create(feedback.userId, taskType);
  return new ResData(null, false, '反馈信息已采纳');
}

export default { getList, create, getInfo, take };
