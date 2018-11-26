import mongoose from 'mongoose';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';

/**
 * HealthPlan Schema
 */
const HealthPlanSchema = extendSchema(BaseEntity, {
  ipfsHash: {
    type: String,
    required: true,
  },
  joinNum: {
    type: Number,
    required: true,
  },
  listImg: {
    type: String,
    required: false,
  }
});

HealthPlanSchema.method({

});

HealthPlanSchema.statics = {

  get(id) {
    return this.findById(id)
      .lean().exec()
      .then((healthPlan) => {
        if (healthPlan) {
          return healthPlan;
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
  },

  countAll() {
    return this.count({})
      .lean()
      .exec();
  }
};

export default mongoose.model('HealthPlan', HealthPlanSchema);
