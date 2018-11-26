'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 同步用户积分上ipfs
 */
var syncScore = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _schedule2.default.syncScore();

          case 2:
            result = _context.sent;
            return _context.abrupt('return', res.json(result));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function syncScore(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 同步积分日志上链
 */


var syncScoreLog = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _schedule2.default.syncScoreLog();

          case 2:
            result = _context2.sent;
            return _context2.abrupt('return', res.json(result));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function syncScoreLog(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _schedule = require('../services/schedule.service');

var _schedule2 = _interopRequireDefault(_schedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = { syncScore: syncScore, syncScoreLog: syncScoreLog };
//# sourceMappingURL=schedule.controiller.js.map
