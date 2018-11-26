import mongoose from 'mongoose';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';

/**
 * UserAnswer Schema
 */
const UserAnswerSchema = extendSchema(BaseEntity, {
  examId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
});

/**
 * Method
 */
UserAnswerSchema.method({});

/**
 * UserAnswer Statics
 */
UserAnswerSchema.statics = {
   /**
   * Get userAnswers
   * @param {name} username - The name of account
   * @returns {Promise<Account, APIError>}
   */
  getByExamIdAndUserId(examId, userId) {
    return this.find({ examId, userId })
    .limit(1)
    .lean().exec()
    .then((userAnswer) => {
      if (userAnswer.length > 0) {
        return userAnswer[0];
      }
      return null;
    });
  },
};

export default mongoose.model('UserAnswer', UserAnswerSchema);
