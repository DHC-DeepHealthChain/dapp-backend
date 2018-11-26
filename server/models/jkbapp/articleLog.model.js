import mongoose from 'mongoose';
import Promise from 'bluebird';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';

/**
 * ArticleLog Schema
 */
const ArticleLogSchema = extendSchema(BaseEntity, {
  userId: {
    type: String,
    required: true
  },
  articleId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
});

/**
 * Methods
 */
ArticleLogSchema.method({});

/**
 * Statics
 */
ArticleLogSchema.statics = {

  get(id) {
    return this.findById(id)
      .lean()
      .exec()
      .then((articlelog) => {
        if (articlelog) {
          return articlelog;
        }
        const err = new APIError('记录不存在!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },

  list({ pageSize = 200, page = 0 } = {}) {
    const skip = Number(pageSize * page);
    return this.find({ delete: false })
      .sort({ createdDate: -1, _id: 1 })
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

  existByUserIdAndArticleIdAndType(userId, articleId, taskType) {
    return this.find({ userId, articleId, type: taskType}) // eslint-disable-line
      .sort({ createdDate: -1 })
      .lean()
      .exec()
      .then((healthIndicators) => {
        if (healthIndicators.length > 0) {
          return healthIndicators[0];
        }
        return null;
      });
  },
};

/**
 * @typedef ArticleLog
 */
export default mongoose.model('ArticleLog', ArticleLogSchema);
