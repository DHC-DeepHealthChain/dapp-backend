'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
var login = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var body, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = req.body;
            _context.next = 3;
            return _auth2.default.loginMethod(body);

          case 3:
            result = _context.sent;
            return _context.abrupt('return', res.json(result));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 *  第三方登录
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */


var thirdLogin = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var openid, user, loginBody, resultBody;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            openid = req.body.openid;
            // const authInfo = await authorize(code);
            // if (!authInfo) {
            //   return res.json(new ResData(null, true, '授权失败，请重新授权'));
            // }
            // 根据openId查询是否有该账号

            _context2.next = 3;
            return _user2.default.findByOpenId(openid);

          case 3:
            user = _context2.sent;

            if (!(user === null)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt('return', res.json(new _responseData2.default(null, true, '该微信号尚未绑定手机号，请绑定手机号后登录！')));

          case 6:
            // 登录用户
            loginBody = { _id: user._id, openid: openid, name: user.username, publicKey: user.publicKey };
            _context2.next = 9;
            return _auth2.default.loginWeixin(loginBody);

          case 9:
            resultBody = _context2.sent;

            if (!resultBody.error) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt('return', res.json(new _responseData2.default(null, false, resultBody.message)));

          case 12:
            return _context2.abrupt('return', res.json(new _responseData2.default(resultBody.result, false, null)));

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function thirdLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */


/**
 * 关联微信账户
 */
var associatedWeixinAccount = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var mobile, openid, user, user2;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            mobile = req.body.mobile;
            openid = req.body.openid;
            _context3.next = 4;
            return _user2.default.findByMobile(mobile);

          case 4:
            user = _context3.sent;

            if (!user) {
              _context3.next = 14;
              break;
            }

            _context3.next = 8;
            return _user2.default.findByOpenId(openid);

          case 8:
            user2 = _context3.sent;

            if (!(user2 && user.mobileNumber !== user2.mobileNumber)) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt('return', res.json(new _responseData2.default(null, true, '此微信号已绑定过账户')));

          case 11:
            _context3.next = 13;
            return _user2.default.findByIdAndUpdate({ _id: user._id }, { openId: openid });

          case 13:
            return _context3.abrupt('return', res.json(new _responseData2.default(null, false, '关联成功')));

          case 14:
            return _context3.abrupt('return', res.json(new _responseData2.default(null, true, '账户不存在')));

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function associatedWeixinAccount(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _responseData = require('../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

var _auth = require('../services/auth.service');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import { authorize, userInfo } from '../aouth/weixin';
// import userService from '../services/user.service';


var web3 = void 0;
if (typeof web3 !== 'undefined') {
  web3 = new _web2.default(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new _web2.default(new _web2.default.providers.HttpProvider(_config2.default.web3Provider));
}function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  var moneyT = web3.fromWei(web3.eth.getBalance(req.user.address), 'ether'); // eslint-disable-line
  var money = parseInt(moneyT, 10);
  req.user.money = money; // eslint-disable-line
  return res.json(new _responseData2.default({
    user: req.user,
    num: Math.random() * 100
  }));
}exports.default = { login: login, getRandomNumber: getRandomNumber, thirdLogin: thirdLogin, associatedWeixinAccount: associatedWeixinAccount };
//# sourceMappingURL=auth.controller.js.map
