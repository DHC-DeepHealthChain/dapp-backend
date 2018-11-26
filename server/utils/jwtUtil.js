/**
 *jwt相关
 */

import jwt from 'jsonwebtoken';
import config from '../../config/config';
import ResData from '../helpers/responseData';

/**
 * 获取用户对象
 * @param {*} buffer
 * @param {*} password
 */
exports.getUser = (req, res) => {
  // 验证是否有登录权限
  const authorization = req.headers.authorization;
  let user;
  try {
    user = jwt.verify(authorization, config.jwtSecret);
    return user;
  } catch (e) {
    res.json(new ResData(null, true, '未登录'));
    return null;
  }
};

/**
 * 获取用户ID
 * @param {*} buffer
 * @param {*} password
 */
exports.getUserId = (req, res) => {
   // 验证是否有登录权限
  const authorization = req.headers.authorization;
  let user;
  try {
    user = jwt.verify(authorization.replace('Bearer ', ''), config.jwtSecret);
    return user.userId;
  } catch (e) {
    return res.json(new ResData(null, true, '未登录'));
  }
};
