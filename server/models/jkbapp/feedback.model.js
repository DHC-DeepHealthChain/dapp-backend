import mongoose from 'mongoose';
import Promise from 'bluebird';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';

/**
 * Feedback Schema
 */
const FeedbackSchema = extendSchema(BaseEntity, {
  // 任务创建人
  userId: {
    type: String,
    required: true
  },
  delete: {
    type: Boolean,
    default: false
  },
  /** 是否采纳 */
  taked: {
    type: Boolean,
    default: false
  }
});

/**
 * method
 */
FeedbackSchema.method({

});

/**
 * statics
 */
FeedbackSchema.statics = {

  get(id) {
    return this.findById(id)
      .lean()
      .exec()
      .then((feedback) => {
        if (feedback) {
          return feedback;
        }
        const err = new APIError('记录不存在!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },

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

/**
 * @typedef Feedback
 */
export default mongoose.model('Feedback', FeedbackSchema);
