'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 同步用户积分上ipfs
 */
var syncScore = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var users, usersTemp;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user2.default.findAllUsers();

          case 2:
            users = _context.sent;
            usersTemp = users.map(function (item) {
              return syncScoreMethod(item);
            });
            _context.next = 6;
            return Promise.all(usersTemp);

          case 6:
            return _context.abrupt('return', new _responseData2.default('完成', false, null));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function syncScore() {
    return _ref.apply(this, arguments);
  };
}();

var syncScoreMethod = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(item) {
    var score, ipfsData, hash;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _score2.default.getByUserId(item._id);

          case 2:
            score = _context2.sent;

            if (!(score === null)) {
              _context2.next = 10;
              break;
            }

            _context2.next = 6;
            return _score4.default.create(item._id);

          case 6:
            score = _context2.sent;
            _context2.next = 9;
            return _score2.default.getByUserId(item._id);

          case 9:
            score = _context2.sent;

          case 10:
            // 定义ipfs中存储的数据
            ipfsData = {
              userId: item._id,
              score: item.score
            };
            // 上传到IPFS

            _context2.next = 13;
            return (0, _ipfsFile.addContent)(ipfsData);

          case 13:
            hash = _context2.sent;
            _context2.next = 16;
            return _score2.default.findByIdAndUpdate({ _id: score._id }, { ipfsHash: hash });

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function syncScoreMethod(_x) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 同步积分日志上链
 */


var syncScoreLog = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var scoreLogs, usersTemp;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _scorelog2.default.findByOnChain();

          case 2:
            scoreLogs = _context3.sent;
            usersTemp = scoreLogs.map(function (item) {
              return syncScoreLogMethod(item);
            });
            _context3.next = 6;
            return Promise.all(usersTemp);

          case 6:
            return _context3.abrupt('return', new _responseData2.default('完成', false, null));

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function syncScoreLog() {
    return _ref3.apply(this, arguments);
  };
}();

var syncScoreLogMethod = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(scoreLog) {
    var taskScore, tokenContract, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _task2.default.getScoreByTaskType(scoreLog.scoreType);

          case 2:
            taskScore = _context4.sent;

            console.log('taskScore', taskScore);

            if (!(taskScore < 10000)) {
              _context4.next = 15;
              break;
            }

            // 产生交易
            tokenContract = new _tokenContract2.default();
            _context4.next = 8;
            return _user2.default.get(scoreLog.userId);

          case 8:
            user = _context4.sent;

            if (!(user && user.publicKey)) {
              _context4.next = 13;
              break;
            }

            console.log(user.publicKey, taskScore);
            _context4.next = 13;
            return tokenContract.transferToken(user.publicKey, taskScore);

          case 13:
            _context4.next = 16;
            break;

          case 15:
            console.log('发送的积分超过10000');

          case 16:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function syncScoreLogMethod(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _responseData = require('../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _score = require('../models/jkbapp/score.model');

var _score2 = _interopRequireDefault(_score);

var _scorelog = require('../models/jkbapp/scorelog.model');

var _scorelog2 = _interopRequireDefault(_scorelog);

var _score3 = require('../services/jkbapp/score.service');

var _score4 = _interopRequireDefault(_score3);

var _task = require('../services/jkbapp/task.service');

var _task2 = _interopRequireDefault(_task);

var _ipfsFile = require('../utils/ipfsFile');

var _tokenContract = require('../helpers/tokenContract');

var _tokenContract2 = _interopRequireDefault(_tokenContract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import scoreLogService from '../services/jkbapp/scorelog.service';


exports.default = { syncScore: syncScore, syncScoreLog: syncScoreLog };
//# sourceMappingURL=schedule.service.js.map
