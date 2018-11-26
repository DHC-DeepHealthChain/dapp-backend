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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Account Schema
 */
var AccountSchema = new _mongoose2.default.Schema({
  username: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
AccountSchema.method({});

/**
 * Statics
 */
AccountSchema.statics = {
  /**
   * Get account by id
   * @param {ObjectId} id - The objectId of account.
   * @returns {Promise<Account, APIError>}
   */
  get: function get(id) {
    return this.findById(id).exec().then(function (account) {
      if (account) {
        return account;
      }
      var err = new _APIError2.default('账号不存在!', _httpStatus2.default.NOT_FOUND, true);
      return _bluebird2.default.reject(err);
    });
  },


  /**
   * Get account by accountname
   * @param {name} username - The name of account
   * @returns {Promise<Account, APIError>}
   */
  getByName: function getByName(name) {
    return this.find({ username: name }).lean().exec().then(function (accounts) {
      if (accounts) {
        return accounts;
      }
      return null;
    });
  },


  /**
   * Get account by username
   * @param {name} username - The name of account
   * @returns {Promise<Account, APIError>}
   */
  checkByName: function checkByName(name, addr) {
    return this.findOne({ username: name, address: addr }).exec().then(function (account) {
      if (account) {
        return true;
      }
      return false;
    });
  },


  /**
   * List accounts in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of accounts to be skipped.
   * @param {number} limit - Limit number of accounts to be returned.
   * @returns {Promise<Account[]>}
   */
  list: function list() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$page = _ref.page,
        page = _ref$page === undefined ? 0 : _ref$page,
        _ref$pageSize = _ref.pageSize,
        pageSize = _ref$pageSize === undefined ? 200 : _ref$pageSize;

    var skip = Number(pageSize * page);
    return this.find({}).sort({ createdAt: -1 }).skip(+skip).limit(+pageSize).exec();
  }
};

/**
 * @typedef Account
 */
exports.default = _mongoose2.default.model('Account', AccountSchema);
//# sourceMappingURL=account.model.js.map
