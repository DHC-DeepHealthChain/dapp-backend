'use strict';

/**
 * aes算法
 */
var crypto = require('crypto');

var algorithm = 'aes-256-ctr';
var password = 'jiangkangbao';
/**
 * 加密
 * @param {*} buffer
 * @param {*} password
 */
exports.encrypt = function (buffer) {
  var cipher = crypto.createCipher(algorithm, password);
  var crypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return crypted;
};

/**
 * 解密
 * @param {*} buffer
 * @param {*} password
 */
exports.decrypt = function (buffer) {
  var decipher = crypto.createDecipher(algorithm, password);
  var dec = Buffer.concat([decipher.update(buffer), decipher.final()]);
  return dec;
};
//# sourceMappingURL=aes.js.map
