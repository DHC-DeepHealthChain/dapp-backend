'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 正常登陆
 * @param {*} body
 */
var loginMethod = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(body) {
    var user, token, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user2.default.getByName(body.mobileNumber);

          case 2:
            user = _context.sent;

            if (user) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', new _responseData2.default(null, true, '用户名不存在！'));

          case 5:
            if (!(body.mobileNumber === user.mobileNumber && (0, _sha2.default)(body.password) === user.password)) {
              _context.next = 9;
              break;
            }

            // eslint-disable-line
            token = _jsonwebtoken2.default.sign({
              userId: user._id,
              address: user.publicKey,
              username: user.username,
              money: user.score
            }, _config2.default.jwtSecret);
            result = {
              token: token,
              address: user.publicKey,
              mobileNumber: user.mobileNumber,
              userId: user._id,
              money: user.score
            };
            return _context.abrupt('return', new _responseData2.default(result, false, null));

          case 9:
            return _context.abrupt('return', new _responseData2.default(null, true, '用户名或密码不正确'));

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function loginMethod(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 微信登录
 */


var loginWeixin = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(body) {
    var moneyT, money, token, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            moneyT = web3.fromWei(web3.eth.getBalance(body.publicKey)); // eslint-disable-line

            money = parseInt(moneyT, 10);
            token = _jsonwebtoken2.default.sign({
              userId: body._id,
              address: body.publicKey,
              username: body.username,
              money: money
            }, _config2.default.jwtSecret);
            result = {
              token: token,
              address: body.publicKey,
              mobileNumber: body.mobileNumber,
              userId: body._id,
              money: money
            };
            return _context2.abrupt('return', new _responseData2.default(result, false, null));

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function loginWeixin(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _sha = require('sha1');

var _sha2 = _interopRequireDefault(_sha);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _responseData = require('../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = { loginMethod: loginMethod, loginWeixin: loginWeixin };
//# sourceMappingURL=auth.service.js.map
