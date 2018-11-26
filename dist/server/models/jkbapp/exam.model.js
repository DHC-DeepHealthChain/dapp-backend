'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _mongooseExtendSchema = require('../base/mongoose-extend-schema');

var _APIError = require('../../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Exam Schema
 */
var ExamSchema = (0, _mongooseExtendSchema.extendSchema)(_mongooseExtendSchema.BaseEntity, {
  isRecommend: {
    type: Boolean,
    default: false
  },
  listImg: {
    type: String,
    default: false
  }
});

/**
 * Method
 */
ExamSchema.method({});

/**
 * Exam Static
 */
ExamSchema.statics = {
  /**
  * Get user by id
  * @param {ObjectId} id - The objectId of user.
  * @returns {Promise<User, APIError>}
  */
  get: function get(id) {
    return this.findById(id).exec().then(function (exam) {
      if (exam) {
        return exam;
      }
      var err = new _APIError2.default('问券不存在!', _httpStatus2.default.NOT_FOUND, true);
      return Promise.reject(err);
    });
  },


  /**
   * 获取推荐的问券
   * @param {*} step
   */
  getByIsRecommend: function getByIsRecommend() {
    return this.find({ isRecommend: true }).lean().exec().then(function (exams) {
      if (exams.length > 0) {
        return exams;
      }
      return null;
    });
  },

  /**
  * List transcations in descending order of 'createdAt' timestamp.
  * @param {number} page - Number of transcations to be skipped.
  * @param {number} pageSize - Limit number of transcations to be returned.
  * @returns {Promise<Transcation[]>}
  */
  list: function list() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$page = _ref.page,
        page = _ref$page === undefined ? 0 : _ref$page,
        _ref$pageSize = _ref.pageSize,
        pageSize = _ref$pageSize === undefined ? 200 : _ref$pageSize;

    var skip = Number(pageSize * page);
    return this.find({}).sort({ createdDate: -1 }).skip(+skip).limit(+pageSize).lean().exec();
  },
  countAll: function countAll() {
    return this.count({}).lean().exec();
  }
};

exports.default = _mongoose2.default.model('Exam', ExamSchema);
//# sourceMappingURL=exam.model.js.map
