'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 获取用户指标项的最后一条记录
 * @param {*} req
 * @param {*} res
 */
var getlastList = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var userId, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = (0, _jwtUtil.getUserId)(req, res);
            _context.next = 3;
            return _healthIndicator2.default.getlastList(userId);

          case 3:
            result = _context.sent;
            return _context.abrupt('return', res.json(new _responseData2.default(result, false, null)));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getlastList(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 根据类型获取健康指标项集合
 * @param {*} req
 * @param {*} res
 */


var getList = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var userId, _req$query, _req$query$pageSize, pageSize, _req$query$page, page, healthType, result;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = (0, _jwtUtil.getUserId)(req, res); // 获取用户id

            _req$query = req.query, _req$query$pageSize = _req$query.pageSize, pageSize = _req$query$pageSize === undefined ? 20 : _req$query$pageSize, _req$query$page = _req$query.page, page = _req$query$page === undefined ? 0 : _req$query$page, healthType = _req$query.healthType;
            _context2.next = 4;
            return _healthIndicator2.default.getList(userId, pageSize, page, healthType);

          case 4:
            result = _context2.sent;
            return _context2.abrupt('return', res.json(new _responseData2.default(result, false, null)));

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getList(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 创建健康指标
 * @param {*} req
 * @param {*} res
 */


var create = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var htype, userid, body, resultBody;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            htype = req.body.healthType; // 获取上传健康指标 类型

            userid = (0, _jwtUtil.getUserId)(req, res); // 获取用户id

            body = req.body.content; // 指标项内容

            _context3.next = 5;
            return _healthIndicator2.default.create(htype, userid, body);

          case 5:
            resultBody = _context3.sent;
            return _context3.abrupt('return', res.json(new _responseData2.default(null, resultBody.error, resultBody.message)));

          case 7:
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
 * 删除健康指标
 * @param {*} req
 * @param {*} res
 */


var remove = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var healthIndicatorId, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            healthIndicatorId = req.params.healthIndicatorId; // 指标项 id

            _context4.next = 3;
            return _healthIndicator2.default.remove(healthIndicatorId);

          case 3:
            result = _context4.sent;
            return _context4.abrupt('return', res.json(new _responseData2.default(null, false, result)));

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function remove(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/** 二期 ************************************/

/**
 * 添加步数
 * @param {*} req
 * @param {*} res
 */


var createStep = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var userid, step, resultBody;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            userid = (0, _jwtUtil.getUserId)(req, res); // 获取用户id

            step = req.body.step; // 指标项内容

            _context5.next = 4;
            return _healthIndicator2.default.createStep('step', userid, step);

          case 4:
            resultBody = _context5.sent;
            return _context5.abrupt('return', res.json(resultBody));

          case 6:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function createStep(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _jwtUtil = require('../../utils/jwtUtil');

var _healthIndicator = require('../../services/jkbapp/healthIndicator.service');

var _healthIndicator2 = _interopRequireDefault(_healthIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = { getlastList: getlastList, getList: getList, create: create, createStep: createStep, remove: remove };
//# sourceMappingURL=healthIndicator.controller.js.map
