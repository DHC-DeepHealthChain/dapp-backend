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

// // 评论类型
// const CommentTypeEnum = {
//   TOARTICLE: 1,
//   TOUSER: 2,
// };

/**
 * Comment Schema
 */
var CommentSchema = (0, _mongooseExtendSchema.extendSchema)(_mongooseExtendSchema.BaseEntity, {
  // 发布人
  userId: {
    type: String,
    required: true
  },
  commentType: {
    type: String, // 回复此文或回复此文章下的留言
    required: true
  },
  // ObjectId 被评论人id
  toCommenterId: {
    type: String,
    required: true
  },
  // 评论来源
  resourceId: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: false
  },
  // 点赞数
  praiseCount: {
    type: Number,
    required: false
  },
  delete: {
    type: Boolean,
    default: false
  }
});

/**
 * Message Method
 */
CommentSchema.method({});

/**
 * Message Static
 */
CommentSchema.statics = {
  get: function get(id) {
    return this.findById(id).lean().exec().then(function (favorite) {
      if (favorite) {
        return favorite;
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
        page = _ref$page === undefined ? 0 : _ref$page,
        userId = _ref.userId;

    var skip = Number(pageSize * page);
    return this.find({ userId: userId }).sort({ createdDate: -1 }).skip(+skip).limit(+pageSize).lean().exec();
  }
};

exports.default = _mongoose2.default.model('Comment', CommentSchema);
//# sourceMappingURL=comment.model.js.map
