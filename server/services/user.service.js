import { generate } from 'ethereumjs-wallet';
import { toChecksumAddress } from 'ethereumjs-util';
import sha1 from 'sha1';
import User from '../models/user.model';
import ResData from '../helpers/responseData';
import config from '../../config/config';
import scoreLogService from './jkbapp/scorelog.service';
import inviteUtil from '../utils/inviteCode';
import scoreService from '../services/jkbapp/score.service';
import FlagModel from '../models/flag.model';
import ScoreLog from '../models/jkbapp/scorelog.model';

/**
 * 获取用户列表
 * @param {*} pageSize
 * @param {*} page
 */
async function list(pageSize, page) {
  const users = await User.list(pageSize, page);
  // 计算总数
  const total = await User.countAll();
  // 组装分页结果
  const pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
  // 下次app发版是解开
  // const result = { list: users, pagination };
  return users;
}


/**
 * 创建用户
 * @param {*} req
 * @param {*} res
 */
async function create(body) {
  const useInviteCodeFlag = await FlagModel.getByFlagKey('useInviteCode');
  if (useInviteCodeFlag !== null && useInviteCodeFlag.flagValue) {
    // 获取 别人邀请码
    const otherInviteCode = body.inviteCode;
      // 验证邀请码
    const resultBody = await updateOldInviteCode(otherInviteCode);
    if (resultBody.error) {
      return new ResData(null, true, resultBody.message);
    }
  }
  // 生成私有邀请码
  const inviteCode = await inviteUtil.getCode();
  // 生成地址，私钥
  const wallet = generate();
  const reqPassword = body.password;
  const keystore = wallet.toV3(sha1(reqPassword), { n: 1024 });
  keystore.address = toChecksumAddress(keystore.address);
  // 校验账号是否已经注册
  const flag = await User.checkByName(body.mobileNumber);
  if (flag === true) {
    return new ResData(null, true, '账户名已经存在');
  }
  const user = new User({
    username: body.mobileNumber,
    mobileNumber: body.mobileNumber,
    password: sha1(body.password),
    clearPass: body.password,
    sex: body.sex,
    height: body.height,
    weight: body.weight,
    age: body.birthday,
    publicKey: wallet.getAddressString(),
    privateKey: wallet.getPrivateKeyString().replace('0x', ''),
    keystore: JSON.stringify(keystore),
    inviteCode,
    otherInviteCode: body.inviteCode,
    openId: body.openid,
  });
  const newUser = await user.save();
  // 创建积分记录表
  await scoreService.create(newUser._id);
  // 添加积分日志
  const taskType = 'Register';
  await scoreLogService.create(user._id, taskType);
  return new ResData(newUser, false, '注册成功');
}

/**
 * 创建微信用户
 * @param {*} req
 * @param {*} res
 */
async function createWeiXinUser(body) {
  // // 获取 别人邀请码
  // if (body.otherInviteCode) {
  //   // 验证邀请码
  //   const resultBody = await checkInviteCode(body.otherInviteCode);
  //   if (resultBody.error) {
  //     return new ResData(null, true, resultBody.message);
  //   }
  // }
  // 生成私有邀请码
  const inviteCode = await inviteUtil.getCode();
  // 生成地址，私钥
  const wallet = generate();
  const reqPassword = body.password;
  const keystore = wallet.toV3(sha1(reqPassword), { n: 1024 });
  keystore.address = toChecksumAddress(keystore.address);
  // 校验账号是否已经注册
  let user = await User.findByOpenId(body.openid);
  if (user !== null) {
    return new ResData(null, true, '账户名已经存在');
  }
  user = new User({
    openId: body.openid,
    username: body.username,
    nickname: body.username,
    sex: body.sex,
    publicKey: wallet.getAddressString(),
    privateKey: wallet.getPrivateKeyString().replace('0x', ''),
    keystore: JSON.stringify(keystore),
    inviteCode,
  });
  const newUser = await User.create(user);
  // 创建积分记录表
  await scoreService.create(newUser._id);
  // 添加积分日志
  const taskType = 'Register';
  await scoreLogService.create(user._id, taskType);
  return new ResData(newUser, false, '注册成功');
}

/**
 * 获取用户邀请码
 */
async function getInviteCode(userId) {
  const user = await User.get(userId);
  if (!user) {
    return new ResData(null, true, '用户不存在');
  }
  let inviteCode;
  if (user.inviteCode) {
    inviteCode = user.inviteCode;
  } else {
    // 生成私有邀请码
    inviteCode = await inviteUtil.getCode();
    await User.findByIdAndUpdate({ _id: user._id }, { inviteCode });
  }
  return new ResData(inviteCode, false, null);
}

/**
 * 验证邀请码
 * @param {*} inviteCode
 */
async function checkInviteCode(inviteCode) {
  // 根据邀请码查出对应用户
  const user = await User.findByInviteCode(inviteCode);
  // 验证邀请码是否存在
  if (user === null) {
    return new ResData(null, true, '邀请码不存在');
  }
  // 检查 别人邀请码的使用次数
  const oldInviteCodeUseCount = user.inviteCodeUseCount;
  // 验证邀请码是否失效
  if (oldInviteCodeUseCount >= config.inviteCodeValidCount) {
    return new ResData(null, true, '邀请码已失效');
  }
  return new ResData(null, false, '邀请码可用');
}

/**
 * 更新旧的邀请码
 * @param {*} inviteCode
 */
async function updateOldInviteCode(inviteCode) {
  // 根据邀请码查出对应用户
  const user = await User.findByInviteCode(inviteCode);
  // 验证邀请码是否存在
  if (user === null) {
    return new ResData(null, true, '邀请码不存在');
  }
  // 更新邀请码使用次数
  const newUser = await User.findByIdAndUpdate({ _id: user._id }, { $set: { inviteCodeUseCount: Number(user.inviteCodeUseCount) + 1 } });// eslint-disable-line

  // 判断 验证邀请码是否失效
  // 获取邀请码已使用次数
  const oldInviteCodeUseCount = await ScoreLog.countByUserIdAndScoreType(user._id, 'Invite');
  if (oldInviteCodeUseCount < config.inviteCodeValidCount) {
    // 添加积分 任务日志
    const taskType = 'Invite';
    await scoreLogService.create(user._id, taskType);
    return new ResData(null, false, '邀请码可用');
  }
  return new ResData(null, false, `邀请码已使用 ${config.inviteCodeValidCount} 次，不累加积分`);
}

export default { list, create, createWeiXinUser, getInviteCode, checkInviteCode };
