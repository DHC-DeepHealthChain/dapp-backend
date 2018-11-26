'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var getList = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(pageSize, page) {
    var exams, total, pagination;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _exam2.default.list({ pageSize: pageSize, page: page });

          case 2:
            exams = _context.sent;
            _context.next = 5;
            return _exam2.default.countAll();

          case 5:
            total = _context.sent;

            if (!(exams !== null)) {
              _context.next = 13;
              break;
            }

            _context.next = 9;
            return (0, _ipfsList.getContentsByHash)(exams);

          case 9:
            exams = _context.sent;
            _context.next = 12;
            return (0, _ipfsList.getListImgByHash)(exams);

          case 12:
            exams = _context.sent;

          case 13:
            // 组装分页结果
            pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
            // 下次app发版是解开
            // const result = { list: articles, pagination };

            return _context.abrupt('return', exams);

          case 15:
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

var _exam = require('../../models/jkbapp/exam.model');

var _exam2 = _interopRequireDefault(_exam);

var _ipfsList = require('../../utils/ipfsList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = { getList: getList };
//# sourceMappingURL=exam.service.js.map
