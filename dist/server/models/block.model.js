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
 * Block Schema
 */
var BlockSchema = new _mongoose2.default.Schema({
  content: {
    type: String,
    required: true
  },
  extraData: {
    type: String
  },
  gasLimit: {
    type: Number,
    required: true
  },
  gasUsed: {
    type: Number,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  logsBloom: {
    type: String
  },
  miner: {
    type: String,
    required: true
  },
  nonce: {
    type: String
  },
  number: {
    type: Number,
    required: true
  },
  parentHash: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  receiptsRoot: {
    type: String,
    required: true
  },
  sha3Uncles: {
    type: String,
    required: true
  },
  stateRoot: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  totalDifficulty: {
    type: Number,
    required: true
  },
  transactionsRoot: {
    type: String,
    required: true
  },
  uncles: {
    type: String
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
BlockSchema.method({});

/**
 * Statics
 */
BlockSchema.statics = {
  /**
   * Get block by id
   * @param {ObjectId} id - The objectId of block.
   * @returns {Promise<Block, APIError>}
   */
  get: function get(id) {
    return this.findById(id).exec().then(function (block) {
      if (block) {
        return block;
      }
      var err = new _APIError2.default('用户不存在!', _httpStatus2.default.NOT_FOUND, true);
      return _bluebird2.default.reject(err);
    });
  },


  /**
   * Get block by blockname
   * @param {name} blockname - The name of block
   * @returns {Promise<Block, APIError>}
   */
  getByName: function getByName(blockname) {
    return this.findOne({ blockname: blockname }).exec().then(function (block) {
      if (block) {
        return block;
      }
      var err = new _APIError2.default('用户不存在!', _httpStatus2.default.NOT_FOUND, true);
      return _bluebird2.default.reject(err);
    });
  },


  /**
   * List blocks in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of blocks to be skipped.
   * @param {number} limit - Limit number of blocks to be returned.
   * @returns {Promise<Block[]>}
   */
  list: function list() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$page = _ref.page,
        page = _ref$page === undefined ? 0 : _ref$page,
        _ref$pageSize = _ref.pageSize,
        pageSize = _ref$pageSize === undefined ? 200 : _ref$pageSize;

    var skip = Number(pageSize * page);
    return this.find({}).sort({ timestamp: -1 }).skip(+skip).limit(+pageSize).exec();
  }
};

/**
 * @typedef Block
 */
exports.default = _mongoose2.default.model('Block', BlockSchema);
//# sourceMappingURL=block.model.js.map
