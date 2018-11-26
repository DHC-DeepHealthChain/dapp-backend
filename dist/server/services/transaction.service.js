'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Get transcation list.
 * @property {number} req.query.skip - Number of transcations to be skipped.
 * @property {number} req.query.limit - Limit number of transcations to be returned.
 * @returns {Transcation[]}
 */
var list = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(pageSize, page, publicKey) {
    var total, transcations, pagination, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // 计算总数
            total = 0;
            // 根据分页条件获取文章列表

            transcations = void 0;

            if (!(publicKey !== '')) {
              _context.next = 11;
              break;
            }

            _context.next = 5;
            return _transcation2.default.findByFromOrTo(pageSize, page, publicKey);

          case 5:
            transcations = _context.sent;
            _context.next = 8;
            return _transcation2.default.countByPublicKey(publicKey);

          case 8:
            total = _context.sent;
            _context.next = 17;
            break;

          case 11:
            _context.next = 13;
            return _transcation2.default.list(pageSize, page);

          case 13:
            transcations = _context.sent;
            _context.next = 16;
            return _transcation2.default.countAll();

          case 16:
            total = _context.sent;

          case 17:
            // 组装分页结果
            pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
            // 下次app发版是解开

            result = { list: transcations, pagination: pagination };
            return _context.abrupt('return', result);

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function list(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 添加转账记录
 */


var createTransaction = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(from, paicateKey, to, price) {
    var gasPriceT, gasPrice, value, privateKey, txParams, tx, serializedTx, hash;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            gasPriceT = web3.eth.gasPrice;
            gasPrice = parseInt(gasPriceT, 10);
            value = parseInt(web3.toWei(price, 'ether'), 10);
            privateKey = Buffer.from(paicateKey, 'hex');
            txParams = {
              nonce: web3.eth.getTransactionCount(from),
              gasPrice: gasPrice,
              gasLimit: 21000,
              to: to,
              value: value
            };

            console.log('from:', from);
            console.log('交易记录', txParams);
            tx = new _ethereumjsTx2.default(txParams);

            tx.sign(privateKey);
            serializedTx = tx.serialize();
            _context2.prev = 10;
            _context2.next = 13;
            return web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));

          case 13:
            hash = _context2.sent;
            _context2.next = 16;
            return createTransactionLog(from, to, price);

          case 16:
            return _context2.abrupt('return', new _responseData2.default(hash, false, null));

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2['catch'](10);
            return _context2.abrupt('return', new _responseData2.default(null, true, _context2.t0.toString()));

          case 22:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[10, 19]]);
  }));

  return function createTransaction(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 创建用户交易日志
 * 存储在ScoreLog中
 * @param {*} from
 * @param {*} to
 * @param {*} price
 */


var createTransactionLog = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(from, to, price) {
    var userOut, userIn;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user2.default.getByPublicKey(from);

          case 2:
            userOut = _context3.sent;

            if (!(userOut !== null)) {
              _context3.next = 6;
              break;
            }

            _context3.next = 6;
            return _scorelog2.default.create(userOut._id, 'OUTPUT', price);

          case 6:
            _context3.next = 8;
            return _user2.default.getByPublicKey(to);

          case 8:
            userIn = _context3.sent;

            if (!(userIn !== null)) {
              _context3.next = 12;
              break;
            }

            _context3.next = 12;
            return _scorelog2.default.create(userIn._id, 'INPUT', price);

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function createTransactionLog(_x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _ethereumjsTx = require('ethereumjs-tx');

var _ethereumjsTx2 = _interopRequireDefault(_ethereumjsTx);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

var _responseData = require('../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _scorelog = require('../services/jkbapp/scorelog.service');

var _scorelog2 = _interopRequireDefault(_scorelog);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _transcation = require('../models/transcation.model');

var _transcation2 = _interopRequireDefault(_transcation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var web3 = void 0;
if (typeof web3 !== 'undefined') {
  web3 = new _web2.default(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new _web2.default(new _web2.default.providers.HttpProvider(_config2.default.web3Provider));
}exports.default = { createTransaction: createTransaction, list: list };
//# sourceMappingURL=transaction.service.js.map
