import mongoose from 'mongoose';
import Promise from 'bluebird';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';

/**
 * Mcommentessage Schema
 */
const MessageSchema = extendSchema(BaseEntity, {
  // 发布人
  userId: {
    type: String,
    required: true
  },
  messageType: {
    type: String, // 回复此文或回复此文章下的留言
    required: true
  },
  delete: {
    type: Boolean,
    default: false,
  },
  isRead: {
    type: Boolean,
    default: false,
  }
});

/**
 * Message Method
 */
MessageSchema.method({});

/**
 * Message Static
 */
MessageSchema.statics = {

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
    return this.find({ userId, isRead: false })
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

export default mongoose.model('Message', MessageSchema);
