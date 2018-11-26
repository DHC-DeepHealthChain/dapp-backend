import { getContent } from '../utils/ipfsFile';
import Ipfs from '../models/ipfs.model';
// import { getContentsByHash } from '../utils/ipfsList';
import DateUtil from '../utils/dateUtil';

/**
 * 添加影像文件
 * @param {*} userid
 * @param {*} hash
 * @param {*} type
 * @param {*} title
 */
async function createMedia(userid, hash, type, title) {
  const ipfs = new Ipfs({
    userId: userid,
    ipfsHash: hash,
    fileType: type,
    fileTitle: title,
  });
  await ipfs.save();
  return '添加成功';
}

/**
 * 根据ipfsHash获取base64图片
 * @param {*} req
 * @param {*} res
 */
async function getImgByIpfsHash(ipfsHash) {
  const trueImg = await getContent(ipfsHash, 'noString');
  const listImg = trueImg.toString('base64'); // eslint-disable-line no-param-reassign
  return listImg;
}

/**
 * 获取用户上传的ipfs数据
 * @param {*} userId
 * @param {*} pageSize
 * @param {*} page
 * @param {*} fileType
 */
async function getList(userId, pageSize, page, fileType) {
  const ipfss = await Ipfs.findByUserIdAndFileType(userId, pageSize, page, fileType);
  const total = await Ipfs.countByUserIdAndFileType(userId, fileType);
  const pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
  const result = { list: ipfss, pagination };
  // if (ipfss !== null) {
  //   ipfss = await getContentsByHash(ipfss);
  // }
  return result;
}

/**
 * 获取所有用户上传的ipfs数据
 * @param {*} pageSize
 * @param {*} page
 * @param {*} fileType
 */
async function getAllList(pageSize, page, fileType) {
  const ipfss = await Ipfs.findByFileType(pageSize, page, fileType);
  const total = await Ipfs.countByFileType(fileType);
  const pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
  const result = { list: ipfss, pagination };
  // if (ipfss !== null) {
  //   ipfss = await getContentsByHash(ipfss);
  // }
  return result;
}

/**
 * 检测今日是否达到上传上限
 * @param {*} req
 * @param {*} res
 */
async function checkCreateMedia(userid, type) {
  const todayStartDate = DateUtil.getDayStartDate(); // 获取今日开始时间
  return await Ipfs.checkCreateMedia(userid, type, todayStartDate);
}

export default { getImgByIpfsHash, createMedia, getList, getAllList, checkCreateMedia };
