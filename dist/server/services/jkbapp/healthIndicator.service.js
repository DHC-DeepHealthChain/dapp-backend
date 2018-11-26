'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 获取用户指标项的最后一条记录
 * @param {*} userId
 */
var getlastList = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId) {
    var arr;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            arr = {};
            _context.next = 3;
            return getHealthIndicatorLast1ByUserIdAndHealthType(userId, 'bloodPressure');

          case 3:
            arr.bloodPressure = _context.sent;
            _context.next = 6;
            return getHealthIndicatorLast1ByUserIdAndHealthType(userId, 'weight');

          case 6:
            arr.weight = _context.sent;
            _context.next = 9;
            return getHealthIndicatorLast1ByUserIdAndHealthType(userId, 'step');

          case 9:
            arr.step = _context.sent;
            _context.next = 12;
            return getHealthIndicatorLast1ByUserIdAndHealthType(userId, 'waistline');

          case 12:
            arr.waistline = _context.sent;
            _context.next = 15;
            return getHealthIndicatorLast1ByUserIdAndHealthType(userId, 'temperature');

          case 15:
            arr.temperature = _context.sent;
            _context.next = 18;
            return getHealthIndicatorLast1ByUserIdAndHealthType(userId, 'heartRate');

          case 18:
            arr.heartRate = _context.sent;
            return _context.abrupt('return', arr);

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getlastList(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getHealthIndicatorLast1ByUserIdAndHealthType = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userId, healthType) {
    var data, content;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _healthIndicator2.default.getLast1ByUserIdAndHealthType(userId, healthType);

          case 2:
            data = _context2.sent;

            if (!data) {
              _context2.next = 11;
              break;
            }

            _context2.next = 6;
            return (0, _ipfsFile.getContent)(data[0].ipfsHash);

          case 6:
            content = _context2.sent;

            if (!content) {
              _context2.next = 10;
              break;
            }

            data[0].content = content;
            return _context2.abrupt('return', data[0]);

          case 10:
            return _context2.abrupt('return', null);

          case 11:
            return _context2.abrupt('return', null);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getHealthIndicatorLast1ByUserIdAndHealthType(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 根据类型获取健康指标项集合
 * @param {*} userId 用户id
 * @param {*} pageSize
 * @param {*} page
 * @param {*} healthType 健康指标类型
 */


var getList = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userId, pageSize, page, healthType) {
    var healthIndicators, total, pagination;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _healthIndicator2.default.list({ pageSize: pageSize, page: page, userId: userId, healthType: healthType });

          case 2:
            healthIndicators = _context3.sent;

            if (!(healthIndicators !== null)) {
              _context3.next = 7;
              break;
            }

            _context3.next = 6;
            return (0, _ipfsList.getContentsByHash)(healthIndicators);

          case 6:
            healthIndicators = _context3.sent;

          case 7:
            _context3.next = 9;
            return _healthIndicator2.default.countByHealthType();

          case 9:
            total = _context3.sent;

            // 组装分页结果
            pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
            // 下次app发版是解开
            // const result = { list: healthIndicators, pagination };

            return _context3.abrupt('return', healthIndicators);

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getList(_x4, _x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * 创建健康指标
 * @param {*} htype 上传健康指标 类型
 * @param {*} userid 用户id
 * @param {*} body 指标项内容
 */


var create = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(htype, userid, body) {
    var todayStartDate, flag, taskType, scoreResultBody;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // 获取今日开始时间
            todayStartDate = _dateUtil2.default.getDayStartDate();
            // 判断今日是否已上传数据

            _context4.next = 3;
            return _healthIndicator2.default.getByDateGreatThenAndHealthTypeAndUserId(todayStartDate, htype, userid);

          case 3:
            flag = _context4.sent;

            if (!(htype !== 'step' && flag)) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt('return', new _responseData2.default(null, true, '今日已上传过该类型的健康指标数据'));

          case 6:
            _context4.next = 8;
            return buildHeathIndicator(htype, userid, body, flag);

          case 8:
            if (flag) {
              _context4.next = 15;
              break;
            }

            // 添加积分
            taskType = 'HealthIndicator';
            _context4.next = 12;
            return _score2.default.update(userid, taskType);

          case 12:
            scoreResultBody = _context4.sent;

            if (!(scoreResultBody !== null && scoreResultBody.error)) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt('return', new _responseData2.default(null, true, scoreResultBody.message));

          case 15:
            return _context4.abrupt('return', new _responseData2.default(null, false, '添加成功'));

          case 16:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function create(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * 删除健康指标
 * @param {*} objectId 指标项 id
 */


var remove = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_id) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _healthIndicator2.default.findByIdAndUpdate({ _id: _id }, { delete: true });

          case 2:
            return _context5.abrupt('return', '删除成功');

          case 3:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function remove(_x11) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * 添加步数
 * @param {*} htype 上传健康指标 类型
 * @param {*} userid 用户id
 * @param {*} body 指标项内容
 */


var createStep = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(htype, userid, step) {
    var todayStartDate, healthIndicator, _result, content, oldStep, _id, result;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            // 获取今日开始时间
            todayStartDate = _dateUtil2.default.getDayStartDate();
            // 判断今日是否已上传数据

            _context6.next = 3;
            return _healthIndicator2.default.getStepByDateGreatThenAndUserId(todayStartDate, userid);

          case 3:
            healthIndicator = _context6.sent;

            if (!(healthIndicator === null)) {
              _context6.next = 9;
              break;
            }

            _context6.next = 7;
            return stepCreate(userid, step);

          case 7:
            _result = _context6.sent;
            return _context6.abrupt('return', _result);

          case 9:
            _context6.next = 11;
            return (0, _ipfsFile.getContent)(healthIndicator.ipfsHash);

          case 11:
            content = _context6.sent;
            oldStep = JSON.parse(content).content;
            _id = healthIndicator._id;
            _context6.next = 16;
            return stepUpdate(userid, oldStep, step, _id);

          case 16:
            result = _context6.sent;
            return _context6.abrupt('return', result);

          case 18:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function createStep(_x12, _x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}();

/** 内部方法 *****************************************/


var buildHeathIndicator = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(htype, userid, body, flag) {
    var ipfsData, hash, healthIndicator, oldHealthIndicators;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            // 定义ipfs中存储的数据
            ipfsData = {
              userId: userid,
              healthType: htype,
              content: body
            };
            // 上传到IPFS,返回对应hash

            _context7.next = 3;
            return (0, _ipfsFile.addContent)(ipfsData);

          case 3:
            hash = _context7.sent;

            if (flag) {
              _context7.next = 11;
              break;
            }

            // 定义 healthIndicator对象数据
            healthIndicator = new _healthIndicator2.default({
              ipfsHash: hash,
              userId: userid,
              healthType: htype
            });
            // 保存数据库

            _context7.next = 8;
            return _healthIndicator2.default.create(healthIndicator);

          case 8:
            return _context7.abrupt('return', new _responseData2.default(null, true, '今日已上传过该类型的健康指标数据'));

          case 11:
            if (!(htype === 'step' && flag)) {
              _context7.next = 17;
              break;
            }

            _context7.next = 14;
            return _healthIndicator2.default.getLast1ByUserIdAndHealthType(userid, htype);

          case 14:
            oldHealthIndicators = _context7.sent;
            _context7.next = 17;
            return _healthIndicator2.default.findByIdAndUpdate({ _id: oldHealthIndicators[0]._id }, { $set: { ipfsHash: hash } });

          case 17:
            return _context7.abrupt('return', '添加成功');

          case 18:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function buildHeathIndicator(_x15, _x16, _x17, _x18) {
    return _ref7.apply(this, arguments);
  };
}();

var stepCreate = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(userId, step) {
    var ipfsData, hash, healthIndicator, taskType;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            // 定义ipfs中存储的数据
            ipfsData = {
              userId: userId,
              healthType: 'step',
              content: step
            };
            // 上传到IPFS,返回对应hash

            _context8.next = 3;
            return (0, _ipfsFile.addContent)(ipfsData);

          case 3:
            hash = _context8.sent;

            // 定义 healthIndicator对象数据
            healthIndicator = new _healthIndicator2.default({
              ipfsHash: hash,
              userId: userId,
              healthType: 'step'
            });
            // 保存数据库

            _context8.next = 7;
            return _healthIndicator2.default.create(healthIndicator);

          case 7:
            taskType = void 0;

            if (Number(step) < 3000) {
              taskType = undefined;
            } else if (Number(step) >= 3000 && Number(step) < 7000) {
              taskType = 'Step3000';
            } else if (Number(step) >= 7000) {
              taskType = 'Step7000';
            }

            if (!(taskType !== undefined)) {
              _context8.next = 12;
              break;
            }

            _context8.next = 12;
            return _scorelog2.default.create(userId, taskType);

          case 12:
            return _context8.abrupt('return', new _responseData2.default(null, false, '添加成功'));

          case 13:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function stepCreate(_x19, _x20) {
    return _ref8.apply(this, arguments);
  };
}();

var stepUpdate = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(userId, oldStep, step, _id) {
    var ipfsData, hash, taskType;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            // 定义ipfs中存储的数据
            ipfsData = {
              userId: userId,
              healthType: 'step',
              content: step
            };
            // 上传到IPFS,返回对应hash

            _context9.next = 3;
            return (0, _ipfsFile.addContent)(ipfsData);

          case 3:
            hash = _context9.sent;
            _context9.next = 6;
            return _healthIndicator2.default.findByIdAndUpdate({ _id: _id }, { ipfsHash: hash });

          case 6:
            taskType = void 0;

            if (oldStep < 3000) {
              if (step < 3000) {
                taskType = undefined;
              } else if (step >= 3000 && step < 7000) {
                taskType = 'Step3000';
              } else if (step >= 7000) {
                taskType = 'Step7000';
              }
            } else if (oldStep >= 3000 && oldStep < 7000) {
              if (step >= 3000 && step < 7000) {
                taskType = undefined;
              } else if (step >= 7000) {
                taskType = 'Step3000';
              }
            } else if (oldStep >= 7000) {
              taskType = undefined;
            }

            if (!(taskType !== undefined)) {
              _context9.next = 11;
              break;
            }

            _context9.next = 11;
            return _scorelog2.default.create(userId, taskType);

          case 11:
            return _context9.abrupt('return', new _responseData2.default(null, false, '修改成功'));

          case 12:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function stepUpdate(_x21, _x22, _x23, _x24) {
    return _ref9.apply(this, arguments);
  };
}();
/** 内部方法 *****************************************/

var _ipfsFile = require('../../utils/ipfsFile');

var _dateUtil = require('../../utils/dateUtil');

var _dateUtil2 = _interopRequireDefault(_dateUtil);

var _healthIndicator = require('../../models/jkbapp/healthIndicator.model');

var _healthIndicator2 = _interopRequireDefault(_healthIndicator);

var _score = require('../../services/jkbapp/score.service');

var _score2 = _interopRequireDefault(_score);

var _ipfsList = require('../../utils/ipfsList');

var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _scorelog = require('./scorelog.service');

var _scorelog2 = _interopRequireDefault(_scorelog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = { getlastList: getlastList, getList: getList, create: create, createStep: createStep, remove: remove };
//# sourceMappingURL=healthIndicator.service.js.map
