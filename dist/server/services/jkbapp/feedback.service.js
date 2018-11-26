'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 获取意见反馈列表
 * @param {*} req
 * @param {*} res
 */
var getList = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(pageSize, page) {
    var _this = this;

    var feedbacks, list, total, pagination;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _feedback2.default.list();

          case 2:
            feedbacks = _context3.sent;

            if (!feedbacks) {
              _context3.next = 7;
              break;
            }

            _context3.next = 6;
            return (0, _ipfsList.getContentsByHash)(feedbacks);

          case 6:
            feedbacks = _context3.sent;

          case 7:
            list = feedbacks.map(function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(item) {
                var user, content;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _user2.default.get(item.userId);

                      case 2:
                        user = _context2.sent;
                        content = JSON.parse(item.content).content;
                        return _context2.abrupt('return', { content: content, username: user.username, mobileNumber: user.mobileNumber, createdDate: item.createdDate.getTime() });

                      case 5:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this);
              }));

              return function (_x4) {
                return _ref3.apply(this, arguments);
              };
            }());
            // 计算总数

            _context3.next = 10;
            return _feedback2.default.countAll();

          case 10:
            total = _context3.sent;

            // 组装分页结果
            pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
            // 下次app发版是解开
            // const result = { list: await Promise.all(list), pagination };

            _context3.next = 14;
            return Promise.all(list);

          case 14:
            return _context3.abrupt('return', _context3.sent);

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getList(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 获取意见反馈详情
 * @param {*} req
 * @param {*} res
 */


var getInfo = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_id) {
    var feedback;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _feedback2.default.get(_id);

          case 2:
            feedback = _context4.sent;

            if (!feedback) {
              _context4.next = 7;
              break;
            }

            _context4.next = 6;
            return getIpfsContent(feedback.ipfsHash);

          case 6:
            feedback.content = _context4.sent;

          case 7:
            return _context4.abrupt('return', feedback);

          case 8:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getInfo(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * 添加新意见反馈
 * @param {*} req
 * @param {*} res
 */


var create = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(userId, content) {
    var ipfsData, hash, feedback;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // 定义ipfs中存储的数据
            ipfsData = {
              userId: userId,
              content: content
            };
            // 上传到IPFS

            _context5.next = 3;
            return (0, _ipfsFile.addContent)(ipfsData);

          case 3:
            hash = _context5.sent;

            // 定义mongo存储的数据
            feedback = new _feedback2.default({
              ipfsHash: hash,
              userId: userId
            });
            // 保存数据库

            _context5.next = 7;
            return _feedback2.default.create(feedback);

          case 7:
            return _context5.abrupt('return', '谢谢您的反馈！');

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function create(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * 采纳 意见反馈 发放积分
 * @param {*} _id
 */


var take = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_id) {
    var feedback, taskType;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _feedback2.default.get(_id);

          case 2:
            feedback = _context6.sent;

            if (feedback) {
              _context6.next = 5;
              break;
            }

            return _context6.abrupt('return', new _responseData2.default(null, true, '未查到对应反馈信息'));

          case 5:
            if (!(feedback.taked === true)) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt('return', new _responseData2.default(null, true, '次反馈信息已被管理员采纳'));

          case 7:
            _context6.next = 9;
            return _feedback2.default.findByIdAndUpdate({ _id: _id }, { taked: true });

          case 9:
            // 给提交此条反馈信息的用户发送积分
            taskType = 'Feedback';
            _context6.next = 12;
            return _scorelog2.default.create(feedback.userId, taskType);

          case 12:
            return _context6.abrupt('return', new _responseData2.default(null, false, '反馈信息已采纳'));

          case 13:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function take(_x8) {
    return _ref6.apply(this, arguments);
  };
}();

var _feedback = require('../../models/jkbapp/feedback.model');

var _feedback2 = _interopRequireDefault(_feedback);

var _ipfsFile = require('../../utils/ipfsFile');

var _ipfsList = require('../../utils/ipfsList');

var _user = require('../../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _scorelog = require('./scorelog.service');

var _scorelog2 = _interopRequireDefault(_scorelog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getIpfsContent = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(hash) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _ipfsFile.getContent)(hash);

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getIpfsContent(_x) {
    return _ref.apply(this, arguments);
  };
}();exports.default = { getList: getList, create: create, getInfo: getInfo, take: take };
//# sourceMappingURL=feedback.service.js.map
