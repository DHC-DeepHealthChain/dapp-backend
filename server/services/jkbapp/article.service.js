import Article from '../../models/jkbapp/article.model';
import Favorite from '../../models/jkbapp/favorite.model';
import { addContent, getContent } from '../../utils/ipfsFile';
import { getContentsByHash, getListImgByHash } from '../../utils/ipfsList';
import ResData from '../../helpers/responseData';
import Scorelog from '../../models/jkbapp/scorelog.model';
import ArticleLog from '../../models/jkbapp/articleLog.model';
import DateUtil from '../../utils/dateUtil';
import scoreLogService from './scorelog.service';

const getIpfsContent = async hash => await getContent(hash);

/**
 * 获取文章列表
 * @param {*} pageSize
 * @param {*} page
 */
async function list(pageSize, page, passType) {
  // 计算总数
  const total = await Article.countAll(passType);
  // 根据分页条件获取文章列表
  let articles = await Article.list(pageSize, page, passType);
  if (articles !== null) {
    // 获取ipfs数据
    articles = await getContentsByHash(articles);
    // 获取base64图片内容
    articles = await getListImgByHash(articles);
  }
  // 组装分页结果
  const pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
  // 下次app发版是解开
  const result = { list: articles, pagination };
  return result;
}

/**
 * 添加新文章
 * @param {*} userid
 * @param {*} body
 */
async function create(userid, body) {
  // 定义ipfs中存储的数据
  const ipfsData = {
    userId: userid,
    name: body.name,
    releaseTime: body.releaseTime,
    releaseMan: body.releaseMan,
    readNum: body.readNum,
    listImg: body.listImg,
    content: body.content,
    comeFrom: body.comeFrom,
    summary: body.summary,
  };
  // 上传到IPFS
  const hash = await addContent(ipfsData);
  // 定义mongo存储的数据
  const article = new Article({
    ipfsHash: hash,
    userId: userid,
    name: body.name,
    releaseTime: body.releaseTime,
    releaseMan: body.releaseMan,
    readNum: body.readNum,
    listImg: body.listImg,
    comeFrom: body.comeFrom,
    summary: body.summary,
  });
  // 保存数据库
  await Article.create(article);
  // 上传到合约 代做
  return '添加成功';
}

/**
 * 删除文章
 * @param {*} _id
 */
async function remove(_id) {
  await Article.findOneAndUpdate({ _id }, { delete: true });
  return '删除成功';
}

/**
 * 根据文章id获取文章详情（无需用户登录）
 * @param {*} articleId
 */
async function infoNoUser(articleId) {
  const article = await Article.get(articleId);
  // 获取ipfs数据
  const content = await getIpfsContent(article.ipfsHash);
  article.content = content;

  // 增加readNum次数
  const _id = article._id;
  const readNumT = parseInt(article.readNum, 10) + 1;
  const ipfsData = {
    userId: article.userId,
    name: article.name,
    releaseTime: article.releaseTime,
    releaseMan: article.releaseMan,
    readNum: readNumT,
    listImg: article.listImg,
    content: JSON.parse(article.content).content,
    comeFrom: article.comeFrom,
  };
  // 上传到IPFS
  const hash = await addContent(ipfsData);
  await Article.findOneAndUpdate({ _id }, { readNum: readNumT, ipfsHash: hash });

  // 获取真实图片地址
  const trueImg = await getContent(article.listImg, 'noString');
  article.listImg = trueImg.toString('base64');
  return new ResData(article, false, null);
}

/**
 * 根据文章id获取文章详情
 * @param {*} userId
 * @param {*} articleId
 */
async function info(userId, articleId) {
  const article = await Article.get(articleId);
  // 获取ipfs数据
  const content = await getIpfsContent(article.ipfsHash);
  article.content = content;
  // 检测是否收藏
  let isFavorite = false;
  const favorites = await Favorite.getByUserIdAndArticleId(userId, articleId);
  if (favorites != null && favorites.length > 0 && favorites[0].delete === false) {
    isFavorite = true;
  }
  article.isFavorite = isFavorite;
  // 增加readNum次数
  const _id = article._id;
  const readNumT = parseInt(article.readNum, 10) + 1;
  const ipfsData = {
    userId: article.userId,
    name: article.name,
    releaseTime: article.releaseTime,
    releaseMan: article.releaseMan,
    readNum: readNumT,
    listImg: article.listImg,
    content: JSON.parse(article.content).content,
    comeFrom: article.comeFrom,
  };
  // 上传到IPFS
  const hash = await addContent(ipfsData);
  // 更新文章
  await Article.findOneAndUpdate({ _id }, { readNum: readNumT, ipfsHash: hash });
  // 获取真实图片地址
  if (article.listImg && article.listImg.indexOf('http') < 0) {
    const trueImg = await getContent(article.listImg, 'noString');
    article.listImg = trueImg.toString('base64');
  }


  // 添加阅读日志
  await addArticleLog(userId, articleId, 'ReadArticle');
  return new ResData(article, false, null);
}

/**
 * 分享文章
 * @param {*} userId
 * @param {*} articleId
 */
async function share(userId, articleId) {
  await addArticleLog(userId, articleId, 'ShareArticle');
  return '分享成功';
}

/**
 * 审核文章
 * @param {*} req
 * @param {*} res
 */
async function pass(articleIds, passType) {
  articleIds.map(async (item) => {
    await Article.findByIdAndUpdate({ _id: item }, { pass: passType });
  });
  return new ResData(null, false, '设置成功');
}

/** 内部方法开始 ****************************/
/**
 * 添加阅读\分享日志
 */
async function addArticleLog(userId, articleId, taskType) {
  // 根据类型判断是否已添加过相应操作
  const articleLog = await ArticleLog.existByUserIdAndArticleIdAndType(userId, articleId, taskType);// eslint-disable-line
  // existFlag 为 true 表示已分享过，false表示未分享过

  // 判断今日是否达到分享上线
  // 获取今日开始时间
  const todayStartDate = DateUtil.getDayStartDate();
  // todayFlag 为 true 表示已达到上限，false表示未分达到上限，可加积分
  let todayFlag;
  switch (taskType) {
    case 'ReadArticle': {
      todayFlag = await Scorelog.readableByUserIdAndTaskTypeAndDate(userId, taskType, todayStartDate);// eslint-disable-line
      break;
    }
    case 'ShareArticle': {
      todayFlag = await Scorelog.shareableByUserIdAndTaskTypeAndDate(userId, taskType, todayStartDate);// eslint-disable-line
      break;
    }
    default: {
      todayFlag = true;
      break;
    }
  }
  if (articleLog === null && !todayFlag) {
    // 添加操作记录
    // 定义ipfs中存储的数据
    const ipfsDataArticleLog = {
      userId,
      articleId,
      type: taskType,
    };
    // 上传到IPFS
    const hashArticleLog = await addContent(ipfsDataArticleLog);
    // 添加分享日志
    const newArticleLog = {
      ipfsHash: hashArticleLog,
      userId,
      articleId,
      type: taskType,
    };
    await ArticleLog.create(newArticleLog);
    // 保存任务日志
    await scoreLogService.create(userId, taskType);
  }
}
/** 内部方法结束 ****************************/


export default ({ list, create, info, infoNoUser, remove, share, pass });
