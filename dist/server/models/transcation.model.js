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
 * Transcation Schema
 */
var TranscationSchema = new _mongoose2.default.Schema({
  blockHash: {
    type: String,
    required: true,
    unique: true
  },
  blockNumber: {
    type: Number,
    required: true
  },
  from: {
    type: String
  },
  gas: {
    type: Number,
    required: true
  },
  gasPrice: {
    type: Number,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  input: {
    type: String
  },
  nonce: {
    type: String
  },
  to: {
    type: String
  },
  transactionIndex: {
    type: Number
  },
  value: {
    type: Number
  },
  timestamp: {
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
TranscationSchema.method({});

/**
 * Statics
 */
TranscationSchema.statics = {
  /**
   * Get transcation by id
   * @param {ObjectId} id - The objectId of transcation.
   * @returns {Promise<Transcation, APIError>}
   */
  get: function get(id) {
    return this.findById(id).exec().then(function (transcation) {
      if (transcation) {
        return transcation;
      }
      var err = new _APIError2.default('用户不存在!', _httpStatus2.default.NOT_FOUND, true);
      return _bluebird2.default.reject(err);
    });
  },


  /**
   * Get transcation by transcationname
   * @param {name} transcationname - The name of transcation
   * @returns {Promise<Transcation, APIError>}
   */
  getByName: function getByName(transcationname) {
    return this.findOne({ transcationname: transcationname }).exec().then(function (transcation) {
      if (transcation) {
        return transcation;
      }
      var err = new _APIError2.default('用户不存在!', _httpStatus2.default.NOT_FOUND, true);
      return _bluebird2.default.reject(err);
    });
  },


  /**
   * Get transcation by transcationname
   * @param {name} transcationname - The name of transcation
   * @returns {Promise<Transcation, APIError>}
   */
  checkByName: function checkByName(transcationname) {
    return this.findOne({ transcationname: transcationname }).exec().then(function (transcation) {
      if (transcation) {
        return true;
      }
      return false;
    });
  },


  /**
   * get list
   */
  list: function list(pageSize, page) {
    var skip = Number(pageSize * page);
    return this.find({}).sort({ timestamp: -1, _id: 1 }).skip(+skip).limit(+pageSize).lean().exec();
  },


  /**
   * 根据公钥查询交易记录
   * Model.find({"$or" :  [ {‘age’:18} , {‘name’:‘xueyou’} ] });
   */
  findByFromOrTo: function findByFromOrTo(pageSize, page, publicKey) {
    var skip = Number(pageSize * page);
    return this.find({ $or: [{ from: publicKey }, { to: publicKey }] }).sort({ timestamp: -1, _id: 1 }).skip(+skip).limit(+pageSize).lean().exec();
  },
  countAll: function countAll() {
    return this.count({}).lean().exec();
  },
  countByPublicKey: function countByPublicKey(publicKey) {
    return this.count({ $or: [{ from: publicKey }, { to: publicKey }] }).lean().exec();
  }
};

/**
 * @typedef Transcation
 */
exports.default = _mongoose2.default.model('Transcation', TranscationSchema);
//# sourceMappingURL=transcation.model.js.map
