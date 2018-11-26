'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 根据任务列表
 */
var getList = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(pageSize, page) {
    var tasks, total, pagination;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _task2.default.list();

          case 2:
            tasks = _context2.sent;

            if (!tasks) {
              _context2.next = 7;
              break;
            }

            _context2.next = 6;
            return (0, _ipfsList.getContentsByHash)(tasks);

          case 6:
            tasks = _context2.sent;

          case 7:
            _context2.next = 9;
            return _task2.default.countAll();

          case 9:
            total = _context2.sent;

            // 组装分页结果
            pagination = { pageSize: parseInt(pageSize, 10), current: parseInt(page, 10), total: parseInt(total, 10) }; // eslint-disable-line
            // 下次app发版是解开
            // const result = { list: tasks, pagination };

            return _context2.abrupt('return', tasks);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getList(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 获取任务详情
 * @param {*} taskId
 */


var getInfo = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(taskId) {
    var task;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _task2.default.get(taskId);

          case 2:
            task = _context3.sent;

            if (!task) {
              _context3.next = 7;
              break;
            }

            _context3.next = 6;
            return getIpfsContent(task.ipfsHash);

          case 6:
            task.content = _context3.sent;

          case 7:
            return _context3.abrupt('return', task);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getInfo(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * 添加新任务
 * @param {*} userid
 * @param {*} contentT
 * @param {*} taskTypeT
 * @param {*} scoreT
 */


var create = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(userid, contentT, taskTypeT, scoreT) {
    var ipfsData, hash, task;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // 定义ipfs中存储的数据
            ipfsData = {
              userId: userid,
              content: contentT,
              taskType: taskTypeT,
              score: scoreT
            };
            // 上传到IPFS

            _context4.next = 3;
            return (0, _ipfsFile.addContent)(ipfsData);

          case 3:
            hash = _context4.sent;

            // 定义mongo存储的数据
            task = new _task2.default({
              ipfsHash: hash,
              userId: userid,
              taskType: taskTypeT,
              score: scoreT
            });
            // 保存数据库

            _context4.next = 7;
            return _task2.default.create(task);

          case 7:
            return _context4.abrupt('return', '添加成功');

          case 8:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function create(_x5, _x6, _x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * 根据任务类型获取任务积分
 * @param {*} taskType
 */


var getScoreByTaskType = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(taskType) {
    var tasks;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _task2.default.fingByTaskType(taskType);

          case 2:
            tasks = _context5.sent;

            if (!(tasks !== null && tasks.length > 0)) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt('return', tasks[0].score);

          case 5:
            return _context5.abrupt('return', 0);

          case 6:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getScoreByTaskType(_x9) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * 提交关注微信公众号的任务.
 * @param {*} userIds
 */


var taskForAttachWeChatPlatform = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userIds) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, userId, taskType;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context6.prev = 3;
            _iterator = userIds[Symbol.iterator]();

          case 5:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context6.next = 14;
              break;
            }

            userId = _step.value;

            console.log(userId);
            // 保存积分日志.
            taskType = 'AttachWeChatPlatform';
            _context6.next = 11;
            return _scorelog2.default.create(userId, taskType);

          case 11:
            _iteratorNormalCompletion = true;
            _context6.next = 5;
            break;

          case 14:
            _context6.next = 20;
            break;

          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6['catch'](3);
            _didIteratorError = true;
            _iteratorError = _context6.t0;

          case 20:
            _context6.prev = 20;
            _context6.prev = 21;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 23:
            _context6.prev = 23;

            if (!_didIteratorError) {
              _context6.next = 26;
              break;
            }

            throw _iteratorError;

          case 26:
            return _context6.finish(23);

          case 27:
            return _context6.finish(20);

          case 28:
            return _context6.abrupt('return', new _responseData2.default(null, false, '添加完成'));

          case 29:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this, [[3, 16, 20, 28], [21,, 23, 27]]);
  }));

  return function taskForAttachWeChatPlatform(_x10) {
    return _ref6.apply(this, arguments);
  };
}();

var _task = require('../../models/jkbapp/task.model');

var _task2 = _interopRequireDefault(_task);

var _ipfsFile = require('../../utils/ipfsFile');

var _ipfsList = require('../../utils/ipfsList');

var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _scorelog = require('./scorelog.service');

var _scorelog2 = _interopRequireDefault(_scorelog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getIpfsContent = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(hash) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _ipfsFile.getContent)(hash);

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getIpfsContent(_x) {
    return _ref.apply(this, arguments);
  };
}();exports.default = { getList: getList, create: create, getInfo: getInfo, getScoreByTaskType: getScoreByTaskType, taskForAttachWeChatPlatform: taskForAttachWeChatPlatform };
//# sourceMappingURL=task.service.js.map
