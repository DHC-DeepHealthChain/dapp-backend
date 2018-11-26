'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }; // import multihash from 'multihashes';


var _BaseContract2 = require('./BaseContract');

var _BaseContract3 = _interopRequireDefault(_BaseContract2);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserPlanContract = function (_BaseContract) {
  _inherits(UserPlanContract, _BaseContract);

  function UserPlanContract() {
    _classCallCheck(this, UserPlanContract);

    var _this = _possibleConstructorReturn(this, (UserPlanContract.__proto__ || Object.getPrototypeOf(UserPlanContract)).call(this));

    _this.contractAddress = '0x794448cfbeb355e5b86aba0b62a00317e5ef297b';
    // 定义ABI
    _this.abiArray = [{ "anonymous": false, "inputs": [{ "indexed": false, "name": "index", "type": "uint256" }, { "indexed": false, "name": "ipfsHash", "type": "bytes32" }], "name": "LogNewUserPlan", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "index", "type": "uint256" }, { "indexed": false, "name": "ipfsHash", "type": "bytes32" }], "name": "LogUpdateUserPlan", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "ipfsHash", "type": "bytes32" }, { "indexed": false, "name": "index", "type": "uint256" }], "name": "LogDeleteUserPlan", "type": "event" }, { "constant": true, "inputs": [{ "name": "ipfsHash", "type": "bytes32" }], "name": "isUserPlan", "outputs": [{ "name": "isIndeed", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "ipfsHash", "type": "bytes32" }], "name": "insertUserPlan", "outputs": [{ "name": "index", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "ipfsHash", "type": "bytes32" }], "name": "deleteUserPlan", "outputs": [{ "name": "index", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "ipfsHash", "type": "bytes32" }], "name": "getUserPlan", "outputs": [{ "name": "index", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getUserPlanCount", "outputs": [{ "name": "count", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "index", "type": "uint256" }], "name": "getUserPlanAtIndex", "outputs": [{ "name": "ipfsHash", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }]; // eslint-disable-line
    _this.userPlanInstance = _get(UserPlanContract.prototype.__proto__ || Object.getPrototypeOf(UserPlanContract.prototype), 'initContract', _this).call(_this, _this.abiArray, _this.contractAddress);

    if (!_this.userPlanInstance) {
      console.log('初始化合约失败');
    }
    return _this;
  }
  /**
   * 添加用户计划
   * @param {*} ipfsHash
   */


  _createClass(UserPlanContract, [{
    key: 'addUserPlan',
    value: function addUserPlan(ipfsHash) {
      var flag = _get(UserPlanContract.prototype.__proto__ || Object.getPrototypeOf(UserPlanContract.prototype), 'unlockAccount', this).call(this);
      if (!flag) {
        console.log('解锁账户失败');
      }
      // const buf = Buffer.from(ipfsHash, 'hex');
      // const encodedHash = multihash.encode(buf, 'sha1');
      //  this.userPlanInstance.insertUserPlan(ipfsHash);
      var instructorEvent = this.userPlanInstance.LogNewUserPlan(); // eslint-disable-line
      this.userPlanInstance.insertUserPlan(ipfsHash, { from: _config2.default.coinbase, gas: 300000, fromBlock: 0, toBlock: 'latest' });
      instructorEvent.watch(function (error, result) {
        if (!error) {
          console.log(JSON.stringify(result));
        } else {
          console.log(error);
        }
      });
    }
    /**
     * 获取用户计划
     */

  }, {
    key: 'getUserPlan',
    value: function getUserPlan(ipfsHash) {
      if (!_get(UserPlanContract.prototype.__proto__ || Object.getPrototypeOf(UserPlanContract.prototype), 'unlockAccount', this).call(this)) {
        console.log('解锁账户失败');
      }
      // 返回结果
      var result = this.userPlanInstance.getUserPlan(ipfsHash);
      console.log('result', result.toString());
    }

    /**
     * 删除合约中的用户计划
     */

  }, {
    key: 'deleteUserPlan',
    value: function deleteUserPlan(ipfsHash) {
      if (!_get(UserPlanContract.prototype.__proto__ || Object.getPrototypeOf(UserPlanContract.prototype), 'unlockAccount', this).call(this)) {
        console.log('解锁账户失败');
      }
      // 设置返回事件
      var instructorEvent = this.userPlanInstance.LogDeleteUserPlan(); // eslint-disable-line
      this.userPlanInstance.deleteUserPlan(ipfsHash, { from: _config2.default.coinbase, gas: 300000, fromBlock: 0, toBlock: 'latest' });
      instructorEvent.watch(function (error, result) {
        if (!error) {
          console.log(JSON.stringify(result));
        } else {
          console.log(error);
        }
      });
    }
  }]);

  return UserPlanContract;
}(_BaseContract3.default);

exports.default = UserPlanContract;
//# sourceMappingURL=userPlanContract.js.map
