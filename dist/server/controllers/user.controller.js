'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
var list = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$query, _req$query$limit, limit, _req$query$skip, skip, inviteCode;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, _req$query$limit = _req$query.limit, limit = _req$query$limit === undefined ? 50 : _req$query$limit, _req$query$skip = _req$query.skip, skip = _req$query$skip === undefined ? 0 : _req$query$skip;
            _context.next = 3;
            return _user4.default.list(limit, skip);

          case 3:
            inviteCode = _context.sent;
            return _context.abrupt('return', res.json(new _responseData2.default(inviteCode, false, null)));

          case 5:
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
 * Get user
 * @returns {User}
 */


var get = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var imgBuffer;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!req.user.headImg) {
              _context2.next = 5;
              break;
            }

            _context2.next = 3;
            return (0, _ipfsFile.getContent)(req.user.headImg, 'noString');

          case 3:
            imgBuffer = _context2.sent;

            req.user.headImg = imgBuffer.toString('base64'); // eslint-disable-line no-param-reassign

          case 5:
            return _context2.abrupt('return', res.json(new _responseData2.default(req.user)));

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function get(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 创建用户
 * @param {*} req
 * @param {*} res
 */


var create = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var body, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = req.body;
            _context3.next = 3;
            return _user4.default.create(body);

          case 3:
            result = _context3.sent;
            return _context3.abrupt('return', res.json(result));

          case 5:
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
 * 更新用户信息
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */


var update = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _this = this;

    var type, user, updateParam;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            type = req.body.type;
            user = req.user;
            updateParam = {};
            _context5.t0 = type;
            _context5.next = _context5.t0 === 'headImg' ? 6 : _context5.t0 === 'nickname' ? 8 : _context5.t0 === 'realname' ? 10 : _context5.t0 === 'introduce' ? 12 : _context5.t0 === 'kkCoinAddress' ? 14 : 16;
            break;

          case 6:
            updateParam = { headImg: req.body.headImg };
            return _context5.abrupt('break', 16);

          case 8:
            updateParam = { nickname: req.body.nickname };
            return _context5.abrupt('break', 16);

          case 10:
            updateParam = { realname: req.body.realname };
            return _context5.abrupt('break', 16);

          case 12:
            updateParam = { introduce: req.body.introduce };
            return _context5.abrupt('break', 16);

          case 14:
            updateParam = { kkCoinAddress: req.body.kkCoinAddress };
            return _context5.abrupt('break', 16);

          case 16:
            _user2.default.findOneAndUpdate({ _id: user._id }, { $set: updateParam }, { new: true }, function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(err, newUser) {
                var taskType, flag;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (!err) {
                          _context4.next = 2;
                          break;
                        }

                        return _context4.abrupt('return', res.json(new _responseData2.default(null, true, '修改失败')));

                      case 2:
                        if (!(newUser.headImg && newUser.nickname && newUser.realname && newUser.introduce && newUser.kkCoinAddress)) {
                          _context4.next = 10;
                          break;
                        }

                        // eslint-disable-line
                        taskType = 'ComplateUserInfo';
                        // 判断是否已完成此任务

                        _context4.next = 6;
                        return _scorelog2.default.checkExist(user._id, taskType);

                      case 6:
                        flag = _context4.sent;

                        if (flag) {
                          _context4.next = 10;
                          break;
                        }

                        _context4.next = 10;
                        return _scorelog4.default.create(user._id, taskType);

                      case 10:
                        return _context4.abrupt('return', res.json(new _responseData2.default(null, false, '修改成功')));

                      case 11:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, _this);
              }));

              return function (_x9, _x10) {
                return _ref5.apply(this, arguments);
              };
            }());

          case 17:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function update(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * 重置密码
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */


var resetPassword = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body, mobileNumber, password, user;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body = req.body, mobileNumber = _req$body.mobileNumber, password = _req$body.password;
            // 校验账号是否已经注册

            _context6.next = 3;
            return _user2.default.getByName(mobileNumber);

          case 3:
            user = _context6.sent;

            if (user) {
              _context6.next = 6;
              break;
            }

            return _context6.abrupt('return', res.json(new _responseData2.default(null, true, '用户不存在')));

          case 6:

            _user2.default.findOneAndUpdate({ mobileNumber: mobileNumber }, { $set: { password: (0, _sha2.default)(password) } }, function (err) {
              if (err) {
                return res.json(new _responseData2.default(null, true, '修改失败'));
              }
              return res.json(new _responseData2.default(null, false, '修改成功'));
            });

            return _context6.abrupt('return', null);

          case 8:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function resetPassword(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * 删除用户
 * @returns {User}
 */


/**
 * 获取验证码
 * @param {*} req
 * @param {*} res
 */
var sendCaptchaByMobile = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var mobileNumber, type, user, captcha;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            mobileNumber = req.params.mobileNumber;
            type = req.query.type;
            _context7.next = 4;
            return _user2.default.getByName(mobileNumber);

          case 4:
            user = _context7.sent;

            if (!(type === 'register' && user)) {
              _context7.next = 7;
              break;
            }

            return _context7.abrupt('return', res.json(new _responseData2.default(null, true, '该手机号已经注册。')));

          case 7:
            if (!(type === 'reset' && !user)) {
              _context7.next = 9;
              break;
            }

            return _context7.abrupt('return', res.json(new _responseData2.default(null, true, '该手机号还未注册。')));

          case 9:
            captcha = Math.floor(Math.random() * (9999 - 1000)) + 1000;

            if (mobileNumber) {
              (0, _sms.sendCaptcha)(mobileNumber, captcha).then(function (result) {
                if (result) {
                  res.json(new _responseData2.default(captcha, false, '发送验证码成功'));
                } else {
                  res.json(new _responseData2.default(null, true, '发送验证码失败，请重新发送'));
                }
              });
            } else {
              res.json(new _responseData2.default(null, true, '手机号没有填写'));
            }
            return _context7.abrupt('return', null);

          case 12:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function sendCaptchaByMobile(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * 获取用户邀请码
 * @param {*} req
 * @param {*} res
 */


var getInviteCode = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var userId, inviteCodeBody, result;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _jwtUtil.getUserId)(req, res);

          case 2:
            userId = _context8.sent;
            _context8.next = 5;
            return _user4.default.getInviteCode(userId);

          case 5:
            inviteCodeBody = _context8.sent;

            if (!inviteCodeBody.error) {
              _context8.next = 8;
              break;
            }

            return _context8.abrupt('return', res.json(new _responseData2.default(null, true, inviteCodeBody.message)));

          case 8:
            result = { inviteCode: inviteCodeBody.result, useNum: _config2.default.inviteCodeValidCount, appPath: _config2.default.appPath }; // eslint-disable-line

            return _context8.abrupt('return', res.json(new _responseData2.default(result, false, null)));

          case 10:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function getInviteCode(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

/**
 * 验证邀请码
 * @param {*} inviteCode
 */


var checkInviteCode = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var inviteCode, result;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            inviteCode = req.body.inviteCode;
            _context9.next = 3;
            return _user4.default.checkInviteCode(inviteCode);

          case 3:
            result = _context9.sent;
            return _context9.abrupt('return', res.json(result));

          case 5:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function checkInviteCode(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

var _sha = require('sha1');

var _sha2 = _interopRequireDefault(_sha);

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _ipfsFile = require('../utils/ipfsFile');

var _sms = require('../utils/sms');

var _responseData = require('../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

var _scorelog = require('../models/jkbapp/scorelog.model');

var _scorelog2 = _interopRequireDefault(_scorelog);

var _user3 = require('../services/user.service');

var _user4 = _interopRequireDefault(_user3);

var _jwtUtil = require('../utils/jwtUtil');

var _scorelog3 = require('../services/jkbapp/scorelog.service');

var _scorelog4 = _interopRequireDefault(_scorelog3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var web3 = void 0;
if (typeof web3 !== 'undefined') {
  web3 = new _web2.default(web3.currentProvider);
} else {
  web3 = new _web2.default(new _web2.default.providers.HttpProvider(_config2.default.web3Provider));
}

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  _user2.default.get(id).then(function (user) {
    req.user = user; // eslint-disable-line
    return next();
  }).catch(function (e) {
    return next(e);
  });
}function remove(req, res, next) {
  var user = req.user;
  user.remove().then(function () {
    return res.json(new _responseData2.default({}, false, '删除成功'));
  }).catch(function (e) {
    return next(e);
  });
}exports.default = {
  load: load,
  get: get,
  create: create,
  update: update,
  list: list,
  remove: remove,
  getInviteCode: getInviteCode,
  sendCaptchaByMobile: sendCaptchaByMobile,
  resetPassword: resetPassword,
  checkInviteCode: checkInviteCode
};
//# sourceMappingURL=user.controller.js.map
