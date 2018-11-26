'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _block = require('../models/block.model');

var _block2 = _interopRequireDefault(_block);

var _transcation = require('../models/transcation.model');

var _transcation2 = _interopRequireDefault(_transcation);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = require('debug')('dhc-api:getBlockInfo');
// const querystring = require('querystring');

var GetBlockInfo = function () {
  function GetBlockInfo() {
    _classCallCheck(this, GetBlockInfo);

    this.web3 = undefined;
    this.lastSaveBlockNum = 0;
    this.currentBlockNum = 0;
  }

  _createClass(GetBlockInfo, [{
    key: 'runSchedule',
    value: function runSchedule() {
      // this.initWeb3();
      // this.getBlockInfo();
      var thz = this;
      _nodeSchedule2.default.scheduleJob('50 * * * * *', function () {
        thz.initWeb3();
        thz.getBlockInfo();
      });
    }
  }, {
    key: 'initWeb3',
    value: function initWeb3() {
      if (typeof this.web3 !== 'undefined') {
        this.web3 = new _web2.default(this.web3.currentProvider);
      } else {
        // set the provider you want from Web3.providers
        this.web3 = new _web2.default(new _web2.default.providers.HttpProvider(_config2.default.web3Provider));
      }
    }
  }, {
    key: 'getBlock',


    /**
     * 异步获取区块信息
     * @param {*} resolve
     * @param {*} reject
     */
    value: function getBlock(resolve, reject) {
      this.web3.eth.getBlock(this.currentBlockNum, true, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }
  }, {
    key: 'getBlockInfo',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var limit, skip, blockNumber, thz, lastSaveBlock, i, asyncGet, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                limit = 1;
                skip = 0;
                blockNumber = this.web3.eth.blockNumber;
                thz = this;
                _context.prev = 4;
                _context.next = 7;
                return _block2.default.list({ limit: limit, skip: skip });

              case 7:
                lastSaveBlock = _context.sent;

                if (lastSaveBlock.length === 0) {
                  thz.lastSaveBlockNum = 0;
                  thz.currentBlockNum = 0;
                } else {
                  thz.lastSaveBlockNum = lastSaveBlock[0].number;
                  thz.currentBlockNum = lastSaveBlock[0].number;
                }
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](4);

                debug('err', _context.t0);

              case 14:
                if (this.lastSaveBlockNum === blockNumber) {
                  debug('当前存储区块已经是最新');
                }
                // 获取存储的最新区块与当前最新区块之间的块
                i = this.lastSaveBlockNum + 1;

              case 16:
                if (!(i <= blockNumber)) {
                  _context.next = 32;
                  break;
                }

                this.currentBlockNum = i;
                asyncGet = new Promise(thz.getBlock.bind(thz));
                _context.prev = 19;
                _context.next = 22;
                return asyncGet;

              case 22:
                result = _context.sent;

                GetBlockInfo.blockSave(result);
                _context.next = 29;
                break;

              case 26:
                _context.prev = 26;
                _context.t1 = _context['catch'](19);

                debug('err', _context.t1);

              case 29:
                i += 1;
                _context.next = 16;
                break;

              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 11], [19, 26]]);
      }));

      function getBlockInfo() {
        return _ref.apply(this, arguments);
      }

      return getBlockInfo;
    }()
  }], [{
    key: 'blockSave',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(result) {
        var transactions, res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                transactions = result.transactions;
                res = JSON.parse(JSON.stringify(result));

                delete res.transactions;
                debug('result', result);
                _block2.default.update({ hash: res.hash }, res, { multi: true, upsert: true }, function (err, docs) {
                  if (err) {
                    debug('err', err);
                  } else if (transactions.length !== 0) {
                    debug('docs', docs);
                    transactions.map(function (e) {
                      var transcation = new _transcation2.default(e);
                      transcation.save().then(function () {
                        debug('保存成功');
                      });
                      return undefined;
                    });
                  }
                });

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function blockSave(_x) {
        return _ref2.apply(this, arguments);
      }

      return blockSave;
    }()
  }]);

  return GetBlockInfo;
}();

exports.default = GetBlockInfo;


var getBlock = new GetBlockInfo();
// GetBlockInfo.runSchedule();

// getBlock.runSchedule();

var timer = null;
/**
 * 防止web3没有初始化成功就执行任务
 */
timer = setInterval(function () {
  if (getBlock.web3 === undefined) {
    getBlock.initWeb3();
    debug('web3没有初始化');
  } else {
    clearInterval(timer);
    getBlock.runSchedule();
  }
}, 5000);

// const getBlock = new GetBlockInfo();
// // GetBlockInfo.runSchedule();

// getBlock.runSchedule();
//# sourceMappingURL=index.js.map
