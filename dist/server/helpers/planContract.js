"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlanContract = function () {
  function PlanContract() {
    _classCallCheck(this, PlanContract);

    this.planInstance = null;
  }

  _createClass(PlanContract, [{
    key: "initContract",
    value: function initContract() {
      var contractAddress = '0xff30125892451cbeee6d592c8b437a5f789128a7';
      // 定义ABI
      var abiArray = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "tokenName", "type": "string" }, { "name": "tokenSymbol", "type": "string" }, { "name": "decimalsUnits", "type": "uint8" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "sayHello", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_noteKey", "type": "bytes32" }, { "name": "_content", "type": "bytes32" }], "name": "setNote", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }]; // eslint-disable-line
      this.planInstance = global.web3.eth.contract(abiArray).at(contractAddress);
      if (!this.planInstance) {
        console.log('初始化合约失败');
      }
    }
    // 添加计划单

  }, {
    key: "post",
    value: function post(planHash) {
      if (!this.tokenInstance) this.initContract();
      // 设置默认账号
      var defaultAccount = '0x0ba6dadf31b4725a3e34735fcadace9ee15db1fd';
      global.web3.eth.defaultAccount = defaultAccount;
      // 解锁账号
      global.web3.personal.unlockAccount(defaultAccount, 'wenjie520');
      // 添加hash
      var planToken = this.planInstance.deletePlan(planHash);
      console.log(planToken);
    }

    // 添加计划单

  }, {
    key: "delete",
    value: function _delete(planHash) {
      // 添加hash
      var planToken = this.planInstance.deletePlan(planHash);
      console.log(planToken);
    }

    // 添加计划单

  }, {
    key: "addUserPlan",
    value: function addUserPlan(planHash) {
      // 添加hash
      var planToken = this.planInstance.addUserPlan(planHash);
      console.log(planToken);
    }

    // 删除计划单

  }, {
    key: "deleteUserPlan",
    value: function deleteUserPlan(planHash) {
      // 删除hash
      var planToken = this.planInstance.deleteUserPlan(planHash);
      console.log(planToken);
    }

    // 更新计划单

  }, {
    key: "updateUserPlan",
    value: function updateUserPlan(planHash, continueDay) {
      // 添加hash
      var planToken = this.planInstance.updateUserPlan(planHash, continueDay);
      console.log(planToken);
    }
  }]);

  return PlanContract;
}();

exports.default = PlanContract;
//# sourceMappingURL=planContract.js.map
