'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _mongooseExtendSchema = require('./base/mongoose-extend-schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Ipfs Schema
 */
var FlagSchema = (0, _mongooseExtendSchema.extendSchema)(_mongooseExtendSchema.BaseEntity, {
  flagKey: {
    type: String,
    required: true
  },
  flagValue: {
    type: Boolean,
    required: true
  }
});

/**
 * Methods
 */
FlagSchema.method({});

/**
 * Statics
 */
FlagSchema.statics = {
  get: function get(id) {
    return this.findById(id).lean().exec().then(function (ipfs) {
      if (ipfs) {
        return ipfs;
      }
      var err = new _APIError2.default('数据不存在!', _httpStatus2.default.NOT_FOUND, true);
      return _bluebird2.default.reject(err);
    });
  },
  list: function list() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$page = _ref.page,
        page = _ref$page === undefined ? 0 : _ref$page,
        _ref$pageSize = _ref.pageSize,
        pageSize = _ref$pageSize === undefined ? 200 : _ref$pageSize;

    var skip = Number(pageSize * page);
    return this.find({}).sort({ createdAt: -1 }).skip(+skip).limit(+pageSize).lean().exec();
  },
  getByFlagKey: function getByFlagKey(flagKey) {
    return this.find({ flagKey: flagKey }).lean().exec().then(function (flags) {
      if (flags) {
        return flags[0];
      }
      return null;
    });
  }
};

/**
 * @typedef Flag
 */
exports.default = _mongoose2.default.model('Flag', FlagSchema);
//# sourceMappingURL=flag.model.js.map
