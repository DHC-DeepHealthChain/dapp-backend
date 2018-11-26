'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 获取用户列表
 * @param {*} pageSize
 * @param {*} page
 */
var list = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(pageSize, page) {
    var users, total, pagination;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user2.default.list(pageSize, page);

          case 2:
            users = _context.sent;
            _context.next = 5;
            return _user2.default.countAll();

          case 5:
            total = _context.sent;

            // 组装分页结果
            pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
            // 下次app发版是解开
            // const result = { list: users, pagination };

            return _context.abrupt('return', users);

          case 8:
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
 * 创建用户
 * @param {*} req
 * @param {*} res
 */


var create = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(body) {
    var useInviteCodeFlag, otherInviteCode, resultBody, inviteCode, wallet, reqPassword, keystore, flag, user, newUser, taskType;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _flag2.default.getByFlagKey('useInviteCode');

          case 2:
            useInviteCodeFlag = _context2.sent;

            if (!(useInviteCodeFlag !== null && useInviteCodeFlag.flagValue)) {
              _context2.next = 10;
              break;
            }

            // 获取 别人邀请码
            otherInviteCode = body.inviteCode;
            // 验证邀请码

            _context2.next = 7;
            return updateOldInviteCode(otherInviteCode);

          case 7:
            resultBody = _context2.sent;

            if (!resultBody.error) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt('return', new _responseData2.default(null, true, resultBody.message));

          case 10:
            _context2.next = 12;
            return _inviteCode2.default.getCode();

          case 12:
            inviteCode = _context2.sent;

            // 生成地址，私钥
            wallet = (0, _ethereumjsWallet.generate)();
            reqPassword = body.password;
            keystore = wallet.toV3((0, _sha2.default)(reqPassword), { n: 1024 });

            keystore.address = (0, _ethereumjsUtil.toChecksumAddress)(keystore.address);
            // 校验账号是否已经注册
            _context2.next = 19;
            return _user2.default.checkByName(body.mobileNumber);

          case 19:
            flag = _context2.sent;

            if (!(flag === true)) {
              _context2.next = 22;
              break;
            }

            return _context2.abrupt('return', new _responseData2.default(null, true, '账户名已经存在'));

          case 22:
            user = new _user2.default({
              username: body.mobileNumber,
              mobileNumber: body.mobileNumber,
              password: (0, _sha2.default)(body.password),
              clearPass: body.password,
              sex: body.sex,
              height: body.height,
              weight: body.weight,
              age: body.birthday,
              publicKey: wallet.getAddressString(),
              privateKey: wallet.getPrivateKeyString().replace('0x', ''),
              keystore: JSON.stringify(keystore),
              inviteCode: inviteCode,
              otherInviteCode: body.inviteCode,
              openId: body.openid
            });
            _context2.next = 25;
            return user.save();

          case 25:
            newUser = _context2.sent;
            _context2.next = 28;
            return _score2.default.create(newUser._id);

          case 28:
            // 添加积分日志
            taskType = 'Register';
            _context2.next = 31;
            return _scorelog2.default.create(user._id, taskType);

          case 31:
            return _context2.abrupt('return', new _responseData2.default(newUser, false, '注册成功'));

          case 32:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function create(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 创建微信用户
 * @param {*} req
 * @param {*} res
 */


var createWeiXinUser = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(body) {
    var inviteCode, wallet, reqPassword, keystore, user, newUser, taskType;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _inviteCode2.default.getCode();

          case 2:
            inviteCode = _context3.sent;

            // 生成地址，私钥
            wallet = (0, _ethereumjsWallet.generate)();
            reqPassword = body.password;
            keystore = wallet.toV3((0, _sha2.default)(reqPassword), { n: 1024 });

            keystore.address = (0, _ethereumjsUtil.toChecksumAddress)(keystore.address);
            // 校验账号是否已经注册
            _context3.next = 9;
            return _user2.default.findByOpenId(body.openid);

          case 9:
            user = _context3.sent;

            if (!(user !== null)) {
              _context3.next = 12;
              break;
            }

            return _context3.abrupt('return', new _responseData2.default(null, true, '账户名已经存在'));

          case 12:
            user = new _user2.default({
              openId: body.openid,
              username: body.username,
              nickname: body.username,
              sex: body.sex,
              publicKey: wallet.getAddressString(),
              privateKey: wallet.getPrivateKeyString().replace('0x', ''),
              keystore: JSON.stringify(keystore),
              inviteCode: inviteCode
            });
            _context3.next = 15;
            return _user2.default.create(user);

          case 15:
            newUser = _context3.sent;
            _context3.next = 18;
            return _score2.default.create(newUser._id);

          case 18:
            // 添加积分日志
            taskType = 'Register';
            _context3.next = 21;
            return _scorelog2.default.create(user._id, taskType);

          case 21:
            return _context3.abrupt('return', new _responseData2.default(newUser, false, '注册成功'));

          case 22:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function createWeiXinUser(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * 获取用户邀请码
 */


var getInviteCode = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(userId) {
    var user, inviteCode;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _user2.default.get(userId);

          case 2:
            user = _context4.sent;

            if (user) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt('return', new _responseData2.default(null, true, '用户不存在'));

          case 5:
            inviteCode = void 0;

            if (!user.inviteCode) {
              _context4.next = 10;
              break;
            }

            inviteCode = user.inviteCode;
            _context4.next = 15;
            break;

          case 10:
            _context4.next = 12;
            return _inviteCode2.default.getCode();

          case 12:
            inviteCode = _context4.sent;
            _context4.next = 15;
            return _user2.default.findByIdAndUpdate({ _id: user._id }, { inviteCode: inviteCode });

          case 15:
            return _context4.abrupt('return', new _responseData2.default(inviteCode, false, null));

          case 16:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getInviteCode(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * 验证邀请码
 * @param {*} inviteCode
 */


var checkInviteCode = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(inviteCode) {
    var user, oldInviteCodeUseCount;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _user2.default.findByInviteCode(inviteCode);

          case 2:
            user = _context5.sent;

            if (!(user === null)) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt('return', new _responseData2.default(null, true, '邀请码不存在'));

          case 5:
            // 检查 别人邀请码的使用次数
            oldInviteCodeUseCount = user.inviteCodeUseCount;
            // 验证邀请码是否失效

            if (!(oldInviteCodeUseCount >= _config2.default.inviteCodeValidCount)) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt('return', new _responseData2.default(null, true, '邀请码已失效'));

          case 8:
            return _context5.abrupt('return', new _responseData2.default(null, false, '邀请码可用'));

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function checkInviteCode(_x6) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * 更新旧的邀请码
 * @param {*} inviteCode
 */


var updateOldInviteCode = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(inviteCode) {
    var user, newUser, oldInviteCodeUseCount, taskType;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _user2.default.findByInviteCode(inviteCode);

          case 2:
            user = _context6.sent;

            if (!(user === null)) {
              _context6.next = 5;
              break;
            }

            return _context6.abrupt('return', new _responseData2.default(null, true, '邀请码不存在'));

          case 5:
            _context6.next = 7;
            return _user2.default.findByIdAndUpdate({ _id: user._id }, { $set: { inviteCodeUseCount: Number(user.inviteCodeUseCount) + 1 } });

          case 7:
            newUser = _context6.sent;
            _context6.next = 10;
            return _scorelog4.default.countByUserIdAndScoreType(user._id, 'Invite');

          case 10:
            oldInviteCodeUseCount = _context6.sent;

            if (!(oldInviteCodeUseCount < _config2.default.inviteCodeValidCount)) {
              _context6.next = 16;
              break;
            }

            // 添加积分 任务日志
            taskType = 'Invite';
            _context6.next = 15;
            return _scorelog2.default.create(user._id, taskType);

          case 15:
            return _context6.abrupt('return', new _responseData2.default(null, false, '邀请码可用'));

          case 16:
            return _context6.abrupt('return', new _responseData2.default(null, false, '\u9080\u8BF7\u7801\u5DF2\u4F7F\u7528 ' + _config2.default.inviteCodeValidCount + ' \u6B21\uFF0C\u4E0D\u7D2F\u52A0\u79EF\u5206'));

          case 17:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function updateOldInviteCode(_x7) {
    return _ref6.apply(this, arguments);
  };
}();

var _ethereumjsWallet = require('ethereumjs-wallet');

var _ethereumjsUtil = require('ethereumjs-util');

var _sha = require('sha1');

var _sha2 = _interopRequireDefault(_sha);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _responseData = require('../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

var _scorelog = require('./jkbapp/scorelog.service');

var _scorelog2 = _interopRequireDefault(_scorelog);

var _inviteCode = require('../utils/inviteCode');

var _inviteCode2 = _interopRequireDefault(_inviteCode);

var _score = require('../services/jkbapp/score.service');

var _score2 = _interopRequireDefault(_score);

var _flag = require('../models/flag.model');

var _flag2 = _interopRequireDefault(_flag);

var _scorelog3 = require('../models/jkbapp/scorelog.model');

var _scorelog4 = _interopRequireDefault(_scorelog3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = { list: list, create: create, createWeiXinUser: createWeiXinUser, getInviteCode: getInviteCode, checkInviteCode: checkInviteCode };
//# sourceMappingURL=user.service.js.map
