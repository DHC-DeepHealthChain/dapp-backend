import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';

/**
 * HealthPlanItem Schema
 */
const HealthPlanItemSchema = extendSchema(BaseEntity, {
  ipfsHash: {
    type: String,
    required: true,
  },
  planId: {
    type: String,
    required: true,
  },
  step: {
    type: Number,
    required: true,
  }
});

HealthPlanItemSchema.method({});

HealthPlanItemSchema.statics = {

  get(id) {
    return this.findById(id)
      .lean().exec()
      .then((healthPlanItem) => {
        if (healthPlanItem) {
          return healthPlanItem;
        }
        const err = new APIError('健康计划项不存在!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },
  /**
   * 获取计划项
   * @param {*} step
   */
  getByStep(step, planId) {
    return this.find({ step, planId })
    .lean().exec()
    .then((healthPlanItem) => {
      if (healthPlanItem.length > 0) {
        return healthPlanItem[0];
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

export default mongoose.model('HealthPlanItem', HealthPlanItemSchema);
