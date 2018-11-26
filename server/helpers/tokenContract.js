import Web3 from 'web3';
import config from '../../config/config';

let web3;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
}

export default class TokenContract {
  constructor() {
    this.tokenInstance = null;
  }
  initContract() {
    const contractAddress = '0x8fe9a18e19a1be7909b31ae626b9f3af6ca5bdbb';
    // 定义ABI
    const abiArray = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"},{"name":"decimalsUnits","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"sayHello","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_noteKey","type":"bytes32"},{"name":"_content","type":"bytes32"}],"name":"setNote","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];// eslint-disable-line
    this.tokenInstance = web3.eth.contract(abiArray).at(contractAddress);
    if (!this.tokenInstance) {
      console.log('初始化合约失败');
    }
  }

  async transferToken(account, point) {
    if (!this.tokenInstance) this.initContract();
    // check
    if (!account) {
      console.log('账号不能为空.');
      return;
    }
    // 设置默认账号
    const defaultAccount = '0x7eff122b94897ea5b0e2a9abf47b86337fafebdc';
    web3.eth.defaultAccount = defaultAccount;
    // 转换单位
    const value = await web3.toWei(point, 'ether');
    // 解锁账户
    const flag = web3.personal.unlockAccount(defaultAccount, '1234', 2);
    if (flag) {
      const transcation = { from: defaultAccount, to: account, value };
      try {
        // 使用web3 添加交易记录
        const transtionToken = await web3.eth.sendTransaction(transcation);
        console.log('transtionToken', transtionToken);
      } catch (e) {
        console.log('e', e);
      }
    }
  }
}
