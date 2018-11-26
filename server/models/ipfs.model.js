import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import { extendSchema, BaseEntity } from './base/mongoose-extend-schema';

/**
 * Ipfs Schema
 */
const IpfsSchema = extendSchema(BaseEntity, {
  userId: {
    type: String,
    required: true
  },
  ipfsHash: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true
  },
  fileTitle: {
    type: String,
    required: true
  },
});

/**
 * Methods
 */
IpfsSchema.method({});

/**
 * Statics
 */
IpfsSchema.statics = {
  /**
   * Get ipfs by id
   * @param {ObjectId} id - The objectId of ipfs.
   * @returns {Promise<Ipfs, APIError>}
   */
  get(id) {
    return this.findById(id)
      .lean()
      .exec()
      .then((ipfs) => {
        if (ipfs) {
          return ipfs;
        }
        const err = new APIError('数据不存在!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },

  /**
   * List ipfss in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of ipfss to be skipped.
   * @param {number} limit - Limit number of ipfss to be returned.
   * @returns {Promise<Ipfs[]>}
   */
  list({ page = 0, pageSize = 200 } = {}) {
    const skip = Number(pageSize * page);
    return this.find({})
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+pageSize)
      .lean()
      .exec();
  },

  /**
   * 根据用户id，类型 查找上传记录
   * @param {*} userId
   * @param {*} pageSize
   * @param {*} page
   * @param {*} fileType
   */
  findByUserIdAndFileType(userId, pageSize, page, fileType) {
    const skip = Number(pageSize * page);
    return this.find({ userId, fileType })
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+pageSize)
      .lean()
      .exec();
  },

  /**
   * 根据 类型 查找上传记录
   * @param {*} userId
   * @param {*} pageSize
   * @param {*} page
   * @param {*} fileType
   */
  findByFileType(pageSize, page, fileType) {
    const skip = Number(pageSize * page);
    return this.find({ fileType })
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+pageSize)
      .lean()
      .exec();
  },

  /**
   * 根据用户id和类型，和今日开始时间，检测今日是否达到上传上限
   * @param {*} userId
   * @param {*} fileType
   * @param {*} todayStartDate
   */
  checkCreateMedia(userId, fileType, todayStartDate) {
    return this.find({ userId, fileType, createdDate: { $gt: todayStartDate } })
      .sort({ createdAt: -1 })
      .lean()
      .exec()
      .then((ipfss) => {
        if (ipfss.length > 1) {
          return true;
        }
        return false;
      });
  },

  /**
   * 根据 用户id 类型 计算上传总数
   * @param {*} userId
   * @param {*} fileType
   */
  countByUserIdAndFileType(userId, fileType) {
    return this.count({ userId, fileType })
      .lean()
      .exec();
  },

  /**
   * 根据 类型 计算上传总数
   */
  countByFileType(fileType) {
    return this.count({ fileType })
      .lean()
      .exec();
  },

};

/**
 * @typedef Ipfs
 */
export default mongoose.model('Ipfs', IpfsSchema);
