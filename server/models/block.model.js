import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Block Schema
 */
const BlockSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  extraData: {
    type: String
  },
  gasLimit: {
    type: Number,
    required: true,
  },
  gasUsed: {
    type: Number,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  logsBloom: {
    type: String
  },
  miner: {
    type: String,
    required: true
  },
  nonce: {
    type: String
  },
  number: {
    type: Number,
    required: true,
  },
  parentHash: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  receiptsRoot: {
    type: String,
    required: true,
  },
  sha3Uncles: {
    type: String,
    required: true,
  },
  stateRoot: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  totalDifficulty: {
    type: Number,
    required: true,
  },
  transactionsRoot: {
    type: String,
    required: true,
  },
  uncles: {
    type: String
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
BlockSchema.method({
});

/**
 * Statics
 */
BlockSchema.statics = {
  /**
   * Get block by id
   * @param {ObjectId} id - The objectId of block.
   * @returns {Promise<Block, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((block) => {
        if (block) {
          return block;
        }
        const err = new APIError('用户不存在!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },

  /**
   * Get block by blockname
   * @param {name} blockname - The name of block
   * @returns {Promise<Block, APIError>}
   */
  getByName(blockname) {
    return this.findOne({ blockname })
    .exec()
    .then((block) => {
      if (block) {
        return block;
      }
      const err = new APIError('用户不存在!', httpStatus.NOT_FOUND, true);
      return Promise.reject(err);
    });
  },

  /**
   * List blocks in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of blocks to be skipped.
   * @param {number} limit - Limit number of blocks to be returned.
   * @returns {Promise<Block[]>}
   */
  list({ page = 0, pageSize = 200 } = {}) {
    const skip = Number(pageSize * page);
    return this.find({})
      .sort({ timestamp: -1 })
      .skip(+skip)
      .limit(+pageSize)
      .exec();
  }
};

/**
 * @typedef Block
 */
export default mongoose.model('Block', BlockSchema);
