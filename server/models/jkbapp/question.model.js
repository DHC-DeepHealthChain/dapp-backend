import mongoose from 'mongoose';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';

/**
 * Question Schema
 */
const QuestionSchema = extendSchema(BaseEntity, {
  examId: {
    type: String,
    required: true,
  },
  orderNum: {
    type: Number,
    required: true,
  }
});

/**
 * Method
 */
QuestionSchema.method({});

/**
 * Question Statics
 */
QuestionSchema.statics = {
   /**
   * Get questions
   * @param {name} username - The name of account
   * @returns {Promise<Account, APIError>}
   */
  getByExamId(examId) {
    return this.find({ examId })
    .sort({ orderNum: 1 })
    .lean().exec()
    .then((questions) => {
      if (questions.length > 0) {
        return questions;
      }
      return null;
    });
  },
};

export default mongoose.model('Question', QuestionSchema);
