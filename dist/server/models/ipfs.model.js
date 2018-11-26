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
var IpfsSchema = (0, _mongooseExtendSchema.extendSchema)(_mongooseExtendSchema.BaseEntity, {
  userId: {
    type: String,
    required: true
  },
  ipfsHash: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileTitle: {
    type: String,
    required: true
  }
});

/**
 * Methods
 */
IpfsSchema.method({});

/**
 * Statics
 */
IpfsSchema.statics = {
  /**
   * Get ipfs by id
   * @param {ObjectId} id - The objectId of ipfs.
   * @returns {Promise<Ipfs, APIError>}
   */
  get: function get(id) {
    return this.findById(id).lean().exec().then(function (ipfs) {
      if (ipfs) {
        return ipfs;
      }
      var err = new _APIError2.default('数据不存在!', _httpStatus2.default.NOT_FOUND, true);
      return _bluebird2.default.reject(err);
    });
  },


  /**
   * List ipfss in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of ipfss to be skipped.
   * @param {number} limit - Limit number of ipfss to be returned.
   * @returns {Promise<Ipfs[]>}
   */
  list: function list() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$page = _ref.page,
        page = _ref$page === undefined ? 0 : _ref$page,
        _ref$pageSize = _ref.pageSize,
        pageSize = _ref$pageSize === undefined ? 200 : _ref$pageSize;

    var skip = Number(pageSize * page);
    return this.find({}).sort({ createdAt: -1 }).skip(+skip).limit(+pageSize).lean().exec();
  },


  /**
   * 根据用户id，类型 查找上传记录
   * @param {*} userId
   * @param {*} pageSize
   * @param {*} page
   * @param {*} fileType
   */
  findByUserIdAndFileType: function findByUserIdAndFileType(userId, pageSize, page, fileType) {
    var skip = Number(pageSize * page);
    return this.find({ userId: userId, fileType: fileType }).sort({ createdAt: -1 }).skip(+skip).limit(+pageSize).lean().exec();
  },


  /**
   * 根据 类型 查找上传记录
   * @param {*} userId
   * @param {*} pageSize
   * @param {*} page
   * @param {*} fileType
   */
  findByFileType: function findByFileType(pageSize, page, fileType) {
    var skip = Number(pageSize * page);
    return this.find({ fileType: fileType }).sort({ createdAt: -1 }).skip(+skip).limit(+pageSize).lean().exec();
  },


  /**
   * 根据用户id和类型，和今日开始时间，检测今日是否达到上传上限
   * @param {*} userId
   * @param {*} fileType
   * @param {*} todayStartDate
   */
  checkCreateMedia: function checkCreateMedia(userId, fileType, todayStartDate) {
    return this.find({ userId: userId, fileType: fileType, createdDate: { $gt: todayStartDate } }).sort({ createdAt: -1 }).lean().exec().then(function (ipfss) {
      if (ipfss.length > 1) {
        return true;
      }
      return false;
    });
  },


  /**
   * 根据 用户id 类型 计算上传总数
   * @param {*} userId
   * @param {*} fileType
   */
  countByUserIdAndFileType: function countByUserIdAndFileType(userId, fileType) {
    return this.count({ userId: userId, fileType: fileType }).lean().exec();
  },


  /**
   * 根据 类型 计算上传总数
   */
  countByFileType: function countByFileType(fileType) {
    return this.count({ fileType: fileType }).lean().exec();
  }
};

/**
 * @typedef Ipfs
 */
exports.default = _mongoose2.default.model('Ipfs', IpfsSchema);
//# sourceMappingURL=ipfs.model.js.map
