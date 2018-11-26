import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import { extendSchema, BaseEntity } from './base/mongoose-extend-schema';

/**
 * Ipfs Schema
 */
const FlagSchema = extendSchema(BaseEntity, {
  flagKey: {
    type: String,
    required: true
  },
  flagValue: {
    type: Boolean,
    required: true
  }
});

/**
 * Methods
 */
FlagSchema.method({});

/**
 * Statics
 */
FlagSchema.statics = {

  get(id) {
    return this.findById(id)
      .lean()
      .exec()
      .then((ipfs) => {
        if (ipfs) {
          return ipfs;
        }
        const err = new APIError('数据不存在!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      });
  },

  list({ page = 0, pageSize = 200 } = {}) {
    const skip = Number(pageSize * page);
    return this.find({})
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+pageSize)
      .lean()
      .exec();
  },

  getByFlagKey(flagKey) {
    return this.find({ flagKey })
      .lean()
      .exec()
      .then((flags) => {
        if (flags) {
          return flags[0];
        }
        return null;
      });
  },

};

/**
 * @typedef Flag
 */
export default mongoose.model('Flag', FlagSchema);
