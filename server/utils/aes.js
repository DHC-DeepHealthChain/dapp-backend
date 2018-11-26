/**
 * aes算法
 */
const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const password = 'jiangkangbao';
/**
 * 加密
 * @param {*} buffer
 * @param {*} password
 */
exports.encrypt = (buffer) => {
  const cipher = crypto.createCipher(algorithm, password);
  const crypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return crypted;
};

/**
 * 解密
 * @param {*} buffer
 * @param {*} password
 */
exports.decrypt = (buffer) => {
  const decipher = crypto.createDecipher(algorithm, password);
  const dec = Buffer.concat([decipher.update(buffer), decipher.final()]);
  return dec;
};
