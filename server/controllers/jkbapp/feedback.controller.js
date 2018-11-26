import ResData from '../../helpers/responseData';
import { getUserId } from '../../utils/jwtUtil';
import feedbackService from '../../services/jkbapp/feedback.service';

/**
 * 获取意见反馈列表
 * @param {*} req
 * @param {*} res
 */
async function getList(req, res) {
  const { pageSize = 20, page = 0 } = req.query;
  const result = await feedbackService.getList(pageSize, page);
  res.json(new ResData(result, false, null));
}

/**
 * 获取意见反馈详情
 * @param {*} req
 * @param {*} res
 */
async function getInfo(req, res) {
  const _id = req.params.feedbackId;
  const result = await feedbackService.getInfo(_id);
  res.json(new ResData(result, false, null));
}

/**
 * 添加新意见反馈
 * @param {*} req
 * @param {*} res
 */
async function create(req, res) {
  const userid = getUserId(req, res);
  const content = req.body.content;
  const result = await feedbackService.create(userid, content);
  res.json(new ResData(null, false, result));
}

/**
 * 采纳 意见反馈
 * @param {*} req
 * @param {*} res
 */
async function take(req, res) {
  const _id = req.params.feedbackId;
  const result = await feedbackService.take(_id);
  res.json(new ResData(null, result.error, result.message));
}

export default { getList, create, getInfo, take };
