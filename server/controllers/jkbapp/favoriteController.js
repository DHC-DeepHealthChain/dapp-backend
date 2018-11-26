import ResData from '../../helpers/responseData';
import { getUserId } from '../../utils/jwtUtil';
import favoriteService from '../../services/jkbapp/favorite.service';

/**
 * 根据类型获取收藏列表
 * @param {*} req
 * @param {*} res
 */
async function getListByUserId(req, res) {
  const { pageSize = 20, page = 0, favoriteType } = req.query;
  const userId = getUserId(req, res);
  const result = await favoriteService.getListByUserId(userId, pageSize, page, favoriteType);
  res.json(new ResData(result, false, null));
}

/**
 * 添加一个收藏记录
 * @param {*} req
 * @param {*} res
 */
async function create(req, res) {
  const userid = getUserId(req, res);
  const otherid = req.params.favoriteId;
  const favoriteTypeT = req.body.favoriteType;
  const result = await favoriteService.create(userid, otherid, favoriteTypeT);
  res.json(new ResData(result, false, null));
}

/**
 * 取消收藏
 * @param {*} req
 * @param {*} res
 */
async function remove(req, res) {
  const userId = getUserId(req, res);
  const otherId = req.params.favoriteId;
  const result = await favoriteService.remove(userId, otherId);
  res.json(new ResData(result, false, null));
}

export default { getListByUserId, create, remove };
