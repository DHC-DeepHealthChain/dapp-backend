import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Transcation Schema
 */
const TranscationSchema = new mongoose.Schema({
  blockHash: {
    type: String,
    required: true,
    unique: true
  },
  blockNumber: {
    type: Number,
    required: true
  },
  from: {
    type: String
  },
  gas: {
    type: Number,
    required: true,
  },
  gasPrice: {
    type: Number,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  input: {
    type: String
  },
  nonce: {
    type: String
  },
  to: {
    type: String
  },
  transactionIndex: {
    type: Number
  },
  value: {
    type: Number
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
TranscationSchema.method({});

/**
 * Statics
 */
TranscationSchema.statics = {
  /**
   * Get transcation by id
   * @param {ObjectId} id - The objectId of transcation.
   * @returns {Promise<Transcation, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((transcation) => {
        if (transcation) {
          return transcation;
        }
        const err = new APIError('用户不存在!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },

  /**
   * Get transcation by transcationname
   * @param {name} transcationname - The name of transcation
   * @returns {Promise<Transcation, APIError>}
   */
  getByName(transcationname) {
    return this.findOne({ transcationname })
      .exec()
      .then((transcation) => {
        if (transcation) {
          return transcation;
        }
        const err = new APIError('用户不存在!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },

  /**
   * Get transcation by transcationname
   * @param {name} transcationname - The name of transcation
   * @returns {Promise<Transcation, APIError>}
   */
  checkByName(transcationname) {
    return this.findOne({ transcationname })
      .exec()
      .then((transcation) => {
        if (transcation) {
          return true;
        }
        return false;
      });
  },

  /**
   * get list
   */
  list(pageSize, page) {
    const skip = Number(pageSize * page);
    return this.find({})
      .sort({ timestamp: -1, _id: 1 })
      .skip(+skip)
      .limit(+pageSize)
      .lean()
      .exec();
  },

  /**
   * 根据公钥查询交易记录
   * Model.find({"$or" :  [ {‘age’:18} , {‘name’:‘xueyou’} ] });
   */
  findByFromOrTo(pageSize, page, publicKey) {
    const skip = Number(pageSize * page);
    return this.find({ $or: [{ from: publicKey }, { to: publicKey }] })
      .sort({ timestamp: -1, _id: 1 })
      .skip(+skip)
      .limit(+pageSize)
      .lean()
      .exec();
  },

  countAll() {
    return this.count({})
      .lean()
      .exec();
  },

  countByPublicKey(publicKey) {
    return this.count({ $or: [{ from: publicKey }, { to: publicKey }] })
      .lean()
      .exec();
  }

};

/**
 * @typedef Transcation
 */
export default mongoose.model('Transcation', TranscationSchema);
