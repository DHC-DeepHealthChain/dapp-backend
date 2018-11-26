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
 * Article Schema
 */
var ArticleSchema = (0, _mongooseExtendSchema.extendSchema)(_mongooseExtendSchema.BaseEntity, {
  userId: {
    type: String,
    required: true
  },
  delete: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  },
  releaseTime: {
    type: Date,
    default: Date.now
  },
  releaseMan: {
    type: String,
    required: false
  },
  readNum: {
    type: Number,
    default: 0
  },
  listImg: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  comeFrom: {
    type: String,
    required: false
  },
  pass: {
    type: Boolean,
    default: false
  }
});

/**
 * Methods
 */
ArticleSchema.method({});

/**
 * Statics
 */
ArticleSchema.statics = {
  get: function get(id) {
    return this.findById(id).lean().exec().then(function (article) {
      if (article) {
        return article;
      }
      var err = new _APIError2.default('记录不存在!', _httpStatus2.default.NOT_FOUND, true);
      return _bluebird2.default.reject(err);
    });
  },
  list: function list(pageSize, page, pass) {
    var skip = Number(pageSize * page);
    return this.find({ delete: false, pass: pass }).sort({ createdDate: -1, _id: 1 }).skip(+skip).limit(+pageSize).lean().exec();
  },
  countAll: function countAll(pass) {
    return this.count({ delete: false, pass: pass }).lean().exec();
  }
};

/**
 * @typedef Article
 */
exports.default = _mongoose2.default.model('Article', ArticleSchema);
//# sourceMappingURL=article.model.js.map
