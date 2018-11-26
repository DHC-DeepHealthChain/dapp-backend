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
      var contractAddress = '0x36b20248b4f9acb9481a9195841958e2c3462997';
      // 定义ABI
      var abiArray = [{ "constant": false, "inputs": [{ "name": "planHash", "type": "bytes32" }], "name": "addPlan", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "planHash", "type": "bytes32" }], "name": "deletePlan", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "planHash", "type": "bytes32" }], "name": "addUserPlan", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "planHash", "type": "bytes32" }], "name": "deleteUserPlan", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "planHash", "type": "bytes32" }, { "name": "continueDay", "type": "uint256" }], "name": "updateUserPlan", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }]; // eslint-disable-line
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
//# sourceMappingURL=planItemContract.js.map
