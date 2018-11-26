'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var web3 = void 0;
if (typeof web3 !== 'undefined') {
  web3 = new _web2.default(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new _web2.default(new _web2.default.providers.HttpProvider(_config2.default.web3Provider));
}

var TokenContract = function () {
  function TokenContract() {
    _classCallCheck(this, TokenContract);

    this.tokenInstance = null;
  }

  _createClass(TokenContract, [{
    key: 'initContract',
    value: function initContract() {
      var contractAddress = '0x8fe9a18e19a1be7909b31ae626b9f3af6ca5bdbb';
      // 定义ABI
      var abiArray = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "tokenName", "type": "string" }, { "name": "tokenSymbol", "type": "string" }, { "name": "decimalsUnits", "type": "uint8" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "sayHello", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_noteKey", "type": "bytes32" }, { "name": "_content", "type": "bytes32" }], "name": "setNote", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }]; // eslint-disable-line
      this.tokenInstance = web3.eth.contract(abiArray).at(contractAddress);
      if (!this.tokenInstance) {
        console.log('初始化合约失败');
      }
    }
  }, {
    key: 'transferToken',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(account, point) {
        var defaultAccount, value, flag, transcation, transtionToken;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.tokenInstance) this.initContract();
                // check

                if (account) {
                  _context.next = 4;
                  break;
                }

                console.log('账号不能为空.');
                return _context.abrupt('return');

              case 4:
                // 设置默认账号
                defaultAccount = '0x7eff122b94897ea5b0e2a9abf47b86337fafebdc';

                web3.eth.defaultAccount = defaultAccount;
                // 转换单位
                _context.next = 8;
                return web3.toWei(point, 'ether');

              case 8:
                value = _context.sent;

                // 解锁账户
                flag = web3.personal.unlockAccount(defaultAccount, '1234', 2);

                if (!flag) {
                  _context.next = 22;
                  break;
                }

                transcation = { from: defaultAccount, to: account, value: value };
                _context.prev = 12;
                _context.next = 15;
                return web3.eth.sendTransaction(transcation);

              case 15:
                transtionToken = _context.sent;

                console.log('transtionToken', transtionToken);
                _context.next = 22;
                break;

              case 19:
                _context.prev = 19;
                _context.t0 = _context['catch'](12);

                console.log('e', _context.t0);

              case 22:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[12, 19]]);
      }));

      function transferToken(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return transferToken;
    }()
  }]);

  return TokenContract;
}();

exports.default = TokenContract;
//# sourceMappingURL=tokenContract.js.map
