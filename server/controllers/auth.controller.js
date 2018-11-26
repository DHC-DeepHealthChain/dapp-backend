import Web3 from 'web3';
import ResData from '../helpers/responseData';
import config from '../../config/config';
// import { authorize, userInfo } from '../aouth/weixin';
// import userService from '../services/user.service';
import authService from '../services/auth.service';
import User from '../models/user.model';

let web3;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
}

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function login(req, res) {
  const body = req.body;
  const result = await authService.loginMethod(body);
  return res.json(result);
}

/**
 *  第三方登录
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function thirdLogin(req, res) {
  const openid = req.body.openid;
  // const authInfo = await authorize(code);
  // if (!authInfo) {
  //   return res.json(new ResData(null, true, '授权失败，请重新授权'));
  // }
  // 根据openId查询是否有该账号
  const user = await User.findByOpenId(openid);
  if (user === null) {
    return res.json(new ResData(null, true, '该微信号尚未绑定手机号，请绑定手机号后登录！'));
    // // 创建新的用户
    // const createBody = {
    //   openid,
    //   username: req.body.screen_name,
    //   password: openid,
    //   sex: req.body.gender,
    // };
    // const result = await userService.createWeiXinUser(createBody);
    // if (result.error) {
    //   return res.json(result);
    // }
    // user = result.result;
  }
  // 登录用户
  const loginBody = { _id: user._id, openid, name: user.username, publicKey: user.publicKey };
  const resultBody = await authService.loginWeixin(loginBody);
  if (resultBody.error) {
    return res.json(new ResData(null, false, resultBody.message));
  }
  return res.json(new ResData(resultBody.result, false, null));
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  const moneyT = web3.fromWei(web3.eth.getBalance(req.user.address), 'ether');// eslint-disable-line
  const money = parseInt(moneyT, 10);
  req.user.money = money; // eslint-disable-line
  return res.json(new ResData({
    user: req.user,
    num: Math.random() * 100,
  }));
}

/**
 * 关联微信账户
 */
async function associatedWeixinAccount(req, res) {
  const mobile = req.body.mobile;
  const openid = req.body.openid;
  const user = await User.findByMobile(mobile);
  if (user) {
    const user2 = await User.findByOpenId(openid);
    if (user2 && user.mobileNumber !== user2.mobileNumber) {
      return res.json(new ResData(null, true, '此微信号已绑定过账户'));
    }
    // 进行账户关联
    await User.findByIdAndUpdate({ _id: user._id }, { openId: openid });
    return res.json(new ResData(null, false, '关联成功'));
  }
  return res.json(new ResData(null, true, '账户不存在'));
}

export default { login, getRandomNumber, thirdLogin, associatedWeixinAccount };
