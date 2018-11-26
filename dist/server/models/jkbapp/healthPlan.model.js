'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseExtendSchema = require('../base/mongoose-extend-schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * HealthPlan Schema
 */
var HealthPlanSchema = (0, _mongooseExtendSchema.extendSchema)(_mongooseExtendSchema.BaseEntity, {
  ipfsHash: {
    type: String,
    required: true
  },
  joinNum: {
    type: Number,
    required: true
  },
  listImg: {
    type: String,
    required: false
  }
});

HealthPlanSchema.method({});

HealthPlanSchema.statics = {
  get: function get(id) {
    return this.findById(id).lean().exec().then(function (healthPlan) {
      if (healthPlan) {
        return healthPlan;
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
  },
  countAll: function countAll() {
    return this.count({}).lean().exec();
  }
};

exports.default = _mongoose2.default.model('HealthPlan', HealthPlanSchema);
//# sourceMappingURL=healthPlan.model.js.map
