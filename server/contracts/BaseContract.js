import Web3 from 'web3';
import config from '../../config/config';

export default class BaseContract {
  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
  }
  /**
  * 初始化合约
  */
  initContract(abi, address) {
    this.unlockAccount();
    return this.web3.eth.contract(abi).at(address);
  }
  /**
   * 解说账号
   */
  unlockAccount() {
    console.log('config.coinbase', config.coinbase);
    console.log('config.coinbasePass', config.coinbasePass);
    return this.web3.personal.unlockAccount(config.coinbase, config.coinbasePass, 1);
  }
}
