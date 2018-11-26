'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseExtendSchema = require('../base/mongoose-extend-schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Question Schema
 */
var QuestionSchema = (0, _mongooseExtendSchema.extendSchema)(_mongooseExtendSchema.BaseEntity, {
  examId: {
    type: String,
    required: true
  },
  orderNum: {
    type: Number,
    required: true
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
  getByExamId: function getByExamId(examId) {
    return this.find({ examId: examId }).sort({ orderNum: 1 }).lean().exec().then(function (questions) {
      if (questions.length > 0) {
        return questions;
      }
      return null;
    });
  }
};

exports.default = _mongoose2.default.model('Question', QuestionSchema);
//# sourceMappingURL=question.model.js.map
