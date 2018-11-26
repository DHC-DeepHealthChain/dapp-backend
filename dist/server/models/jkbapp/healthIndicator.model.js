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
 * healthIndicator Schema
 */
var HealthIndicatorSchema = (0, _mongooseExtendSchema.extendSchema)(_mongooseExtendSchema.BaseEntity, {
  userId: {
    type: String,
    required: true
  },
  healthType: {
    type: String,
    required: true
  },
  delete: {
    type: Boolean,
    default: false
  }
});

/**
 * method
 */
HealthIndicatorSchema.method({});

/**
 * statics
 */
HealthIndicatorSchema.statics = {
  get: function get(id) {
    return this.findById(id).exec().then(function (healthIndicator) {
      if (healthIndicator) {
        return healthIndicator;
      }
      var err = new _APIError2.default('记录不存在!', _httpStatus2.default.NOT_FOUND, true);
      return _bluebird2.default.reject(err);
    });
  },
  getLast1ByUserIdAndHealthType: function getLast1ByUserIdAndHealthType(userId, healthType) {
    return this.find({ userId: userId, healthType: healthType, delete: false }).sort({ createdDate: -1 }).limit(+1).lean().exec().then(function (healthIndicators) {
      if (healthIndicators.length > 0) {
        return healthIndicators;
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
        healthType = _ref.healthType;

    var skip = Number(pageSize * page);
    return this.find({ userId: userId, healthType: healthType, delete: false }).sort({ createdDate: -1 }).skip(+skip).limit(+pageSize).lean().exec().then(function (healthIndicators) {
      if (healthIndicators.length > 0) {
        return healthIndicators;
      }
      return null;
    });
  },
  getByDateGreatThenAndHealthTypeAndUserId: function getByDateGreatThenAndHealthTypeAndUserId(todayStartDate, htype, userid) {
    return this.find({ userId: userid, healthType: htype, createdDate: { $gt: todayStartDate } }) // eslint-disable-line
    .sort({ createdDate: -1 }).limit(+1).lean().exec().then(function (healthIndicators) {
      if (healthIndicators.length > 0) {
        return true;
      }
      return false;
    });
  },
  getStepByDateGreatThenAndUserId: function getStepByDateGreatThenAndUserId(todayStartDate, userid) {
    return this.find({ userId: userid, healthType: 'step', createdDate: { $gt: todayStartDate } }) // eslint-disable-line
    .sort({ createdDate: -1 }).limit(+1).lean().exec().then(function (healthIndicators) {
      if (healthIndicators.length > 0) {
        return healthIndicators[0];
      }
      return null;
    });
  },
  countAll: function countAll() {
    return this.count({}).lean().exec();
  },
  countByHealthType: function countByHealthType(htype) {
    return this.count({ healthType: htype }).lean().exec();
  }
};

/**
 * @typedef HealthIndicator
 */
exports.default = _mongoose2.default.model('HealthIndicator', HealthIndicatorSchema);
//# sourceMappingURL=healthIndicator.model.js.map
