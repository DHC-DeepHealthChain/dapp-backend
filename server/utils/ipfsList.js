import { getContent } from './ipfsFile';

/**
 * 根据集合获取ipfs上的内容
 * @param {*} userPlans
 */
const getIpfsContent = async hash => await getContent(hash);

exports.getContentsByHash = (list) => {
  const result = list.map(async item => await getIpfsContent(item.ipfsHash));
  return Promise.all(result).then((arr) => {
    arr.map((item, index) => {
      list[index].content = item;// eslint-disable-line no-param-reassign
      // if (item.listImg) {
      //   getContent(item.listImg, 'noString').then((imgBuffer) => {
      //     item.listImg = imgBuffer;// eslint-disable-line no-param-reassign
      //   });
      // }
      return undefined;
    });
    return list;
  });
};

const getImgIpfsContent = async hash => await getContent(hash, 'noString');

exports.getListImgByHash = (list) => {
  const result = list.map(async (item) => {
    if (item.listImg.indexOf('http') !== -1) {
      return item.listImg;
    }
    return await getImgIpfsContent(item.listImg);
  });
  return Promise.all(result).then((arr) => {
    arr.map((imgBuffer, index) => {
      // 判断 如果地址包含http 则不转化为base64
      if (list[index].listImg.indexOf('http') !== -1) {
        list[index].listImg = list[index].listImg;// eslint-disable-line no-param-reassign
      } else {
        list[index].listImg = imgBuffer.toString('base64');// eslint-disable-line no-param-reassign
      }
      // list[index].listImg = imgBuffer.toString('base64');// eslint-disable-line no-param-reassign
      // if (item.listImg) {
      //   getContent(item.listImg, 'noString').then((imgBuffer) => {
      //     item.listImg = imgBuffer;// eslint-disable-line no-param-reassign
      //   });
      // }
      return undefined;
    });
    return list;
  });
};
