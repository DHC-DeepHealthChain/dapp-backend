// import Promise from 'bluebird';
import mongoose from 'mongoose';
// import httpStatus from 'http-status';
// import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false
  },
  clearPass: {
    type: String,
    required: false
  },
  mobileNumber: {
    type: String,
    required: false
  },
  headImg: {
    type: String,
    required: false
  },
  height: {
    type: Number,
    required: false
  },
  weight: {
    type: Number,
    required: false
  },
  sex: {
    type: String,
    required: false
  },
  birthday: {
    type: String,
    required: false
  },
  age: {
    type: String,
    required: false
  },
  nickname: {
    type: String,
    required: false
  },
  realname: {
    type: String,
    required: false
  },
  introduce: {
    type: String,
    required: false
  },
  publicKey: {
    type: String,
    required: true,
  },
  privateKey: {
    type: String,
    required: true,
  },
  keystore: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date, default: Date.now
  },
  /** 私人邀请码 */
  inviteCode: {
    type: String,
    required: false
  },
  inviteCodeUseCount: {
    type: Number,
    default: 0
  },
  /** 邀请人的邀请码 */
  otherInviteCode: {
    type: String,
    required: false
  },
  score: {
    type: Number,
    default: 0
  },
  /** kkCoin钱包地址 */
  kkCoinAddress: {
    type: String,
    required: false
  },
  /** 微信的openId */
  openId: {
    type: String,
    required: false
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
UserSchema.method({});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user by id
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .lean()
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        return null;
        // const err = new APIError('用户不存在!', httpStatus.NOT_FOUND, true);
        // return Promise.reject(err);
      });
  },

  /**
   * 根据公钥搜索账户
   * @param {*} publicKey
   */
  getByPublicKey(publicKey) {
    return this.findOne({ publicKey })
      .lean()
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        return null;
      });
  },

  /**
   * Get user by username
   * @param {name} username - The name of user
   * @returns {Promise<User, APIError>}
   */
  getByName(username) {
    return this.findOne({ mobileNumber: username })
      .lean()
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        return null;
      });
  },

  /**
   * Get user by username
   * @param {name} username - The name of user
   * @returns {Promise<User, APIError>}
   */
  checkByName(username) {
    return this.findOne({ username })
      .lean()
      .exec()
      .then((user) => {
        if (user) {
          return true;
        }
        return false;
      });
  },

  /**
   * List users in descending order of 'createdDate' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ page = 0, pageSize = 200 } = {}) {
    const skip = Number(pageSize * page);
    return this.find({}, 'username')
      .sort({ createdDate: -1 })
      .lean()
      .skip(+skip)
      .limit(+pageSize)
      .exec();
  },

  findAll() {
    return this.find({}, 'userId')
      .sort({ createdDate: -1 })
      .lean()
      .exec()
      .then((users) => {
        if (users.length > 0) {
          return users;
        }
        return null;
      });
  },

  findAllUsers() {
    return this.find({})
      .sort({ createdDate: -1 })
      .lean()
      .exec()
      .then((users) => {
        if (users.length > 0) {
          return users;
        }
        return null;
      });
  },

  findByMobile(mobileNumber) {
    return this.find({ mobileNumber })
      .sort({ createdDate: -1 })
      .lean()
      .exec()
      .then((users) => {
        if (users.length > 0) {
          return users[0];
        }
        return null;
      });
  },

  /**
   * 获取积分排名
   * @param {*} pageSize
   * @param {*} page
   */
  getRanking(pageSize, page) {
    const skip = Number(pageSize * page);
    return this.find({})
      .sort({ score: -1 })
      .skip(+skip)
      .limit(+pageSize)
      .lean()
      .exec();
  },

  getRankingAndCreatedDateGrateBy(pageSize, page, todayStartDate) {
    const skip = Number(pageSize * page);
    return this.find({ createdDate: { $gt: todayStartDate } })
      .sort({ score: -1 })
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

  findByInviteCode(inviteCode) {
    return this.find({ inviteCode })
      .lean()
      .exec()
      .then((users) => {
        if (users.length > 0) {
          return users[0];
        }
        return null;
      });
  },

  findByOpenId(openId) {
    return this.find({ openId })
      .sort({ createdDate: -1 })
      .lean()
      .exec()
      .then((users) => {
        if (users.length > 0) {
          return users[0];
        }
        return null;
      });
  },
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
