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
 * Sign Schema
 */
var SignSchema = (0, _mongooseExtendSchema.extendSchema)(_mongooseExtendSchema.BaseEntity, {
  // 任务创建人
  userId: {
    type: String,
    required: true
  },
  signTime: {
    type: Date,
    default: Date.now
  },
  keepSignNum: {
    type: Number,
    default: 1
  }
});

/**
 * method
 */
SignSchema.method({});

/**
 * statics
 */
SignSchema.statics = {
  get: function get(id) {
    return this.findById(id).lean().exec().then(function (task) {
      if (task) {
        return task;
      }
      var err = new _APIError2.default('记录不存在!', _httpStatus2.default.NOT_FOUND, true);
      return _bluebird2.default.reject(err);
    });
  },
  getByDateGreatThenAndUserId: function getByDateGreatThenAndUserId(date, userid) {
    return this.find({ signTime: { $gt: date }, userId: userid }).lean().exec().then(function (signs) {
      if (signs.length > 0) {
        return true;
      }
      return false;
    });
  },
  getLast1ByUserId: function getLast1ByUserId(userid) {
    return this.find({ userId: userid }).sort({ createdDate: -1 }).limit(+1).lean().exec().then(function (sign) {
      if (sign) {
        return sign;
      }
      return null;
    });
  },
  list: function list() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$pageSize = _ref.pageSize,
        pageSize = _ref$pageSize === undefined ? 200 : _ref$pageSize,
        _ref$page = _ref.page,
        page = _ref$page === undefined ? 0 : _ref$page,
        userId = _ref.userId,
        weekStartDay = _ref.weekStartDay;

    var skip = Number(pageSize * page);
    return this.find({ signTime: { $gt: weekStartDay }, userId: userId }).sort({ createdDate: -1 }).skip(+skip).limit(+pageSize).lean().exec();
  }
};

/**
 * @typedef Sign
 */
exports.default = _mongoose2.default.model('Sign', SignSchema);
//# sourceMappingURL=sign.model.js.map
