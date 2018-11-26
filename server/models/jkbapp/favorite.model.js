import mongoose from 'mongoose';
import Promise from 'bluebird';
import httpStatus from 'http-status';
import APIError from '../../helpers/APIError';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';

/**
 * Favorite Schema
 */
const FavoriteSchema = extendSchema(BaseEntity, {
  userId: {
    type: String,
    required: true
  },
  otherId: {
    // ObjectId
    type: String,
    required: true
  },
  favoriteType: {
    type: String,
    required: true
  },
  delete: {
    type: Boolean,
    default: false,
  }
});

/**
 * Favorite Method
 */
FavoriteSchema.method({});

/**
 * Favorite Static
 */
FavoriteSchema.statics = {

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

  getByUserIdAndArticleId(userId, otherId) {
    return this.find({ userId, otherId })
      .lean()
      .exec()
      .then((favorites) => {
        if (favorites.length > 0) {
          return favorites;
        }
        return null;
      });
  },

  list({ pageSize = 200, page = 0, userId, favoriteType } = {}) {
    const skip = Number(pageSize * page);
    return this.find({ userId, favoriteType })
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
  },

  countByFavoriteType(favoriteType) {
    return this.count({ favoriteType })
      .lean()
      .exec();
  }

};

export default mongoose.model('Favorite', FavoriteSchema);
