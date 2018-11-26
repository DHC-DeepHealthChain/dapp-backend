import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';
import APIError from '../../helpers/APIError';

/**
 * Exam Schema
 */
const ExamSchema = extendSchema(BaseEntity, {
  isRecommend: {
    type: Boolean,
    default: false,
  },
  listImg: {
    type: String,
    default: false,
  }
});

/**
 * Method
 */
ExamSchema.method({});

/**
 * Exam Static
 */
ExamSchema.statics = {
   /**
   * Get user by id
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((exam) => {
        if (exam) {
          return exam;
        }
        const err = new APIError('问券不存在!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },

  /**
   * 获取推荐的问券
   * @param {*} step
   */
  getByIsRecommend() {
    return this.find({ isRecommend: true })
    .lean().exec()
    .then((exams) => {
      if (exams.length > 0) {
        return exams;
      }
      return null;
    });
  },
   /**
   * List transcations in descending order of 'createdAt' timestamp.
   * @param {number} page - Number of transcations to be skipped.
   * @param {number} pageSize - Limit number of transcations to be returned.
   * @returns {Promise<Transcation[]>}
   */
  list({ page = 0, pageSize = 200 } = {}) {
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

export default mongoose.model('Exam', ExamSchema);
