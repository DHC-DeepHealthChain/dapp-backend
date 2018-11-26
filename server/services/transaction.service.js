import Web3 from 'web3';
import EthereumTx from 'ethereumjs-tx';
import config from '../../config/config';
import ResData from '../helpers/responseData';
import Scorelog from '../services/jkbapp/scorelog.service';
import User from '../models/user.model';
import Transcation from '../models/transcation.model';

let web3;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
}

/**
 * Get transcation list.
 * @property {number} req.query.skip - Number of transcations to be skipped.
 * @property {number} req.query.limit - Limit number of transcations to be returned.
 * @returns {Transcation[]}
 */
async function list(pageSize, page, publicKey) {
  // 计算总数
  let total = 0;
  // 根据分页条件获取文章列表
  let transcations;
  if (publicKey !== '') {
    transcations = await Transcation.findByFromOrTo(pageSize, page, publicKey);
    total = await Transcation.countByPublicKey(publicKey);
  } else {
    transcations = await Transcation.list(pageSize, page);
    total = await Transcation.countAll();
  }
  // 组装分页结果
  const pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
  // 下次app发版是解开
  const result = { list: transcations, pagination };
  return result;
}

/**
 * 添加转账记录
 */
async function createTransaction(from, paicateKey, to, price) {
  const gasPriceT = web3.eth.gasPrice;
  const gasPrice = parseInt(gasPriceT, 10);
  const value = parseInt(web3.toWei(price, 'ether'), 10);
  const privateKey = Buffer.from(paicateKey, 'hex');
  const txParams = {
    nonce: web3.eth.getTransactionCount(from),
    gasPrice,
    gasLimit: 21000,
    to,
    value,
  };
  console.log('from:', from);
  console.log('交易记录', txParams);
  const tx = new EthereumTx(txParams);
  tx.sign(privateKey);
  const serializedTx = tx.serialize();
  try {
    const hash = await web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));// eslint-disable-line
    // 添加积分交易日志 from 、 to 都有
    await createTransactionLog(from, to, price);
    return new ResData(hash, false, null);
  } catch (error) {
    return new ResData(null, true, error.toString());
  }
}

/**
 * 创建用户交易日志
 * 存储在ScoreLog中
 * @param {*} from
 * @param {*} to
 * @param {*} price
 */
async function createTransactionLog(from, to, price) {
  // 检查 from 是否存在
  const userOut = await User.getByPublicKey(from);
  if (userOut !== null) {
    await Scorelog.create(userOut._id, 'OUTPUT', price);
  }
  // 检查 to 是否存在
  const userIn = await User.getByPublicKey(to);
  if (userIn !== null) {
    await Scorelog.create(userIn._id, 'INPUT', price);
  }
}

export default { createTransaction, list };
