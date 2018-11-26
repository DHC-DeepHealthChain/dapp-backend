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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseContract = function () {
  function BaseContract() {
    _classCallCheck(this, BaseContract);

    this.web3 = new _web2.default(new _web2.default.providers.HttpProvider(_config2.default.web3Provider));
  }
  /**
  * 初始化合约
  */


  _createClass(BaseContract, [{
    key: 'initContract',
    value: function initContract(abi, address) {
      this.unlockAccount();
      return this.web3.eth.contract(abi).at(address);
    }
    /**
     * 解说账号
     */

  }, {
    key: 'unlockAccount',
    value: function unlockAccount() {
      console.log('config.coinbase', _config2.default.coinbase);
      console.log('config.coinbasePass', _config2.default.coinbasePass);
      return this.web3.personal.unlockAccount(_config2.default.coinbase, _config2.default.coinbasePass, 1);
    }
  }]);

  return BaseContract;
}();

exports.default = BaseContract;
//# sourceMappingURL=BaseContract.js.map
