import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Account Schema
 */
const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  createdAt: {
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
AccountSchema.method({
});

/**
 * Statics
 */
AccountSchema.statics = {
  /**
   * Get account by id
   * @param {ObjectId} id - The objectId of account.
   * @returns {Promise<Account, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((account) => {
        if (account) {
          return account;
        }
        const err = new APIError('账号不存在!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },

  /**
   * Get account by accountname
   * @param {name} username - The name of account
   * @returns {Promise<Account, APIError>}
   */
  getByName(name) {
    return this.find({ username: name })
    .lean().exec()
    .then((accounts) => {
      if (accounts) {
        return accounts;
      }
      return null;
    });
  },

  /**
   * Get account by username
   * @param {name} username - The name of account
   * @returns {Promise<Account, APIError>}
   */
  checkByName(name, addr) {
    return this.findOne({ username: name, address: addr })
    .exec()
    .then((account) => {
      if (account) {
        return true;
      }
      return false;
    });
  },

  /**
   * List accounts in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of accounts to be skipped.
   * @param {number} limit - Limit number of accounts to be returned.
   * @returns {Promise<Account[]>}
   */
  list({ page = 0, pageSize = 200 } = {}) {
    const skip = Number(pageSize * page);
    return this.find({})
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+pageSize)
      .exec();
  }
};

/**
 * @typedef Account
 */
export default mongoose.model('Account', AccountSchema);
