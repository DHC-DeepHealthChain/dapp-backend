// import multihash from 'multihashes';
import BaseContract from './BaseContract';
import config from '../../config/config';

export default class UserPlanContract extends BaseContract {
  constructor() {
    super();
    this.contractAddress = '0x794448cfbeb355e5b86aba0b62a00317e5ef297b';
    // 定义ABI
    this.abiArray = [{"anonymous":false,"inputs":[{"indexed":false,"name":"index","type":"uint256"},{"indexed":false,"name":"ipfsHash","type":"bytes32"}],"name":"LogNewUserPlan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"index","type":"uint256"},{"indexed":false,"name":"ipfsHash","type":"bytes32"}],"name":"LogUpdateUserPlan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ipfsHash","type":"bytes32"},{"indexed":false,"name":"index","type":"uint256"}],"name":"LogDeleteUserPlan","type":"event"},{"constant":true,"inputs":[{"name":"ipfsHash","type":"bytes32"}],"name":"isUserPlan","outputs":[{"name":"isIndeed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ipfsHash","type":"bytes32"}],"name":"insertUserPlan","outputs":[{"name":"index","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ipfsHash","type":"bytes32"}],"name":"deleteUserPlan","outputs":[{"name":"index","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"ipfsHash","type":"bytes32"}],"name":"getUserPlan","outputs":[{"name":"index","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUserPlanCount","outputs":[{"name":"count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getUserPlanAtIndex","outputs":[{"name":"ipfsHash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}];// eslint-disable-line
    this.userPlanInstance = super.initContract(this.abiArray, this.contractAddress);

    if (!this.userPlanInstance) {
      console.log('初始化合约失败');
    }
  }
  /**
   * 添加用户计划
   * @param {*} ipfsHash
   */
  addUserPlan(ipfsHash) {
    const flag = super.unlockAccount();
    if (!flag) {
      console.log('解锁账户失败');
    }
    // const buf = Buffer.from(ipfsHash, 'hex');
    // const encodedHash = multihash.encode(buf, 'sha1');
    //  this.userPlanInstance.insertUserPlan(ipfsHash);
    const instructorEvent = this.userPlanInstance.LogNewUserPlan();// eslint-disable-line
    this.userPlanInstance.insertUserPlan(ipfsHash, { from: config.coinbase, gas: 300000, fromBlock: 0, toBlock: 'latest' });
    instructorEvent.watch((error, result) => {
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
  getUserPlan(ipfsHash) {
    if (!super.unlockAccount()) {
      console.log('解锁账户失败');
    }
    // 返回结果
    const result = this.userPlanInstance.getUserPlan(ipfsHash);
    console.log('result', result.toString());
  }

  /**
   * 删除合约中的用户计划
   */
  deleteUserPlan(ipfsHash) {
    if (!super.unlockAccount()) {
      console.log('解锁账户失败');
    }
    // 设置返回事件
    const instructorEvent = this.userPlanInstance.LogDeleteUserPlan();// eslint-disable-line
    this.userPlanInstance.deleteUserPlan(ipfsHash, { from: config.coinbase, gas: 300000, fromBlock: 0, toBlock: 'latest' });
    instructorEvent.watch((error, result) => {
      if (!error) {
        console.log(JSON.stringify(result));
      } else {
        console.log(error);
      }
    });
  }

}
