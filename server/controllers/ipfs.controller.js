import { addContent } from '../utils/ipfsFile';
import { encrypt } from '../utils/aes';
import Ipfs from '../models/ipfs.model';
import ResData from '../helpers/responseData';
import ipfsServie from '../services/ipfs.service';
import { getUserId } from '../utils/jwtUtil';
import scoreLogService from '../services/jkbapp/scorelog.service';

/**
 * Load ipfs and append to req.
 */
function load(req, res, next, id) {
  Ipfs.get(id)
    .then((ipfs) => {
      req.ipfs = ipfs; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * 获取用户上传的ipfs数据
 * @param {*} req
 * @param {*} res
 */
async function list(req, res) {
  const userId = getUserId(req, res);// 获取用户id
  const { pageSize = 50, page = 0 } = req.query;
  const fileType = req.query.fileType;
  const result = await ipfsServie.getList(userId, pageSize, page, fileType);
  return res.json(new ResData(result, false, null));
}

/**
 * 获取所有用户上传的ipfs数据
 * @param {*} req
 * @param {*} res
 */
async function allList(req, res) {
  const { pageSize = 50, page = 0 } = req.query;
  const fileType = req.query.fileType;
  const result = await ipfsServie.getAllList(pageSize, page, fileType);
  return res.json(new ResData(result, false, null));
}

/**
 * 添加影像文件
 * @param {*} req
 * @param {*} res
 */
async function createMedia(req, res) {
  const userid = getUserId(req, res);// 获取用户id
  const type = req.body.fileType;
  // 检测今日是否达到上传上限
  const flag = await ipfsServie.checkCreateMedia(userid, type);
  if (flag) {
    return res.json(new ResData(null, true, '今日已达到上传上限'));
  }
  // 添加积分日志
  const taskType = 'UploadMedia';
  await scoreLogService.create(userid, taskType);
  const hash = req.body.hash;
  const title = req.body.fileTitle;
  const result = await ipfsServie.createMedia(userid, hash, type, title);
  return res.json(new ResData(null, false, result));
}

/**
 * 根据ipfsHash获取base64图片
 * @param {*} req
 * @param {*} res
 */
async function getImgByIpfsHash(req, res) {
  if (req.params.IpfsHash === null) {
    return res.json(new ResData(null, true, 'ipfs地址不能为空'));
  }
  const ipfsHash = req.params.IpfsHash;
  const result = await ipfsServie.getImgByIpfsHash(ipfsHash);
  return res.json(new ResData(result, false, null));
}

/**
 * 接收文件,加密上传到ipfs
 */
function uploadFile(req, res, next) {
  const { buffer } = req.file;
  addContent(buffer, true)
    .then(hash => res.json(
      new ResData({
        documentHash: hash,
        fileName: req.file.originalname,
        fileType: req.file.mimetype
      })
    ))
    .catch(e => next(e));
}

/**
 * 接收表单内容，加密上传到ipfs
 */
function uploadContent(req, res, next) {
  const encryptBuffer = encrypt(Buffer.from(JSON.stringify(req.body)));
  addContent(encryptBuffer)
    .then((hash) => {
      res.json(new ResData({}, false, hash));
    })
    .catch(e => next(e));
}

export default { load, list, allList, getImgByIpfsHash, createMedia, uploadFile, uploadContent };
