import Task from '../../models/jkbapp/task.model';
import { addContent, getContent } from '../../utils/ipfsFile';
import { getContentsByHash } from '../../utils/ipfsList';
import ResData from '../../helpers/responseData';
import scoreLogService from './scorelog.service';

const getIpfsContent = async hash => await getContent(hash);

/**
 * 根据任务列表
 */
async function getList(pageSize, page) {
  let tasks = await Task.list();
  if (tasks) {
    tasks = await getContentsByHash(tasks);
  }
  // 计算总数
  const total = await Task.countAll();
  // 组装分页结果
  const pagination = { pageSize: parseInt(pageSize, 10), current: parseInt(page, 10), total: parseInt(total, 10) }; // eslint-disable-line
  // 下次app发版是解开
  // const result = { list: tasks, pagination };
  return tasks;
}

/**
 * 获取任务详情
 * @param {*} taskId
 */
async function getInfo(taskId) {
  const task = await Task.get(taskId);
  if (task) {
    task.content = await getIpfsContent(task.ipfsHash);
  }
  return task;
}

/**
 * 添加新任务
 * @param {*} userid
 * @param {*} contentT
 * @param {*} taskTypeT
 * @param {*} scoreT
 */
async function create(userid, contentT, taskTypeT, scoreT) {
  // 定义ipfs中存储的数据
  const ipfsData = {
    userId: userid,
    content: contentT,
    taskType: taskTypeT,
    score: scoreT,
  };
  // 上传到IPFS
  const hash = await addContent(ipfsData);
  // 定义mongo存储的数据
  const task = new Task({
    ipfsHash: hash,
    userId: userid,
    taskType: taskTypeT,
    score: scoreT,
  });
  // 保存数据库
  await Task.create(task);
  // 上传到合约 代做
  return '添加成功';
}

/**
 * 根据任务类型获取任务积分
 * @param {*} taskType
 */
async function getScoreByTaskType(taskType) {
  const tasks = await Task.fingByTaskType(taskType);
  if (tasks !== null && tasks.length > 0) {
    return tasks[0].score;
  }
  return 0;
}

/**
 * 提交关注微信公众号的任务.
 * @param {*} userIds
 */
async function taskForAttachWeChatPlatform(userIds) {
  for (const userId of userIds) {
    console.log(userId);
    // 保存积分日志.
    const taskType = 'AttachWeChatPlatform';
    await scoreLogService.create(userId, taskType);
  }
  return new ResData(null, false, '添加完成');
}

export default { getList, create, getInfo, getScoreByTaskType, taskForAttachWeChatPlatform };
