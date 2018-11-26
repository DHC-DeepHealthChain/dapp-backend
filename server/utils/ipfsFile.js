import { encrypt, decrypt } from './aes';

const ipfsAPI = require('ipfs-api');

const ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

/**
 * 上传内容到ipfs, 返回内容hash
 * @param {*} buffer
 */
exports.addContent = (ipfsData, isBuffer) => new Promise((resolve, reject) => {
  try {
    const encryptBuffer = isBuffer ? encrypt(ipfsData) :
      encrypt(Buffer.from(JSON.stringify(ipfsData)));
    ipfs.add(encryptBuffer, (err, files) => {
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

/**
 * 根据hash值获取ipfs存储内容
 * @param {*} hash
 */
exports.getContent = (hash, noString) => new Promise((resolve, reject) => {
  try {
    ipfs.get(hash, (err, files) => {
      if (err || typeof files === 'undefined') {
        reject(err);
      } else {
        if (noString) { // eslint-disable-line
          resolve(decrypt(files[0].content));
        } else {
          resolve(decrypt(files[0].content).toString());
        }
      }
    });
  } catch (ex) {
    reject(ex);
  }
});
