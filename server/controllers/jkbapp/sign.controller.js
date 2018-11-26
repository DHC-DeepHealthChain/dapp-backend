import ResData from '../../helpers/responseData';
import { getUserId } from '../../utils/jwtUtil';
import signService from '../../services/jkbapp/sign.service';
/**
 * 获取签到列表
 * 只回去本周签到记录
 * @param {*} req
 * @param {*} res
 */
async function getList(req, res) {
  const userId = getUserId(req, res);
  const { pageSize = 20, page = 0 } = req.query;
  const result = await signService.getList(userId, pageSize, page);
  return res.json(new ResData(result, false, null));
}

/**
 * 签到
 * @param {*} req
 * @param {*} res
 */
async function create(req, res) {
  const userid = getUserId(req, res);
  const result = await signService.create(userid);
  if (result.error) {
    return res.json(new ResData(null, true, result.message));
  }
  return res.json(new ResData(null, false, result.message));
}

/**
 * 获取签到状态
 * @param {*} req
 * @param {*} res
 */
async function getSignState(req, res) {
  const userId = getUserId(req, res);
  const reslut = await signService.getSignState(userId);
  return res.json(new ResData(reslut, false, null));
}

export default { getList, create, getSignState };
