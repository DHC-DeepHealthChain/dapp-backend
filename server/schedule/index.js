import Web3 from 'web3';
import schedule from 'node-schedule';
import Block from '../models/block.model';
import Transaction from '../models/transcation.model';
import config from '../../config/config';

const debug = require('debug')('dhc-api:getBlockInfo');
// const querystring = require('querystring');

export default class GetBlockInfo {
  constructor() {
    this.web3 = undefined;
    this.lastSaveBlockNum = 0;
    this.currentBlockNum = 0;
  }

  runSchedule() {
    // this.initWeb3();
    // this.getBlockInfo();
    const thz = this;
    schedule.scheduleJob('50 * * * * *', () => {
      thz.initWeb3();
      thz.getBlockInfo();
    });
  }
  initWeb3() {
    if (typeof this.web3 !== 'undefined') {
      this.web3 = new Web3(this.web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      this.web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
    }
  }

  static async blockSave(result) {
    const { transactions } = result;
    const res = JSON.parse(JSON.stringify(result));
    delete res.transactions;
    debug('result', result);
    Block.update({ hash: res.hash }, res, { multi: true, upsert: true }, (err, docs) => {
      if (err) {
        debug('err', err);
      } else if (transactions.length !== 0) {
        debug('docs', docs);
        transactions.map((e) => {
          const transcation = new Transaction(e);
          transcation.save()
            .then(() => {
              debug('保存成功');
            });
          return undefined;
        });
      }
    });
  }

  /**
   * 异步获取区块信息
   * @param {*} resolve
   * @param {*} reject
   */
  getBlock(resolve, reject) {
    this.web3.eth.getBlock(this.currentBlockNum, true, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }

  async getBlockInfo() {
    const limit = 1;
    const skip = 0;
    const { blockNumber } = this.web3.eth;
    const thz = this;
    try {
      // 存储的最新块
      const lastSaveBlock = await Block.list({ limit, skip });
      if (lastSaveBlock.length === 0) {
        thz.lastSaveBlockNum = 0;
        thz.currentBlockNum = 0;
      } else {
        thz.lastSaveBlockNum = lastSaveBlock[0].number;
        thz.currentBlockNum = lastSaveBlock[0].number;
      }
    } catch (error) {
      debug('err', error);
    }
    if (this.lastSaveBlockNum === blockNumber) {
      debug('当前存储区块已经是最新');
    }
    // 获取存储的最新区块与当前最新区块之间的块
    for (let i = this.lastSaveBlockNum + 1; i <= blockNumber; i += 1) {
      this.currentBlockNum = i;
      const asyncGet = new Promise(thz.getBlock.bind(thz));
      try {
        const result = await asyncGet;
        GetBlockInfo.blockSave(result);
      } catch (error) {
        debug('err', error);
      }
    }
  }
}


const getBlock = new GetBlockInfo();
// GetBlockInfo.runSchedule();

// getBlock.runSchedule();

let timer = null;
/**
 * 防止web3没有初始化成功就执行任务
 */
timer = setInterval(() => {
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
