import mongoose from 'mongoose';
import Promise from 'bluebird';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';

/**
 * Sign Schema
 */
const SignSchema = extendSchema(BaseEntity, {
  // 任务创建人
  userId: {
    type: String,
    required: true
  },
  signTime: {
    type: Date,
    default: Date.now
  },
  keepSignNum: {
    type: Number,
    default: 1
  }
});

/**
 * method
 */
SignSchema.method({

});

/**
 * statics
 */
SignSchema.statics = {

  get(id) {
    return this.findById(id)
      .lean()
      .exec()
      .then((task) => {
        if (task) {
          return task;
        }
        const err = new APIError('记录不存在!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },

  getByDateGreatThenAndUserId(date, userid) {
    return this.find({ signTime: { $gt: date }, userId: userid })
      .lean()
      .exec()
      .then((signs) => {
        if (signs.length > 0) {
          return true;
        }
        return false;
      });
  },

  getLast1ByUserId(userid) {
    return this.find({ userId: userid })
      .sort({ createdDate: -1 })
      .limit(+1)
      .lean()
      .exec()
      .then((sign) => {
        if (sign) {
          return sign;
        }
        return null;
      });
  },

  list({ pageSize = 200, page = 0, userId, weekStartDay } = {}) {
    const skip = Number(pageSize * page);
    return this.find({ signTime: { $gt: weekStartDay }, userId })
      .sort({ createdDate: -1 })
      .skip(+skip)
      .limit(+pageSize)
      .lean()
      .exec();
  }

};

/**
 * @typedef Sign
 */
export default mongoose.model('Sign', SignSchema);
