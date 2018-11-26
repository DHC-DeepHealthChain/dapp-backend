'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 获取计划单列表
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
var list = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(pageSize, page) {
    var healthPlans, total, pagination;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _healthPlan2.default.list({ pageSize: pageSize, page: page });

          case 2:
            healthPlans = _context.sent;

            if (!(healthPlans !== null)) {
              _context.next = 10;
              break;
            }

            _context.next = 6;
            return (0, _ipfsList.getContentsByHash)(healthPlans);

          case 6:
            healthPlans = _context.sent;
            _context.next = 9;
            return (0, _ipfsList.getListImgByHash)(healthPlans);

          case 9:
            healthPlans = _context.sent;

          case 10:
            _context.next = 12;
            return _healthPlan2.default.countAll();

          case 12:
            total = _context.sent;

            // 组装分页结果
            pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
            // 下次app发版是解开
            // const result = { list: healthPlans, pagination };

            return _context.abrupt('return', healthPlans);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function list(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 修改参与人数
 * @param {*} planId
 * @param {*} type
 */


var updateJoinNumByPlanId = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(planId, type) {
    var healthPlan, newJoinNum;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _healthPlan2.default.get(planId);

          case 2:
            healthPlan = _context2.sent;
            newJoinNum = 0;

            if (type === 'add') {
              newJoinNum = parseInt(healthPlan.joinNum, 10) + 1;
            } else if (type === 'sub') {
              newJoinNum = parseInt(healthPlan.joinNum, 10) - 1;
            }
            _context2.next = 7;
            return _healthPlan2.default.findOneAndUpdate({ _id: planId }, { $set: { joinNum: newJoinNum } });

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function updateJoinNumByPlanId(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _healthPlan = require('../../models/jkbapp/healthPlan.model');

var _healthPlan2 = _interopRequireDefault(_healthPlan);

var _ipfsList = require('../../utils/ipfsList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = { list: list, updateJoinNumByPlanId: updateJoinNumByPlanId };
//# sourceMappingURL=healthPlan.service.js.map
