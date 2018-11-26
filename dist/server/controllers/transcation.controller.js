'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// function getNameByJwt(req){
//   var authorization = req.headers.authorization,
//   decoded;
//   try {
//   decoded = jwt.verify(authorization, config.jwtSecret );
//   } catch(e){
//     console.log(e);
//   }
//   console.log(decoded);
//   var transcationName = decoded.transcationname;
//   return transcationName;
// }

/**
 * 添加交易
 * @param {*} req
 * @param {*} res
 */
var createTransaction = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var userId, user, from, privateKey, to, price, resultBody;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // 接收参数
            userId = (0, _jwtUtil.getUserId)(req, res);
            _context.next = 3;
            return _user2.default.get(userId);

          case 3:
            user = _context.sent;
            from = user.publicKey;
            privateKey = user.privateKey;
            to = req.body.to;
            price = req.body.price;

            if ((0, _ethereumjsUtil.isValidAddress)(to)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt('return', res.json(new _responseData2.default(null, true, '转账地址不合法')));

          case 10:
            _context.next = 12;
            return _transaction2.default.createTransaction(from, privateKey, to, price);

          case 12:
            resultBody = _context.sent;

            if (!(resultBody !== null && resultBody.error === true)) {
              _context.next = 15;
              break;
            }

            return _context.abrupt('return', res.json(new _responseData2.default(null, true, resultBody.message)));

          case 15:
            return _context.abrupt('return', res.json(new _responseData2.default(resultBody.result, false, null)));

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createTransaction(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 获取交易列表
 * @param {*} req
 * @param {*} res
 */


var list = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$query, _req$query$pageSize, pageSize, _req$query$page, page, publicKey, mobileNumber, user, result;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$query = req.query, _req$query$pageSize = _req$query.pageSize, pageSize = _req$query$pageSize === undefined ? 20 : _req$query$pageSize, _req$query$page = _req$query.page, page = _req$query$page === undefined ? 0 : _req$query$page;
            publicKey = '';

            if (!(req.query.publicKey || req.query.mobileNumber)) {
              _context2.next = 15;
              break;
            }

            if (!req.query.publicKey) {
              _context2.next = 7;
              break;
            }

            publicKey = req.query.publicKey;
            _context2.next = 15;
            break;

          case 7:
            if (!req.query.mobileNumber) {
              _context2.next = 15;
              break;
            }

            mobileNumber = req.query.mobileNumber;
            _context2.next = 11;
            return _user2.default.findByMobile(mobileNumber);

          case 11:
            user = _context2.sent;

            if (!(user === null)) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt('return', res.json(new _responseData2.default({ list: null }, false, null)));

          case 14:
            publicKey = user.publicKey;

          case 15:
            _context2.next = 17;
            return _transaction2.default.list(pageSize, page, publicKey);

          case 17:
            result = _context2.sent;
            return _context2.abrupt('return', res.json(new _responseData2.default(result, false, null)));

          case 19:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function list(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Get my transcation list.
 * @param {*} req
 * @param {*} res
 */


var myList = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$query2, _req$query2$pageSize, pageSize, _req$query2$page, page, token, user, result;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$query2 = req.query, _req$query2$pageSize = _req$query2.pageSize, pageSize = _req$query2$pageSize === undefined ? 20 : _req$query2$pageSize, _req$query2$page = _req$query2.page, page = _req$query2$page === undefined ? 0 : _req$query2$page;
            token = req.query.token;

            if (!token) {
              user = (0, _jwtUtil.getUser)(req, res);

              token = user.address;
            }
            _context3.next = 5;
            return _transaction2.default.list(pageSize, page, token);

          case 5:
            result = _context3.sent;
            return _context3.abrupt('return', res.json(new _responseData2.default(result, false, null)));

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function myList(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var _ethereumjsUtil = require('ethereumjs-util');

var _transcation = require('../models/transcation.model');

var _transcation2 = _interopRequireDefault(_transcation);

var _responseData = require('../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _jwtUtil = require('../utils/jwtUtil');

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _transaction = require('../services/transaction.service');

var _transaction2 = _interopRequireDefault(_transaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Load transcation and append to req.
 */
function load(req, res, next, id) {
  _transcation2.default.get(id).then(function (transcation) {
    req.transcation = transcation; // eslint-disable-line no-param-reassign
    return next();
  }).catch(function (e) {
    return next(e);
  });
}exports.default = { load: load, list: list, createTransaction: createTransaction, myList: myList };
//# sourceMappingURL=transcation.controller.js.map
