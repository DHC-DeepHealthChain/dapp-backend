'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseExtendSchema = require('../base/mongoose-extend-schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * UserAnswer Schema
 */
var UserAnswerSchema = (0, _mongooseExtendSchema.extendSchema)(_mongooseExtendSchema.BaseEntity, {
  examId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
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
  getByExamIdAndUserId: function getByExamIdAndUserId(examId, userId) {
    return this.find({ examId: examId, userId: userId }).limit(1).lean().exec().then(function (userAnswer) {
      if (userAnswer.length > 0) {
        return userAnswer[0];
      }
      return null;
    });
  }
};

exports.default = _mongoose2.default.model('UserAnswer', UserAnswerSchema);
//# sourceMappingURL=userAnswer.model.js.map
