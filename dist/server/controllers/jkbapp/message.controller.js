'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 获取所有消息
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
var getList = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$query, _req$query$pageSize, pageSize, _req$query$page, page, userId, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, _req$query$pageSize = _req$query.pageSize, pageSize = _req$query$pageSize === undefined ? 20 : _req$query$pageSize, _req$query$page = _req$query.page, page = _req$query$page === undefined ? 0 : _req$query$page;
            userId = (0, _jwtUtil.getUserId)(req, res);
            _context.next = 4;
            return _message2.default.getList(userId, pageSize, page);

          case 4:
            result = _context.sent;
            return _context.abrupt('return', res.json(new _responseData2.default(result, false, null)));

          case 6:
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
 * 添加一个消息
 * @param {*} res
 * @param {*} req
 */


var create = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var userid, type, contentT, otherIdT, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userid = req.body.userId;
            type = req.body.messageType;
            contentT = req.body.content;
            otherIdT = req.body.otherId;
            _context2.next = 6;
            return _message2.default.create(userid, type, contentT, otherIdT);

          case 6:
            result = _context2.sent;
            return _context2.abrupt('return', res.json(new _responseData2.default(null, false, result)));

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function create(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 设置消息已读
 * @param {*} res
 * @param {*} req
 */


var read = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var messageId, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            messageId = req.params.messageId;
            _context3.next = 3;
            return _message2.default.read(messageId);

          case 3:
            result = _context3.sent;
            return _context3.abrupt('return', res.json(new _responseData2.default(null, false, result)));

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function read(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _jwtUtil = require('../../utils/jwtUtil');

var _message = require('../../services/jkbapp/message.service');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = { getList: getList, create: create, read: read };
//# sourceMappingURL=message.controller.js.map
