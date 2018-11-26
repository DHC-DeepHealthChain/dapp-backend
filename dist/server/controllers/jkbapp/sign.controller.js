'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 获取签到列表
 * 只回去本周签到记录
 * @param {*} req
 * @param {*} res
 */
var getList = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var userId, _req$query, _req$query$pageSize, pageSize, _req$query$page, page, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = (0, _jwtUtil.getUserId)(req, res);
            _req$query = req.query, _req$query$pageSize = _req$query.pageSize, pageSize = _req$query$pageSize === undefined ? 20 : _req$query$pageSize, _req$query$page = _req$query.page, page = _req$query$page === undefined ? 0 : _req$query$page;
            _context.next = 4;
            return _sign2.default.getList(userId, pageSize, page);

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
 * 签到
 * @param {*} req
 * @param {*} res
 */


var create = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var userid, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userid = (0, _jwtUtil.getUserId)(req, res);
            _context2.next = 3;
            return _sign2.default.create(userid);

          case 3:
            result = _context2.sent;

            if (!result.error) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt('return', res.json(new _responseData2.default(null, true, result.message)));

          case 6:
            return _context2.abrupt('return', res.json(new _responseData2.default(null, false, result.message)));

          case 7:
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
 * 获取签到状态
 * @param {*} req
 * @param {*} res
 */


var getSignState = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var userId, reslut;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userId = (0, _jwtUtil.getUserId)(req, res);
            _context3.next = 3;
            return _sign2.default.getSignState(userId);

          case 3:
            reslut = _context3.sent;
            return _context3.abrupt('return', res.json(new _responseData2.default(reslut, false, null)));

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getSignState(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _jwtUtil = require('../../utils/jwtUtil');

var _sign = require('../../services/jkbapp/sign.service');

var _sign2 = _interopRequireDefault(_sign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = { getList: getList, create: create, getSignState: getSignState };
//# sourceMappingURL=sign.controller.js.map
