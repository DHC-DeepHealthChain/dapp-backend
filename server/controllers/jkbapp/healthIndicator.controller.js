import ResData from '../../helpers/responseData';
import { getUserId } from '../../utils/jwtUtil';
import healthIndicatorService from '../../services/jkbapp/healthIndicator.service';

/**
 * 获取用户指标项的最后一条记录
 * @param {*} req
 * @param {*} res
 */
async function getlastList(req, res) {
  const userId = getUserId(req, res);
  const result = await healthIndicatorService.getlastList(userId);
  return res.json(new ResData(result, false, null));
}

/**
 * 根据类型获取健康指标项集合
 * @param {*} req
 * @param {*} res
 */
async function getList(req, res) {
  const userId = getUserId(req, res);// 获取用户id
  const { pageSize = 20, page = 0, healthType } = req.query;
  const result = await healthIndicatorService.getList(userId, pageSize, page, healthType);
  return res.json(new ResData(result, false, null));
}

/**
 * 创建健康指标
 * @param {*} req
 * @param {*} res
 */
async function create(req, res) {
  const htype = req.body.healthType;// 获取上传健康指标 类型
  const userid = getUserId(req, res);// 获取用户id
  const body = req.body.content;// 指标项内容
  const resultBody = await healthIndicatorService.create(htype, userid, body);
  return res.json(new ResData(null, resultBody.error, resultBody.message));
}

/**
 * 删除健康指标
 * @param {*} req
 * @param {*} res
 */
async function remove(req, res) {
  const healthIndicatorId = req.params.healthIndicatorId;// 指标项 id
  const result = await healthIndicatorService.remove(healthIndicatorId);
  return res.json(new ResData(null, false, result));
}

/** 二期 ************************************/

/**
 * 添加步数
 * @param {*} req
 * @param {*} res
 */
async function createStep(req, res) {
  const userid = getUserId(req, res);// 获取用户id
  const step = req.body.step;// 指标项内容
  const resultBody = await healthIndicatorService.createStep('step', userid, step);
  return res.json(resultBody);
}

export default { getlastList, getList, create, createStep, remove };
