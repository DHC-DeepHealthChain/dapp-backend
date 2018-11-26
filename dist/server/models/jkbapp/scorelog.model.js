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
 * ScoreLog Schema
 */
var ScoreLogSchema = (0, _mongooseExtendSchema.extendSchema)(_mongooseExtendSchema.BaseEntity, {
  userId: {
    type: String,
    required: true
  },
  scoreType: {
    type: String,
    required: true
  },
  /** 已阅读 */
  looked: {
    type: Boolean,
    required: false
  },
  /** 已添加至ipfs */
  onIpfs: {
    type: Boolean,
    required: false
  }
});

/**
 * method
 */
ScoreLogSchema.method({});

/**
 * statics
 */
ScoreLogSchema.statics = {
  get: function get(id) {
    return this.findById(id).lean().exec().then(function (score) {
      if (score) {
        return score;
      }
      var err = new _APIError2.default('记录不存在!', _httpStatus2.default.NOT_FOUND, true);
      return _bluebird2.default.reject(err);
    });
  },
  list: function list() {
    var pageSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var userId = arguments[2];
    var lookedFlag = arguments[3];

    var skip = Number(pageSize * page);
    if (lookedFlag === 'true') {
      return this.find({ userId: userId, looked: { $ne: false } }).sort({ createdDate: -1 }).skip(+skip).limit(+pageSize).lean().exec();
    }
    return this.find({ userId: userId, looked: false }).sort({ createdDate: -1 }).skip(+skip).limit(+pageSize).lean().exec();
  },
  checkExist: function checkExist(userId, scoreType) {
    return this.find({ userId: userId, scoreType: scoreType }).sort({ createdDate: -1 }).lean().exec().then(function (scorelogs) {
      if (scorelogs.length > 0) {
        return true;
      }
      return false;
    });
  },
  countAll: function countAll() {
    return this.count({}).lean().exec();
  },
  countByUserId: function countByUserId(userId, looked) {
    if (looked === 'true') {
      return this.count({ userId: userId, looked: { $ne: false } }).lean().exec();
    }
    return this.count({ userId: userId, looked: false }).lean().exec();
  },
  countByUserIdAndScoreType: function countByUserIdAndScoreType(userId, scoreType) {
    return this.count({ userId: userId, scoreType: scoreType }).lean().exec();
  },
  readableByUserIdAndTaskTypeAndDate: function readableByUserIdAndTaskTypeAndDate(userId, taskType, todayStartDate) {
    return this.find({ userId: userId, scoreType: taskType, createdDate: { $gt: todayStartDate } }) // eslint-disable-line
    .sort({ createdDate: -1 }).lean().exec().then(function (scorelogs) {
      if (scorelogs.length >= 4) {
        return true;
      }
      return false;
    });
  },
  shareableByUserIdAndTaskTypeAndDate: function shareableByUserIdAndTaskTypeAndDate(userId, taskType, todayStartDate) {
    return this.find({ userId: userId, scoreType: taskType, createdDate: { $gt: todayStartDate } }) // eslint-disable-line
    .sort({ createdDate: -1 }).lean().exec().then(function (scorelogs) {
      if (scorelogs.length > 0) {
        return true;
      }
      return false;
    });
  },
  aa: function aa() {
    return this.find({ createdDate: {
        $gte: new Date('2018-05-15T00:00:00.000Z'),
        $lte: new Date('2018-05-15T12:00:00.000Z') } }).sort({ createdDate: -1 }).lean().exec();
  },
  findAllByUserId: function findAllByUserId(userId, looked) {
    return this.find({ userId: userId, looked: looked }).sort({ createdDate: -1 }).lean().exec();
  },
  findByOnChain: function findByOnChain() {
    return this.find({ onIpfs: false }).limit(2).lean().exec();
  }
};

/**
 * @typedef ScoreLog
 */
exports.default = _mongoose2.default.model('ScoreLog', ScoreLogSchema);
//# sourceMappingURL=scorelog.model.js.map
