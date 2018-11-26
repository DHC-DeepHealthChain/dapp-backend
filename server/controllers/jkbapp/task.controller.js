import ResData from '../../helpers/responseData';
import { getUserId } from '../../utils/jwtUtil';
import taskService from '../../services/jkbapp/task.service';

/**
 * 根据任务列表
 * @param {*} req
 * @param {*} res
 */
async function getList(req, res) {
  const { pageSize = 20, page = 0 } = req.query;
  const result = await taskService.getList(pageSize, page);
  res.json(new ResData(result, false, null));
}

/**
 * 获取任务详情
 * @param {*} req
 * @param {*} res
 */
async function getInfo(req, res) {
  const taskId = req.params.taskId;
  const result = await taskService.getInfo(taskId);
  res.json(new ResData(result, false, null));
}

/**
 * 添加新任务
 * @param {*} req
 * @param {*} res
 */
async function create(req, res) {
  // 定义ipfs中存储的数据
  const userid = getUserId(req, res);
  const contentT = req.body.content;
  const taskTypeT = req.body.taskType;
  const scoreT = req.body.score;
  const result = await taskService.create(userid, contentT, taskTypeT, scoreT);
  res.json(new ResData(null, false, result));
}

/**
 * 提交关注微信公众号的任务
 * @param {*} req
 * @param {*} res
 */
async function taskForAttachWeChatPlatform(req, res) {
  // 定义ipfs中存储的数据
  const userIds = req.body.userIds;
  const result = await taskService.taskForAttachWeChatPlatform(userIds);
  res.json(result);
}

export default { getList, create, getInfo, taskForAttachWeChatPlatform };
