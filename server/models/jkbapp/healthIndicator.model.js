import mongoose from 'mongoose';
import Promise from 'bluebird';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';

/**
 * healthIndicator Schema
 */
const HealthIndicatorSchema = extendSchema(BaseEntity, {
  userId: {
    type: String,
    required: true
  },
  healthType: {
    type: String,
    required: true
  },
  delete: {
    type: Boolean,
    default: false,
  }
});

/**
 * method
 */
HealthIndicatorSchema.method({});

/**
 * statics
 */
HealthIndicatorSchema.statics = {

  get(id) {
    return this.findById(id)
      .exec()
      .then((healthIndicator) => {
        if (healthIndicator) {
          return healthIndicator;
        }
        const err = new APIError('记录不存在!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },

  getLast1ByUserIdAndHealthType(userId, healthType) {
    return this.find({ userId, healthType, delete: false })
      .sort({ createdDate: -1 })
      .limit(+1)
      .lean()
      .exec()
      .then((healthIndicators) => {
        if (healthIndicators.length > 0) {
          return healthIndicators;
        }
        return null;
      });
  },

  list({ pageSize = 200, page = 0, userId, healthType } = {}) {
    const skip = Number(pageSize * page);
    return this.find({ userId, healthType, delete: false })
      .sort({ createdDate: -1 })
      .skip(+skip)
      .limit(+pageSize)
      .lean()
      .exec()
      .then((healthIndicators) => {
        if (healthIndicators.length > 0) {
          return healthIndicators;
        }
        return null;
      });
  },

  getByDateGreatThenAndHealthTypeAndUserId(todayStartDate, htype, userid) {
    return this.find({ userId: userid, healthType: htype, createdDate: { $gt: todayStartDate } }) // eslint-disable-line
      .sort({ createdDate: -1 })
      .limit(+1)
      .lean()
      .exec()
      .then((healthIndicators) => {
        if (healthIndicators.length > 0) {
          return true;
        }
        return false;
      });
  },

  getStepByDateGreatThenAndUserId(todayStartDate, userid) {
    return this.find({ userId: userid, healthType: 'step', createdDate: { $gt: todayStartDate } }) // eslint-disable-line
      .sort({ createdDate: -1 })
      .limit(+1)
      .lean()
      .exec()
      .then((healthIndicators) => {
        if (healthIndicators.length > 0) {
          return healthIndicators[0];
        }
        return null;
      });
  },

  countAll() {
    return this.count({})
      .lean()
      .exec();
  },

  countByHealthType(htype) {
    return this.count({ healthType: htype })
      .lean()
      .exec();
  }

};

/**
 * @typedef HealthIndicator
 */
export default mongoose.model('HealthIndicator', HealthIndicatorSchema);
