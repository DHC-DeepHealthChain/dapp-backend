'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 根据任务列表
 * @param {*} req
 * @param {*} res
 */
var getList = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$query, _req$query$pageSize, pageSize, _req$query$page, page, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, _req$query$pageSize = _req$query.pageSize, pageSize = _req$query$pageSize === undefined ? 20 : _req$query$pageSize, _req$query$page = _req$query.page, page = _req$query$page === undefined ? 0 : _req$query$page;
            _context.next = 3;
            return _task2.default.getList(pageSize, page);

          case 3:
            result = _context.sent;

            res.json(new _responseData2.default(result, false, null));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getList(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 获取任务详情
 * @param {*} req
 * @param {*} res
 */


var getInfo = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var taskId, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            taskId = req.params.taskId;
            _context2.next = 3;
            return _task2.default.getInfo(taskId);

          case 3:
            result = _context2.sent;

            res.json(new _responseData2.default(result, false, null));

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getInfo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 添加新任务
 * @param {*} req
 * @param {*} res
 */


var create = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var userid, contentT, taskTypeT, scoreT, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // 定义ipfs中存储的数据
            userid = (0, _jwtUtil.getUserId)(req, res);
            contentT = req.body.content;
            taskTypeT = req.body.taskType;
            scoreT = req.body.score;
            _context3.next = 6;
            return _task2.default.create(userid, contentT, taskTypeT, scoreT);

          case 6:
            result = _context3.sent;

            res.json(new _responseData2.default(null, false, result));

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function create(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * 提交关注微信公众号的任务
 * @param {*} req
 * @param {*} res
 */


var taskForAttachWeChatPlatform = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var userIds, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // 定义ipfs中存储的数据
            userIds = req.body.userIds;
            _context4.next = 3;
            return _task2.default.taskForAttachWeChatPlatform(userIds);

          case 3:
            result = _context4.sent;

            res.json(result);

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function taskForAttachWeChatPlatform(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _jwtUtil = require('../../utils/jwtUtil');

var _task = require('../../services/jkbapp/task.service');

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = { getList: getList, create: create, getInfo: getInfo, taskForAttachWeChatPlatform: taskForAttachWeChatPlatform };
//# sourceMappingURL=task.controller.js.map
