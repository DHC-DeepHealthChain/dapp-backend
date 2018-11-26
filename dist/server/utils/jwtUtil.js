'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

var _responseData = require('../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 获取用户对象
 * @param {*} buffer
 * @param {*} password
 */
exports.getUser = function (req, res) {
  // 验证是否有登录权限
  var authorization = req.headers.authorization;
  var user = void 0;
  try {
    user = _jsonwebtoken2.default.verify(authorization, _config2.default.jwtSecret);
    return user;
  } catch (e) {
    res.json(new _responseData2.default(null, true, '未登录'));
    return null;
  }
};

/**
 * 获取用户ID
 * @param {*} buffer
 * @param {*} password
 */
/**
 *jwt相关
 */

exports.getUserId = function (req, res) {
  // 验证是否有登录权限
  var authorization = req.headers.authorization;
  var user = void 0;
  try {
    user = _jsonwebtoken2.default.verify(authorization.replace('Bearer ', ''), _config2.default.jwtSecret);
    return user.userId;
  } catch (e) {
    return res.json(new _responseData2.default(null, true, '未登录'));
  }
};
//# sourceMappingURL=jwtUtil.js.map
