import jwt from 'jsonwebtoken';
import sha1 from 'sha1';
import User from '../models/user.model';
import ResData from '../helpers/responseData';
import config from '../../config/config';

/**
 * 正常登陆
 * @param {*} body
 */
async function loginMethod(body) {
  const user = await User.getByName(body.mobileNumber);
  if (!user) {
    return new ResData(null, true, '用户名不存在！');
  }
    if (body.mobileNumber === user.mobileNumber && sha1(body.password) === user.password) { // eslint-disable-line
      const token = jwt.sign({
        userId: user._id,
        address: user.publicKey,
        username: user.username,
        money: user.score,
      }, config.jwtSecret);

      const result = {
        token,
        address: user.publicKey,
        mobileNumber: user.mobileNumber,
        userId: user._id,
        money: user.score,
      };
      return new ResData(result, false, null);
    }
  return new ResData(null, true, '用户名或密码不正确');
}

/**
 * 微信登录
 */
async function loginWeixin(body) {
  const moneyT = web3.fromWei(web3.eth.getBalance(body.publicKey));// eslint-disable-line
  const money = parseInt(moneyT, 10);
  const token = jwt.sign({
    userId: body._id,
    address: body.publicKey,
    username: body.username,
    money,
  }, config.jwtSecret);
  const result = {
    token,
    address: body.publicKey,
    mobileNumber: body.mobileNumber,
    userId: body._id,
    money,
  };
  return new ResData(result, false, null);
}
export default { loginMethod, loginWeixin };
