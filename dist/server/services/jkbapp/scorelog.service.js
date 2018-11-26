'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 获取积分日志列表
 * @param {*} userId
 * @param {*} pageSize
 * @param {*} page
 */
var getList = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId, pageSize, page, looked) {
    var scoreLogs;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _scorelog2.default.list(pageSize, page, userId, looked);

          case 2:
            scoreLogs = _context.sent;

            if (!(scoreLogs !== null)) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return (0, _ipfsList.getContentsByHash)(scoreLogs);

          case 6:
            scoreLogs = _context.sent;

          case 7:
            return _context.abrupt('return', scoreLogs);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getList(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 添加积分日志
 * @param {*} userid
 * @param {*} taskType
 * @param {*} addScore
 */


var create = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userid, taskType) {
    var addScore, ipfsData, hash, scoreLog;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _task2.default.getScoreByTaskType(taskType);

          case 2:
            addScore = _context2.sent;

            // 定义ipfs中存储的数据
            ipfsData = {
              userId: userid,
              scoreType: taskType,
              score: addScore
            };
            // 上传到IPFS

            _context2.next = 6;
            return (0, _ipfsFile.addContent)(ipfsData);

          case 6:
            hash = _context2.sent;

            // 定义mongo存储的数据
            scoreLog = new _scorelog2.default({
              ipfsHash: hash,
              userId: userid,
              scoreType: taskType,
              looked: false,
              onIpfs: false
            });
            // 保存数据库

            _scorelog2.default.create(scoreLog);
            // 上传到合约 代做
            return _context2.abrupt('return', '添加成功');

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function create(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 设置积分日志已阅读
 * 并给用户添加对应积分
 * @param {*} scoreLogId
 */


var lookScoreLog = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_id) {
    var scoreLog;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _scorelog2.default.get(_id);

          case 2:
            scoreLog = _context3.sent;

            if (!scoreLog.looked) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt('return', new _responseData2.default(null, true, '已添加过对应积分'));

          case 5:
            _context3.next = 7;
            return _scorelog2.default.findOneAndUpdate({ _id: _id }, { looked: true });

          case 7:
            scoreLog = _context3.sent;
            return _context3.abrupt('return', new _responseData2.default(scoreLog, false, null));

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function lookScoreLog(_x7) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * 设置积分日志  上链
 * @param {*} scoreLogId
 */


var scoreLogOnIpfs = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_id) {
    var scoreLog;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _scorelog2.default.get(_id);

          case 2:
            scoreLog = _context4.sent;

            if (!scoreLog.onChain) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt('return', new _responseData2.default(null, true, '已上传至链'));

          case 5:
            _context4.next = 7;
            return _scorelog2.default.findOneAndUpdate({ _id: _id }, { onIpfs: true });

          case 7:
            scoreLog = _context4.sent;
            return _context4.abrupt('return', new _responseData2.default(scoreLog, false, null));

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function scoreLogOnIpfs(_x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * 根据积分日志id获取详情
 * @param {*} scoreLogId
 */


var getScoreLogInfoById = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(scoreLogId) {
    var scorelog;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _scorelog2.default.get(scoreLogId);

          case 2:
            scorelog = _context5.sent;
            _context5.next = 5;
            return (0, _ipfsFile.getContent)(scorelog.ipfsHash);

          case 5:
            scorelog.content = _context5.sent;
            return _context5.abrupt('return', new _responseData2.default(scorelog, false, null));

          case 7:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getScoreLogInfoById(_x9) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * 检查积分不对的账户
 */


var aa = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var users, usersTemp, newUsers;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _user2.default.findAllUsers();

          case 2:
            users = _context6.sent;
            usersTemp = users.map(function (item) {
              return bb(item);
            });
            _context6.next = 6;
            return Promise.all(usersTemp);

          case 6:
            newUsers = _context6.sent;
            return _context6.abrupt('return', new _responseData2.default(newUsers, false, null));

          case 8:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function aa() {
    return _ref6.apply(this, arguments);
  };
}();

var bb = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(item) {
    var scoreLogs, addTemp, add, totalScore, result;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _scorelog2.default.findAllByUserId(item._id, true);

          case 2:
            scoreLogs = _context7.sent;
            addTemp = scoreLogs.map(function (scoreLog) {
              return cc(scoreLog.scoreType);
            });
            _context7.next = 6;
            return Promise.all(addTemp);

          case 6:
            add = _context7.sent;
            totalScore = 0;

            if (add.length > 0) {
              totalScore = add.reduce(function (previousValue, currentValue) {
                return previousValue + currentValue;
              });
            }
            item.newScore = totalScore; // eslint-disable-line

            if (!(Number(item.score) !== Number(item.newScore))) {
              _context7.next = 13;
              break;
            }

            result = { mobile: item.mobileNumber, score: item.score, newScore: item.newScore };
            // await User.findByIdAndUpdate({ _id: item._id }, { score: item.newScore });

            return _context7.abrupt('return', result);

          case 13:
            return _context7.abrupt('return', null);

          case 14:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function bb(_x10) {
    return _ref7.apply(this, arguments);
  };
}();

var cc = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(scoreType) {
    var score, task;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            score = 0;
            _context8.next = 3;
            return _task4.default.fingByTaskType(scoreType);

          case 3:
            task = _context8.sent;

            score = Number(score) + Number(task[0].score);
            return _context8.abrupt('return', score);

          case 6:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function cc(_x11) {
    return _ref8.apply(this, arguments);
  };
}();

var _scorelog = require('../../models/jkbapp/scorelog.model');

var _scorelog2 = _interopRequireDefault(_scorelog);

var _ipfsFile = require('../../utils/ipfsFile');

var _ipfsList = require('../../utils/ipfsList');

var _task = require('./task.service');

var _task2 = _interopRequireDefault(_task);

var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _user = require('../../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _task3 = require('../../models/jkbapp/task.model');

var _task4 = _interopRequireDefault(_task3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = { getList: getList, create: create, lookScoreLog: lookScoreLog, getScoreLogInfoById: getScoreLogInfoById, aa: aa, scoreLogOnIpfs: scoreLogOnIpfs };
//# sourceMappingURL=scorelog.service.js.map
