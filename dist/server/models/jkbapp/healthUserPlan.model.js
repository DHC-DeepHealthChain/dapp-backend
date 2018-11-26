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

var _APIError = require('../../helpers/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _mongooseExtendSchema = require('../base/mongoose-extend-schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * HealthUserPlanSchema Schema
 */
var HealthUserPlanSchema = (0, _mongooseExtendSchema.extendSchema)(_mongooseExtendSchema.BaseEntity, {
  userId: {
    type: String,
    required: true
  },
  planId: {
    type: String,
    required: true
  },
  continueStep: {
    type: Number,
    required: false
  },
  finish: {
    type: Boolean,
    required: false
  },
  delete: {
    type: Boolean,
    default: false
  }
});

HealthUserPlanSchema.method({});

HealthUserPlanSchema.statics = {
  get: function get(id) {
    return this.findById(id).lean().exec().then(function (healthPlan) {
      if (healthPlan.length > 0) {
        return healthPlan;
      }
      var err = new _APIError2.default('不存在!', _httpStatus2.default.NOT_FOUND, true);
      return _bluebird2.default.reject(err);
    });
  },

  /**
   * Get account by accountname
   * @param {name} username - The name of account
   * @returns {Promise<Account, APIError>}
   */
  getByUserId: function getByUserId(id) {
    return this.find({ userId: id, delete: false }).sort({ createdDate: -1 }).lean().exec().then(function (userPlans) {
      if (userPlans.length > 0) {
        return userPlans;
      }
      return null;
    });
  },


  /**
   * Get account by accountname
   * @param {name} username - The name of account
   * @returns {Promise<Account, APIError>}
   */
  getByUserIdAndPlanId: function getByUserIdAndPlanId(userId, planId) {
    return this.find({ userId: userId, planId: planId }).lean().exec().then(function (userPlan) {
      if (userPlan.length > 0) {
        return userPlan[0];
      }
      return null;
    });
  },


  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list: function list() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$pageSize = _ref.pageSize,
        pageSize = _ref$pageSize === undefined ? 200 : _ref$pageSize,
        _ref$page = _ref.page,
        page = _ref$page === undefined ? 0 : _ref$page;

    var skip = Number(pageSize * page);
    return this.find({}).sort({ createdDate: -1 }).skip(+skip).limit(+pageSize).lean().exec();
  }
};

exports.default = _mongoose2.default.model('HealthUserPlan', HealthUserPlanSchema);
//# sourceMappingURL=healthUserPlan.model.js.map
