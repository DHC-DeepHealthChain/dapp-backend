export default class PlanContract {
  constructor() {
    this.planInstance = null;
  }
  initContract() {
    const contractAddress = '0x36b20248b4f9acb9481a9195841958e2c3462997';
    // 定义ABI
    const abiArray = [{"constant":false,"inputs":[{"name":"planHash","type":"bytes32"}],"name":"addPlan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"planHash","type":"bytes32"}],"name":"deletePlan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"planHash","type":"bytes32"}],"name":"addUserPlan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"planHash","type":"bytes32"}],"name":"deleteUserPlan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"planHash","type":"bytes32"},{"name":"continueDay","type":"uint256"}],"name":"updateUserPlan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];// eslint-disable-line
    this.planInstance = global.web3.eth.contract(abiArray).at(contractAddress);
    if (!this.planInstance) {
      console.log('初始化合约失败');
    }
  }
  // 添加计划单
  post(planHash) {
    if (!this.tokenInstance) this.initContract();
    // 设置默认账号
    const defaultAccount = '0x0ba6dadf31b4725a3e34735fcadace9ee15db1fd';
    global.web3.eth.defaultAccount = defaultAccount;
    // 解锁账号
    global.web3.personal.unlockAccount(defaultAccount, 'wenjie520');
    // 添加hash
    const planToken = this.planInstance.deletePlan(planHash);
    console.log(planToken);
  }

  // 添加计划单
  delete(planHash) {
    // 添加hash
    const planToken = this.planInstance.deletePlan(planHash);
    console.log(planToken);
  }

  // 添加计划单
  addUserPlan(planHash) {
    // 添加hash
    const planToken = this.planInstance.addUserPlan(planHash);
    console.log(planToken);
  }

   // 删除计划单
  deleteUserPlan(planHash) {
    // 删除hash
    const planToken = this.planInstance.deleteUserPlan(planHash);
    console.log(planToken);
  }

  // 更新计划单
  updateUserPlan(planHash, continueDay) {
    // 添加hash
    const planToken = this.planInstance.updateUserPlan(planHash, continueDay);
    console.log(planToken);
  }


}
