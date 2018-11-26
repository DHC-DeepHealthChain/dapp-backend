import ResData from '../../helpers/responseData';
import { getUserId } from '../../utils/jwtUtil';
import articleService from '../../services/jkbapp/article.service';

/**
 * 获取文章列表
 * @param {*} req
 * @param {*} res
 */
async function list(req, res) {
  const { pageSize = 20, page = 0, passType } = req.query;
  const result = await articleService.list(pageSize, page, passType);
  return res.json(new ResData(result, false, null));
}

/**
 * 添加新文章
 * @param {*} req
 * @param {*} res
 */
async function create(req, res) {
  // 定义ipfs中存储的数据
  const userid = getUserId(req, res);
  const body = {
    name: req.body.name,
    releaseTime: req.body.releaseTime,
    releaseMan: req.body.releaseMan,
    readNum: req.body.readNum,
    listImg: req.body.listImg,
    content: req.body.content,
    comeFrom: req.body.comeFrom,
    summary: req.body.summary,
  };
  const result = await articleService.create(userid, body);
  res.json(new ResData(null, false, result));
}

/**
 * 删除文章
 * @param {*} req
 * @param {*} res
 */
async function remove(req, res) {
  const _id = req.params.articleId;
  const result = await articleService.remove(_id);
  res.json(new ResData(null, false, result));
}

/**
 * 根据文章id获取文章详情(无需用户登录)
 * @param {*} req
 * @param {*} res
 */
async function infoNoUser(req, res) {
  const articleId = req.params.articleId;
  const resultBody = await articleService.infoNoUser(articleId);
  if (resultBody.error) {
    return res.json(new ResData(null, true, resultBody.message));
  }
  return res.json(new ResData(resultBody.result, false, null));
}

/**
 * 根据文章id获取文章详情
 * @param {*} req
 * @param {*} res
 */
async function info(req, res) {
  const userId = getUserId(req, res);
  const articleId = req.params.articleId;
  const resultBody = await articleService.info(userId, articleId);
  return res.json(resultBody);
}

/**
 * 分享文章
 * @param {*} req
 * @param {*} res
 */
async function share(req, res) {
  const userId = getUserId(req, res);
  const articleId = req.params.articleId;
  const result = await articleService.share(userId, articleId);
  return res.json(new ResData(null, false, result));
}

/**
 * 审核文章
 * @param {*} req
 * @param {*} res
 */
async function pass(req, res) {
  const articleIds = req.body.articleIds;
  const passType = req.body.pass;
  const result = await articleService.pass(articleIds, passType);
  return res.json(new ResData(null, false, result));
}

export default ({ list, create, info, infoNoUser, remove, share, pass });
