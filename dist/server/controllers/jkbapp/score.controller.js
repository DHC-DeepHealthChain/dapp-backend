'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 根据用户id获取对应积分
 * @param {*} req
 * @param {*} res
 */
var getScores = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var userId, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = (0, _jwtUtil.getUserId)(req, res);
            _context.next = 3;
            return _score2.default.getScores(userId);

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

  return function getScores(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 为新用户创建积分记录
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
            return _score2.default.create(userid);

          case 3:
            result = _context2.sent;

            if (!(result !== null)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt('return', res.json(new _responseData2.default(null, false, '添加成功')));

          case 6:
            return _context2.abrupt('return', res.json(new _responseData2.default(null, false, '添加失败')));

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
 * 更新积分
 * @param {*} req
 * @param {*} res
 */


var update = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var taskType, userid, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            taskType = req.query.taskType;
            userid = (0, _jwtUtil.getUserId)(req, res);
            _context3.next = 4;
            return _score2.default.update(userid, taskType);

          case 4:
            result = _context3.sent;
            return _context3.abrupt('return', res.json(new _responseData2.default(result)));

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function update(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * 获取积分日志
 * @param {*} req
 * @param {*} res
 */


var getScoreLogs = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var userid, _req$query, _req$query$pageSize, pageSize, _req$query$page, page, looked, result;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userid = (0, _jwtUtil.getUserId)(req, res);
            _req$query = req.query, _req$query$pageSize = _req$query.pageSize, pageSize = _req$query$pageSize === undefined ? 20 : _req$query$pageSize, _req$query$page = _req$query.page, page = _req$query$page === undefined ? 0 : _req$query$page, looked = _req$query.looked;
            _context4.next = 4;
            return _score2.default.getScoreLogs(userid, pageSize, page, looked);

          case 4:
            result = _context4.sent;
            return _context4.abrupt('return', res.json(new _responseData2.default(result)));

          case 6:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getScoreLogs(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * 获取积分排名
 * @param {*} req
 * @param {*} res
 */


var getScoreRanking = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$query2, _req$query2$pageSize, pageSize, _req$query2$page, page, order, result;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$query2 = req.query, _req$query2$pageSize = _req$query2.pageSize, pageSize = _req$query2$pageSize === undefined ? 20 : _req$query2$pageSize, _req$query2$page = _req$query2.page, page = _req$query2$page === undefined ? 0 : _req$query2$page, order = _req$query2.order;
            _context5.next = 3;
            return _score2.default.getScoreRanking(pageSize, page, order);

          case 3:
            result = _context5.sent;
            return _context5.abrupt('return', res.json(new _responseData2.default(result, false, null)));

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getScoreRanking(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * 设置积分日志已阅读
 * @param {*} req
 * @param {*} res
 */


var lookScoreLog = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var userId, scoreLogId, result;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            userId = (0, _jwtUtil.getUserId)(req, res);
            scoreLogId = req.params.scoreLogId;
            _context6.next = 4;
            return _score2.default.lookScoreLog(userId, scoreLogId);

          case 4:
            result = _context6.sent;
            return _context6.abrupt('return', res.json(result));

          case 6:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function lookScoreLog(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * 批量 阅读 积分日志
 * @param {*} req
 * @param {*} res
 */


var lookScoreLogs = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var userId, scoreLogIds, result;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            userId = (0, _jwtUtil.getUserId)(req, res);
            scoreLogIds = req.body.scoreLogIds;
            _context7.next = 4;
            return _score2.default.lookScoreLogs(userId, scoreLogIds);

          case 4:
            result = _context7.sent;
            return _context7.abrupt('return', res.json(result));

          case 6:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function lookScoreLogs(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * 根据积分日志id获取详情
 * @param {*} req
 * @param {*} res
 */


var getScoreLogInfoById = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var scoreLogId, result;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            scoreLogId = req.params.scoreLogId;
            _context8.next = 3;
            return _score2.default.getScoreLogInfoById(scoreLogId);

          case 3:
            result = _context8.sent;
            return _context8.abrupt('return', res.json(result));

          case 5:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function getScoreLogInfoById(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

var aa = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _score2.default.aa();

          case 2:
            result = _context9.sent;
            return _context9.abrupt('return', res.json(result));

          case 4:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function aa(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _jwtUtil = require('../../utils/jwtUtil');

var _score = require('../../services/jkbapp/score.service');

var _score2 = _interopRequireDefault(_score);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  getScores: getScores,
  create: create,
  update: update,
  getScoreLogs: getScoreLogs,
  getScoreRanking: getScoreRanking,
  lookScoreLog: lookScoreLog,
  lookScoreLogs: lookScoreLogs,
  getScoreLogInfoById: getScoreLogInfoById,
  aa: aa
};
//# sourceMappingURL=score.controller.js.map
