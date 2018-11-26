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
 * ArticleLog Schema
 */
var ArticleLogSchema = (0, _mongooseExtendSchema.extendSchema)(_mongooseExtendSchema.BaseEntity, {
  userId: {
    type: String,
    required: true
  },
  articleId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

/**
 * Methods
 */
ArticleLogSchema.method({});

/**
 * Statics
 */
ArticleLogSchema.statics = {
  get: function get(id) {
    return this.findById(id).lean().exec().then(function (articlelog) {
      if (articlelog) {
        return articlelog;
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
    return this.find({ delete: false }).sort({ createdDate: -1, _id: 1 }).skip(+skip).limit(+pageSize).lean().exec();
  },
  countAll: function countAll() {
    return this.count({}).lean().exec();
  },
  existByUserIdAndArticleIdAndType: function existByUserIdAndArticleIdAndType(userId, articleId, taskType) {
    return this.find({ userId: userId, articleId: articleId, type: taskType }) // eslint-disable-line
    .sort({ createdDate: -1 }).lean().exec().then(function (healthIndicators) {
      if (healthIndicators.length > 0) {
        return healthIndicators[0];
      }
      return null;
    });
  }
};

/**
 * @typedef ArticleLog
 */
exports.default = _mongoose2.default.model('ArticleLog', ArticleLogSchema);
//# sourceMappingURL=articleLog.model.js.map
