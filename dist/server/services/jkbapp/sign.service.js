'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// const signContract = new SignContract();

/**
 * 获取签到列表
 * 只回去本周签到记录
 * @param {*} userId
 * @param {*} pageSize
 * @param {*} page
 */
var getList = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId, pageSize, page) {
    var weekStartDay, signs, list;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            weekStartDay = _dateUtil2.default.getWeekStartDate();
            _context.next = 3;
            return _sign2.default.list({ pageSize: pageSize, page: page, userId: userId, weekStartDay: weekStartDay });

          case 3:
            signs = _context.sent;

            if (!(signs !== null)) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return (0, _ipfsList.getContentsByHash)(signs);

          case 7:
            signs = _context.sent;

          case 8:
            list = signs.map(function (item) {
              var signTime = item.signTime.getTime();
              item.signTime = signTime; // eslint-disable-line
              return item;
            });
            return _context.abrupt('return', Promise.all(list));

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getList(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 签到
 * @param {*} userid
 */


var create = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userid) {
    var todayStartDate, flag, taskType, lastSign, num, lastSignTime, yesterdayStartDate, ipfsData, hash, newSign;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // 判断今天是否已签到
            todayStartDate = _dateUtil2.default.getDayStartDate(); // 获取今日开始时间

            _context2.next = 3;
            return _sign2.default.getByDateGreatThenAndUserId(todayStartDate, userid);

          case 3:
            flag = _context2.sent;

            if (!flag) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt('return', new _responseData2.default(null, true, '今日已签到'));

          case 6:
            // 添加积分日志
            taskType = 'Sign';
            _context2.next = 9;
            return _scorelog2.default.create(userid, taskType);

          case 9:
            _context2.next = 11;
            return _sign2.default.getLast1ByUserId(userid);

          case 11:
            lastSign = _context2.sent;
            num = 1;

            if (lastSign !== null && lastSign.length > 0) {
              lastSignTime = _dateUtil2.default.formatDate(lastSign[0].signTime);
              yesterdayStartDate = _dateUtil2.default.getYesterdayStartDate(); // 获取昨日开始时间

              if (yesterdayStartDate < lastSignTime && lastSignTime < todayStartDate) {
                num = parseInt(lastSign[0].keepSignNum, 10) + 1;
              }
            }
            // 定义ipfs中存储的数据
            ipfsData = {
              userId: userid,
              signTime: Date.now,
              keepSignNum: num
            };
            // 上传到IPFS

            _context2.next = 17;
            return (0, _ipfsFile.addContent)(ipfsData);

          case 17:
            hash = _context2.sent;

            // 定义mongo存储的数据
            newSign = new _sign2.default({
              ipfsHash: hash,
              userId: userid,
              keepSignNum: num
            });
            // 保存数据库

            _context2.next = 21;
            return _sign2.default.create(newSign);

          case 21:
            if (!(num >= 7 && num % 7 === 0)) {
              _context2.next = 25;
              break;
            }

            // 添加周签到积分日志
            taskType = 'SignWeek';
            _context2.next = 25;
            return _scorelog2.default.create(userid, taskType);

          case 25:
            return _context2.abrupt('return', new _responseData2.default(null, false, '签到成功'));

          case 26:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function create(_x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 获取签到状态
 */


var getSignState = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userId) {
    var num, isSign, lastSign, lastSignTime, todayStartDate, weekStartDate, numTemp, score, tasks, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            num = 0;
            isSign = false;
            _context3.next = 4;
            return _sign2.default.getLast1ByUserId(userId);

          case 4:
            lastSign = _context3.sent;

            if (lastSign !== null && lastSign.length > 0) {
              num = parseInt(lastSign[0].keepSignNum, 10);
              num = Number(num) % 7;
              // 最后一次签到时间
              lastSignTime = _dateUtil2.default.formatDate(lastSign[0].signTime);
              // 获取今日开始时间

              todayStartDate = _dateUtil2.default.getDayStartDate();
              // 获取昨日开始时间
              // const yesterdayStartDate = DateUtil.getYesterdayStartDate();
              // 获取本周开始时间

              weekStartDate = _dateUtil2.default.getWeekStartDate();
              // 判断今日是否签到

              if (lastSignTime > todayStartDate) {
                isSign = true;
              }
              numTemp = (lastSignTime - weekStartDate) / 1000 / 86400 + 1;

              num = num > numTemp ? numTemp : num;
              num = parseInt(num, 10);
            }
            // 获取签到积分
            score = 0;
            _context3.next = 9;
            return _task2.default.fingByTaskType('Sign');

          case 9:
            tasks = _context3.sent;

            if (tasks !== null && tasks.length > 0) {
              score = tasks[0].score;
            }
            result = { isSign: isSign, num: num, score: score };
            return _context3.abrupt('return', result);

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getSignState(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

var _sign = require('../../models/jkbapp/sign.model');

var _sign2 = _interopRequireDefault(_sign);

var _ipfsFile = require('../../utils/ipfsFile');

var _ipfsList = require('../../utils/ipfsList');

var _dateUtil = require('../../utils/dateUtil');

var _dateUtil2 = _interopRequireDefault(_dateUtil);

var _task = require('../../models/jkbapp/task.model');

var _task2 = _interopRequireDefault(_task);

var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _scorelog = require('./scorelog.service');

var _scorelog2 = _interopRequireDefault(_scorelog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import SignContract from '../../contracts/signContract';


exports.default = { getList: getList, create: create, getSignState: getSignState };
//# sourceMappingURL=sign.service.js.map
