import Favorite from '../../models/jkbapp/favorite.model';
import Article from '../../models/jkbapp/article.model';
import { addContent, getContent } from '../../utils/ipfsFile';
import { getContentsByHash } from '../../utils/ipfsList';

/**
 * 根据类型获取收藏列表
 * @param {*} userId
 * @param {*} pageSize
 * @param {*} page
 * @param {*} favoriteType
 */
async function getListByUserId(userId, pageSize, page, favoriteType) {
  // 计算总数
  const total = await Favorite.countByFavoriteType();
  // 获取收藏列表
  let favorites = await Favorite.list({ pageSize, page, userId, favoriteType });
  if (favorites !== null) {
    favorites = await getContentsByHash(favorites);
  }
  const list = favorites.map(async (item) => {
    const content = JSON.parse(item.content);
    const article = await Article.get(content.otherId);
    item.name = article.name; // eslint-disable-line
    const trueImg = await getContent(article.listImg, 'noString');
    item.listImg = trueImg.toString('base64'); // eslint-disable-line
    item.readNum = article.readNum; // eslint-disable-line
    item.summary = article.summary; // eslint-disable-line
    const text = await getContent(article.ipfsHash);
    item.text = JSON.parse(text).content; // eslint-disable-line
    return item;
  });

  // 组装分页结果
  const pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
  // 下次app发版是解开
  // const result = { list: await Promise.all(list), pagination };
  return await Promise.all(list);
}

/**
 * 添加一个收藏记录
 * @param {*} userid
 * @param {*} otherid
 * @param {*} favoriteTypeT
 */
async function create(userid, otherid, favoriteTypeT) {
  // 检测是否已收藏
  const favorites = await Favorite.getByUserIdAndArticleId(userid, otherid);
  if (favorites !== null && favorites.length > 0) {
    return '添加成功';
  }
  // 定义ipfs中存储的数据
  const ipfsData = {
    userId: userid,
    favoriteType: favoriteTypeT,
    otherId: otherid,
  };
  // 上传到IPFS
  const hash = await addContent(ipfsData);
  // 定义mongo存储的数据
  const favorite = new Favorite({
    ipfsHash: hash,
    userId: userid,
    favoriteType: favoriteTypeT,
    otherId: otherid,
  });
  // 保存数据库
  await Favorite.create(favorite);
  // 上传到合约 代做
  return '添加成功';
}

/**
 * 取消收藏
 * @param {*} req
 * @param {*} res
 */
async function remove(userId, otherId) {
  const favorites = await Favorite.getByUserIdAndArticleId(userId, otherId);
  favorites.map(async (item) => {
    await Favorite.remove(item);
  });
  return '取消成功';
}

export default { getListByUserId, create, remove };
