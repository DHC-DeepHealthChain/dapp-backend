'use strict';

var _aes = require('./aes');

var ipfsAPI = require('ipfs-api');

var ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

/**
 * 上传内容到ipfs, 返回内容hash
 * @param {*} buffer
 */
exports.addContent = function (ipfsData, isBuffer) {
  return new Promise(function (resolve, reject) {
    try {
      var encryptBuffer = isBuffer ? (0, _aes.encrypt)(ipfsData) : (0, _aes.encrypt)(Buffer.from(JSON.stringify(ipfsData)));
      ipfs.add(encryptBuffer, function (err, files) {
        if (err || typeof files === 'undefined') {
          reject(err);
        } else {
          resolve(files[0].hash);
        }
      });
    } catch (ex) {
      reject(ex);
    }
  });
};

/**
 * 根据hash值获取ipfs存储内容
 * @param {*} hash
 */
exports.getContent = function (hash, noString) {
  return new Promise(function (resolve, reject) {
    try {
      ipfs.get(hash, function (err, files) {
        if (err || typeof files === 'undefined') {
          reject(err);
        } else {
          if (noString) {
            // eslint-disable-line
            resolve((0, _aes.decrypt)(files[0].content));
          } else {
            resolve((0, _aes.decrypt)(files[0].content).toString());
          }
        }
      });
    } catch (ex) {
      reject(ex);
    }
  });
};
//# sourceMappingURL=ipfsFile.js.map
