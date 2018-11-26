import mongoose from 'mongoose';
import Promise from 'bluebird';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';

// // 评论类型
// const CommentTypeEnum = {
//   TOARTICLE: 1,
//   TOUSER: 2,
// };

/**
 * Comment Schema
 */
const CommentSchema = extendSchema(BaseEntity, {
  // 发布人
  userId: {
    type: String,
    required: true
  },
  commentType: {
    type: String, // 回复此文或回复此文章下的留言
    required: true
  },
  // ObjectId 被评论人id
  toCommenterId: {
    type: String,
    required: true
  },
  // 评论来源
  resourceId: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: false
  },
  // 点赞数
  praiseCount: {
    type: Number,
    required: false
  },
  delete: {
    type: Boolean,
    default: false,
  }
});

/**
 * Message Method
 */
CommentSchema.method({});

/**
 * Message Static
 */
CommentSchema.statics = {

  get(id) {
    return this.findById(id)
      .lean()
      .exec()
      .then((favorite) => {
        if (favorite) {
          return favorite;
        }
        const err = new APIError('记录不存在!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
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
  }

};

export default mongoose.model('Comment', CommentSchema);
