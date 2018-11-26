import mongoose from 'mongoose';
import Promise from 'bluebird';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';

/**
 * ScoreLog Schema
 */
const ScoreLogSchema = extendSchema(BaseEntity, {
  userId: {
    type: String,
    required: true
  },
  scoreType: {
    type: String,
    required: true
  },
  /** 已阅读 */
  looked: {
    type: Boolean,
    required: false
  },
  /** 已添加至ipfs */
  onIpfs: {
    type: Boolean,
    required: false
  },
});

/**
 * method
 */
ScoreLogSchema.method({

});

/**
 * statics
 */
ScoreLogSchema.statics = {

  get(id) {
    return this.findById(id)
      .lean()
      .exec()
      .then((score) => {
        if (score) {
          return score;
        }
        const err = new APIError('记录不存在!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },

  list(pageSize = 200, page = 0, userId, lookedFlag) {
    const skip = Number(pageSize * page);
    if (lookedFlag === 'true') {
      return this.find({ userId, looked: { $ne: false } })
      .sort({ createdDate: -1 })
      .skip(+skip)
      .limit(+pageSize)
      .lean()
      .exec();
    }
    return this.find({ userId, looked: false })
      .sort({ createdDate: -1 })
      .skip(+skip)
      .limit(+pageSize)
      .lean()
      .exec();
  },

  checkExist(userId, scoreType) {
    return this.find({ userId, scoreType })
      .sort({ createdDate: -1 })
      .lean()
      .exec()
      .then((scorelogs) => {
        if (scorelogs.length > 0) {
          return true;
        }
        return false;
      });
  },

  countAll() {
    return this.count({})
      .lean()
      .exec();
  },

  countByUserId(userId, looked) {
    if (looked === 'true') {
      return this.count({ userId, looked: { $ne: false } })
      .lean()
      .exec();
    }
    return this.count({ userId, looked: false })
      .lean()
      .exec();
  },

  countByUserIdAndScoreType(userId, scoreType) {
    return this.count({ userId, scoreType })
      .lean()
      .exec();
  },

  readableByUserIdAndTaskTypeAndDate(userId, taskType, todayStartDate) {
    return this.find({ userId, scoreType: taskType, createdDate: { $gt: todayStartDate } }) // eslint-disable-line
      .sort({ createdDate: -1 })
      .lean()
      .exec()
      .then((scorelogs) => {
        if (scorelogs.length >= 4) {
          return true;
        }
        return false;
      });
  },

  shareableByUserIdAndTaskTypeAndDate(userId, taskType, todayStartDate) {
    return this.find({ userId, scoreType: taskType, createdDate: { $gt: todayStartDate } }) // eslint-disable-line
      .sort({ createdDate: -1 })
      .lean()
      .exec()
      .then((scorelogs) => {
        if (scorelogs.length > 0) {
          return true;
        }
        return false;
      });
  },

  aa() {
    return this.find({ createdDate: {
      $gte: new Date('2018-05-15T00:00:00.000Z'),
      $lte: new Date('2018-05-15T12:00:00.000Z') } })
    .sort({ createdDate: -1 })
    .lean()
    .exec();
  },

  findAllByUserId(userId, looked) {
    return this.find({ userId, looked })
    .sort({ createdDate: -1 })
    .lean()
    .exec();
  },

  findByOnChain() {
    return this.find({ onIpfs: false })
      .limit(2)
      .lean()
      .exec();
  }

};

/**
 * @typedef ScoreLog
 */
export default mongoose.model('ScoreLog', ScoreLogSchema);
