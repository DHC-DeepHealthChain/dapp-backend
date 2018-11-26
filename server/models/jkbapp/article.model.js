import mongoose from 'mongoose';
import Promise from 'bluebird';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';

/**
 * Article Schema
 */
const ArticleSchema = extendSchema(BaseEntity, {
  userId: {
    type: String,
    required: true
  },
  delete: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true
  },
  releaseTime: {
    type: Date,
    default: Date.now,
  },
  releaseMan: {
    type: String,
    required: false,
  },
  readNum: {
    type: Number,
    default: 0,
  },
  listImg: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  comeFrom: {
    type: String,
    required: false,
  },
  pass: {
    type: Boolean,
    default: false
  }
});

/**
 * Methods
 */
ArticleSchema.method({});

/**
 * Statics
 */
ArticleSchema.statics = {

  get(id) {
    return this.findById(id)
      .lean()
      .exec()
      .then((article) => {
        if (article) {
          return article;
        }
        const err = new APIError('记录不存在!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },

  list(pageSize, page, pass) {
    const skip = Number(pageSize * page);
    return this.find({ delete: false, pass })
      .sort({ createdDate: -1, _id: 1 })
      .skip(+skip)
      .limit(+pageSize)
      .lean()
      .exec();
  },

  countAll(pass) {
    return this.count({ delete: false, pass })
      .lean()
      .exec();
  }
};

/**
 * @typedef Article
 */
export default mongoose.model('Article', ArticleSchema);
