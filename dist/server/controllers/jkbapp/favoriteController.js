'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 根据类型获取收藏列表
 * @param {*} req
 * @param {*} res
 */
var getListByUserId = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$query, _req$query$pageSize, pageSize, _req$query$page, page, favoriteType, userId, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, _req$query$pageSize = _req$query.pageSize, pageSize = _req$query$pageSize === undefined ? 20 : _req$query$pageSize, _req$query$page = _req$query.page, page = _req$query$page === undefined ? 0 : _req$query$page, favoriteType = _req$query.favoriteType;
            userId = (0, _jwtUtil.getUserId)(req, res);
            _context.next = 4;
            return _favorite2.default.getListByUserId(userId, pageSize, page, favoriteType);

          case 4:
            result = _context.sent;

            res.json(new _responseData2.default(result, false, null));

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getListByUserId(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 添加一个收藏记录
 * @param {*} req
 * @param {*} res
 */


var create = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var userid, otherid, favoriteTypeT, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userid = (0, _jwtUtil.getUserId)(req, res);
            otherid = req.params.favoriteId;
            favoriteTypeT = req.body.favoriteType;
            _context2.next = 5;
            return _favorite2.default.create(userid, otherid, favoriteTypeT);

          case 5:
            result = _context2.sent;

            res.json(new _responseData2.default(result, false, null));

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
 * 取消收藏
 * @param {*} req
 * @param {*} res
 */


var remove = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var userId, otherId, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userId = (0, _jwtUtil.getUserId)(req, res);
            otherId = req.params.favoriteId;
            _context3.next = 4;
            return _favorite2.default.remove(userId, otherId);

          case 4:
            result = _context3.sent;

            res.json(new _responseData2.default(result, false, null));

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function remove(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _jwtUtil = require('../../utils/jwtUtil');

var _favorite = require('../../services/jkbapp/favorite.service');

var _favorite2 = _interopRequireDefault(_favorite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = { getListByUserId: getListByUserId, create: create, remove: remove };
//# sourceMappingURL=favoriteController.js.map
