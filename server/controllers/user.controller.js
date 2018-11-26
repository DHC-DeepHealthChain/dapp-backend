import sha1 from 'sha1';
import Web3 from 'web3';
import User from '../models/user.model';
import { getContent } from '../utils/ipfsFile';
import { sendCaptcha } from '../utils/sms';
import ResData from '../helpers/responseData';
import config from '../../config/config';
import Scorelog from '../models/jkbapp/scorelog.model';
import userService from '../services/user.service';
import { getUserId } from '../utils/jwtUtil';
import scoreLogService from '../services/jkbapp/scorelog.service';

let web3;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
}


/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.get(id)
    .then((user) => {
      req.user = user; // eslint-disable-line
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
async function list(req, res) {
  const { limit = 50, skip = 0 } = req.query;
  const inviteCode = await userService.list(limit, skip);
  return res.json(new ResData(inviteCode, false, null));
}

/**
 * Get user
 * @returns {User}
 */
async function get(req, res) {
  if (req.user.headImg) {
    const imgBuffer = await getContent(req.user.headImg, 'noString');
    req.user.headImg = imgBuffer.toString('base64');// eslint-disable-line no-param-reassign
  }
  return res.json(new ResData(req.user));
}

/**
 * 创建用户
 * @param {*} req
 * @param {*} res
 */
async function create(req, res) {
  const body = req.body;
  const result = await userService.create(body);
  return res.json(result);
}

/**
 * 更新用户信息
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
async function update(req, res) {
  const type = req.body.type;
  const user = req.user;
  let updateParam = {};
  switch (type) {
    case 'headImg':
      updateParam = { headImg: req.body.headImg };
      break;
    case 'nickname':
      updateParam = { nickname: req.body.nickname };
      break;
    case 'realname':
      updateParam = { realname: req.body.realname };
      break;
    case 'introduce':
      updateParam = { introduce: req.body.introduce };
      break;
    case 'kkCoinAddress':
      updateParam = { kkCoinAddress: req.body.kkCoinAddress };
      break;
    default:
  }
  User.findOneAndUpdate({ _id: user._id }, { $set: updateParam }, { new: true }, async (err, newUser) => { // eslint-disable-line
    if (err) {
      return res.json(new ResData(null, true, '修改失败'));
    }
    if (newUser.headImg && newUser.nickname && newUser.realname && newUser.introduce && newUser.kkCoinAddress) { // eslint-disable-line
      const taskType = 'ComplateUserInfo';
      // 判断是否已完成此任务
      const flag = await Scorelog.checkExist(user._id, taskType);
      if (!flag) {
        // 添加积分日志
        await scoreLogService.create(user._id, taskType);
      }
    }
    return res.json(new ResData(null, false, '修改成功'));
  });
}

/**
 * 重置密码
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
async function resetPassword(req, res) {
  const { mobileNumber, password } = req.body;
  // 校验账号是否已经注册
  const user = await User.getByName(mobileNumber);
  if (!user) {
    return res.json(new ResData(null, true, '用户不存在'));
  }

  User.findOneAndUpdate({ mobileNumber },
    { $set: { password: sha1(password) } }, (err) => {
      if (err) {
        return res.json(new ResData(null, true, '修改失败'));
      }
      return res.json(new ResData(null, false, '修改成功'));
    });

  return null;
}

/**
 * 删除用户
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(() => res.json(new ResData({}, false, '删除成功')))
    .catch(e => next(e));
}

/**
 * 获取验证码
 * @param {*} req
 * @param {*} res
 */
async function sendCaptchaByMobile(req, res) {
  const { mobileNumber } = req.params;
  const { type } = req.query;
  const user = await User.getByName(mobileNumber);
  if (type === 'register' && user) {
    return res.json(new ResData(null, true, '该手机号已经注册。'));
  }
  if (type === 'reset' && !user) {
    return res.json(new ResData(null, true, '该手机号还未注册。'));
  }
  const captcha = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  if (mobileNumber) {
    sendCaptcha(mobileNumber, captcha).then((result) => {
      if (result) {
        res.json(new ResData(captcha, false, '发送验证码成功'));
      } else {
        res.json(new ResData(null, true, '发送验证码失败，请重新发送'));
      }
    });
  } else {
    res.json(new ResData(null, true, '手机号没有填写'));
  }
  return null;
}

/**
 * 获取用户邀请码
 * @param {*} req
 * @param {*} res
 */
async function getInviteCode(req, res) {
  const userId = await getUserId(req, res); // 获取用户
  const inviteCodeBody = await userService.getInviteCode(userId);
  if (inviteCodeBody.error) {
    return res.json(new ResData(null, true, inviteCodeBody.message));
  }
  const result = { inviteCode: inviteCodeBody.result, useNum: config.inviteCodeValidCount, appPath: config.appPath };// eslint-disable-line
  return res.json(new ResData(result, false, null));
}

/**
 * 验证邀请码
 * @param {*} inviteCode
 */
async function checkInviteCode(req, res) {
  const inviteCode = req.body.inviteCode;
  const result = await userService.checkInviteCode(inviteCode);
  return res.json(result);
}

export default {
  load,
  get,
  create,
  update,
  list,
  remove,
  getInviteCode,
  sendCaptchaByMobile,
  resetPassword,
  checkInviteCode
};
