'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseExtendSchema = require('../base/mongoose-extend-schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Item Schema
 */
var ItemSchema = (0, _mongooseExtendSchema.extendSchema)(_mongooseExtendSchema.BaseEntity, {
  questionId: {
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
  getByQuestionId: function getByQuestionId(questionId) {
    return this.find({ questionId: questionId }).sort({ orderNum: 1 }).lean().exec().then(function (items) {
      if (items.length > 0) {
        return items;
      }
      return null;
    });
  }
};

exports.default = _mongoose2.default.model('Item', ItemSchema);
//# sourceMappingURL=item.model.js.map
