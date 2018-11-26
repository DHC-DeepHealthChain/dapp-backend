import Web3 from 'web3';
import PlanContract from '../helpers/planContract';
import Account from '../models/account.model';
import ResData from '../helpers/responseData';
import config from '../../config/config';

let web3;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));
}

/**
 * Load account and append to req.
 */
function load(req, res, next, id) {
  Account.get(id)
    .then((account) => {
      req.account = account; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

// function getNameByJwt(req){
//   var authorization = req.headers.authorization,
//   decoded;
//   try {
//   decoded = jwt.verify(authorization, config.jwtSecret );
//   } catch(e){
//     console.log(e);
//   }
//   console.log(decoded);
//   var accountName = decoded.accountname;
//   return accountName;
// }

/**
 * Get account
 * @returns {Account}
 */
function get(req, res) {
  console.log('get');
  return res.json(new ResData(req.account));
}

/**
 * Create new account
 * @property {string} req.body.accountname - The accountname of account.
 * @property {string} req.body.mobileNumber - The mobileNumber of account.
 * @property {string} req.body.password -The password of account.
 * @returns {Account}
 */
function create(req) {
  // 校验账号是否已经注册
  Account.checkByName(req.body.username, req.body.address).then((result) => {
    const planContract = new PlanContract();
    planContract.post('test');
    console.log(result);
    // if (web3.isAddress(req.body.address) === false) {
    //   return new Promise(res.json(new ResData(null, true, '添加的地址不符合规则')));
    // }
    // if (result === true) {
    //   return new Promise(res.json(new ResData(null, true, '该地址已经存在')));
    // }
    // const account = new Account({
    //   username: req.body.username,
    //   address: req.body.address,
    // });
    // account.save()
    //   .then(() => res.json(new ResData({}, false, '设置成功！')))
    //   .catch(e => next(e));
    return null;
  });
}

/**
 * Update existing account
 * @property {string} req.body.accountname - The accountname of account.
 * @property {string} req.body.mobileNumber - The mobileNumber of account.
 * @returns {Account}
 */
function update(req, res, next) {
  const account = req.account;
  account.accountname = req.body.accountname;
  account.mobileNumber = req.body.mobileNumber;

  account.save()
    .then(() => res.json(new ResData({}, false, '修改成功')))
    .catch(e => next(e));
}

/**
 * Get account list.
 * @property {number} req.query.skip - Number of accounts to be skipped.
 * @property {number} req.query.limit - Limit number of accounts to be returned.
 * @returns {Account[]}
 */
function getByName(req, res, next) {
  Account.getByName(req.query.username)
    .then((accounts) => {
      if (accounts != null) {
        for (let i = 0; i < accounts.length; i += 1) {
          accounts[i].balance =// eslint-disable-line no-param-reassign
          web3.fromWei(web3.eth.getBalance(accounts[i].address));
        }
      }
      res.json(new ResData(accounts));
    })
    .catch(e => next(e));
}

/**
 * Delete account.
 * @returns {Account}
 */
function remove(req, res, next) {
  const account = req.account;
  account.remove()
    .then(() => res.json(new ResData({}, false, '删除成功')))
    .catch(e => next(e));
}

export default { load, get, create, update, remove, getByName };
