import mongoose from 'mongoose';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';

/**
 * Item Schema
 */
const ItemSchema = extendSchema(BaseEntity, {
  questionId: {
    type: String,
    required: true,
  },
  orderNum: {
    type: Number,
    required: true,
  },
});

/**
 * Method
 */
ItemSchema.method({});

/**
 * Item Static
 */
ItemSchema.statics = {
   /**
   * Get questions
   * @param {name} username - The name of account
   * @returns {Promise<Account, APIError>}
   */
  getByQuestionId(questionId) {
    return this.find({ questionId })
    .sort({ orderNum: 1 })
    .lean().exec()
    .then((items) => {
      if (items.length > 0) {
        return items;
      }
      return null;
    });
  },
};

export default mongoose.model('Item', ItemSchema);
