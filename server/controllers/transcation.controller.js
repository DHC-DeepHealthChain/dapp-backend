import { isValidAddress } from 'ethereumjs-util';
import Transcation from '../models/transcation.model';
import ResData from '../helpers/responseData';
import { getUser, getUserId } from '../utils/jwtUtil';
import User from '../models/user.model';
import transcationService from '../services/transaction.service';

/**
 * Load transcation and append to req.
 */
function load(req, res, next, id) {
  Transcation.get(id)
    .then((transcation) => {
      req.transcation = transcation; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

// function getNameByJwt(req){
//   var authorization = req.headers.authorization,
//   decoded;
//   try {
//   decoded = jwt.verify(authorization, config.jwtSecret );
//   } catch(e){
//     console.log(e);
//   }
//   console.log(decoded);
//   var transcationName = decoded.transcationname;
//   return transcationName;
// }

/**
 * 添加交易
 * @param {*} req
 * @param {*} res
 */
async function createTransaction(req, res) {
  // 接收参数
  const userId = getUserId(req, res);
  const user = await User.get(userId);
  const from = user.publicKey;
  const privateKey = user.privateKey;
  const to = req.body.to;
  const price = req.body.price;
  if (!isValidAddress(to)) {
    return res.json(new ResData(null, true, '转账地址不合法'));
  }
  const resultBody = await transcationService.createTransaction(from, privateKey, to, price);
  if (resultBody !== null && resultBody.error === true) {
    return res.json(new ResData(null, true, resultBody.message));
  }
  return res.json(new ResData(resultBody.result, false, null));
}

/**
 * 获取交易列表
 * @param {*} req
 * @param {*} res
 */
async function list(req, res) {
  const { pageSize = 20, page = 0 } = req.query;
  let publicKey = '';
  if (req.query.publicKey || req.query.mobileNumber) {
    if (req.query.publicKey) {
      publicKey = req.query.publicKey;
    } else if (req.query.mobileNumber) {
      const mobileNumber = req.query.mobileNumber;
      const user = await User.findByMobile(mobileNumber);
      if (user === null) {
        return res.json(new ResData({ list: null }, false, null));
      }
      publicKey = user.publicKey;
    }
  }
  const result = await transcationService.list(pageSize, page, publicKey);
  return res.json(new ResData(result, false, null));
}

/**
 * Get my transcation list.
 * @param {*} req
 * @param {*} res
 */
async function myList(req, res) {
  const { pageSize = 20, page = 0 } = req.query;
  let { token } = req.query;
  if (!token) {
    const user = getUser(req, res);
    token = user.address;
  }
  const result = await transcationService.list(pageSize, page, token);
  return res.json(new ResData(result, false, null));
}

export default { load, list, createTransaction, myList };
