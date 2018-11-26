import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';

/**
 * HealthUserPlanSchema Schema
 */
const HealthUserPlanSchema = extendSchema(BaseEntity, {
  userId: {
    type: String,
    required: true,
  },
  planId: {
    type: String,
    required: true,
  },
  continueStep: {
    type: Number,
    required: false,
  },
  finish: {
    type: Boolean,
    required: false,
  },
  delete: {
    type: Boolean,
    default: false,
  }
});

HealthUserPlanSchema.method({});

HealthUserPlanSchema.statics = {

  get(id) {
    return this.findById(id)
      .lean().exec()
      .then((healthPlan) => {
        if (healthPlan.length > 0) {
          return healthPlan;
        }
        const err = new APIError('不存在!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },
  /**
   * Get account by accountname
   * @param {name} username - The name of account
   * @returns {Promise<Account, APIError>}
   */
  getByUserId(id) {
    return this.find({ userId: id, delete: false })
    .sort({ createdDate: -1 })
    .lean()
    .exec()
    .then((userPlans) => {
      if (userPlans.length > 0) {
        return userPlans;
      }
      return null;
    });
  },

  /**
   * Get account by accountname
   * @param {name} username - The name of account
   * @returns {Promise<Account, APIError>}
   */
  getByUserIdAndPlanId(userId, planId) {
    return this.find({ userId, planId })
    .lean().exec()
    .then((userPlan) => {
      if (userPlan.length > 0) {
        return userPlan[0];
      }
      return null;
    });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ pageSize = 200, page = 0 } = {}) {
    const skip = Number(pageSize * page);
    return this.find({})
      .sort({ createdDate: -1 })
      .skip(+skip)
      .limit(+pageSize)
      .lean()
      .exec();
  }
};

export default mongoose.model('HealthUserPlan', HealthUserPlanSchema);
