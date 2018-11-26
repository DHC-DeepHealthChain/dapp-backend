import ResData from '../../helpers/responseData';
import { getUserId } from '../../utils/jwtUtil';
import messageService from '../../services/jkbapp/message.service';

/**
 * 获取所有消息
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getList(req, res) {
  const { pageSize = 20, page = 0 } = req.query;
  const userId = getUserId(req, res);
  const result = await messageService.getList(userId, pageSize, page);
  return res.json(new ResData(result, false, null));
}

/**
 * 添加一个消息
 * @param {*} res
 * @param {*} req
 */
async function create(req, res) {
  const userid = req.body.userId;
  const type = req.body.messageType;
  const contentT = req.body.content;
  const otherIdT = req.body.otherId;
  const result = await messageService.create(userid, type, contentT, otherIdT);
  return res.json(new ResData(null, false, result));
}

/**
 * 设置消息已读
 * @param {*} res
 * @param {*} req
 */
async function read(req, res) {
  const messageId = req.params.messageId;
  const result = await messageService.read(messageId);
  return res.json(new ResData(null, false, result));
}

export default { getList, create, read };
