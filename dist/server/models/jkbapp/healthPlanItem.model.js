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
 * HealthPlanItem Schema
 */
var HealthPlanItemSchema = (0, _mongooseExtendSchema.extendSchema)(_mongooseExtendSchema.BaseEntity, {
  ipfsHash: {
    type: String,
    required: true
  },
  planId: {
    type: String,
    required: true
  },
  step: {
    type: Number,
    required: true
  }
});

HealthPlanItemSchema.method({});

HealthPlanItemSchema.statics = {
  get: function get(id) {
    return this.findById(id).lean().exec().then(function (healthPlanItem) {
      if (healthPlanItem) {
        return healthPlanItem;
      }
      var err = new _APIError2.default('健康计划项不存在!', _httpStatus2.default.NOT_FOUND, true);
      return _bluebird2.default.reject(err);
    });
  },

  /**
   * 获取计划项
   * @param {*} step
   */
  getByStep: function getByStep(step, planId) {
    return this.find({ step: step, planId: planId }).lean().exec().then(function (healthPlanItem) {
      if (healthPlanItem.length > 0) {
        return healthPlanItem[0];
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

exports.default = _mongoose2.default.model('HealthPlanItem', HealthPlanItemSchema);
//# sourceMappingURL=healthPlanItem.model.js.map
