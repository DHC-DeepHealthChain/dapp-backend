'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _mongooseExtendSchema = require('../base/mongoose-extend-schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Feedback Schema
 */
var FeedbackSchema = (0, _mongooseExtendSchema.extendSchema)(_mongooseExtendSchema.BaseEntity, {
  // 任务创建人
  userId: {
    type: String,
    required: true
  },
  delete: {
    type: Boolean,
    default: false
  },
  /** 是否采纳 */
  taked: {
    type: Boolean,
    default: false
  }
});

/**
 * method
 */
FeedbackSchema.method({});

/**
 * statics
 */
FeedbackSchema.statics = {
  get: function get(id) {
    return this.findById(id).lean().exec().then(function (feedback) {
      if (feedback) {
        return feedback;
      }
      var err = new _APIError2.default('记录不存在!', _httpStatus2.default.NOT_FOUND, true);
      return _bluebird2.default.reject(err);
    });
  },
  list: function list() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$pageSize = _ref.pageSize,
        pageSize = _ref$pageSize === undefined ? 200 : _ref$pageSize,
        _ref$page = _ref.page,
        page = _ref$page === undefined ? 0 : _ref$page;

    var skip = Number(pageSize * page);
    return this.find({}).sort({ createdDate: -1 }).skip(+skip).limit(+pageSize).lean().exec();
  },
  countAll: function countAll() {
    return this.count({}).lean().exec();
  }
};

/**
 * @typedef Feedback
 */
exports.default = _mongoose2.default.model('Feedback', FeedbackSchema);
//# sourceMappingURL=feedback.model.js.map
