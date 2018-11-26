import mongoose from 'mongoose';
import Promise from 'bluebird';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';

/**
 * Score Schema
 */
const ScoreSchema = extendSchema(BaseEntity, {
  userId: {
    type: String,
    required: true
  }
});

/**
 * method
 */
ScoreSchema.method({

});

/**
 * statics
 */
ScoreSchema.statics = {

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

  getByUserId(userId) {
    return this.find({ userId })
      .sort({ createdDate: -1 })
      .limit(+1)
      .lean()
      .exec()
      .then((score) => {
        if (score.length > 0) {
          return score[0];
        }
        return null;
      });
  },

  list({ pageSize = 200, page = 0, userId } = {}) {
    const skip = Number(pageSize * page);
    return this.find({ userId })
      .sort({ createdDate: -1 })
      .skip(+skip)
      .limit(+pageSize)
      .lean()
      .exec();
  },

};

/**
 * @typedef Score
 */
export default mongoose.model('Score', ScoreSchema);
