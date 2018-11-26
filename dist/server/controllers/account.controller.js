'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _planContract = require('../helpers/planContract');

var _planContract2 = _interopRequireDefault(_planContract);

var _account = require('../models/account.model');

var _account2 = _interopRequireDefault(_account);

var _responseData = require('../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var web3 = void 0;
if (typeof web3 !== 'undefined') {
  web3 = new _web2.default(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new _web2.default(new _web2.default.providers.HttpProvider(_config2.default.web3Provider));
}

/**
 * Load account and append to req.
 */
function load(req, res, next, id) {
  _account2.default.get(id).then(function (account) {
    req.account = account; // eslint-disable-line no-param-reassign
    return next();
  }).catch(function (e) {
    return next(e);
  });
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
  return res.json(new _responseData2.default(req.account));
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
  _account2.default.checkByName(req.body.username, req.body.address).then(function (result) {
    var planContract = new _planContract2.default();
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
  var account = req.account;
  account.accountname = req.body.accountname;
  account.mobileNumber = req.body.mobileNumber;

  account.save().then(function () {
    return res.json(new _responseData2.default({}, false, '修改成功'));
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Get account list.
 * @property {number} req.query.skip - Number of accounts to be skipped.
 * @property {number} req.query.limit - Limit number of accounts to be returned.
 * @returns {Account[]}
 */
function getByName(req, res, next) {
  _account2.default.getByName(req.query.username).then(function (accounts) {
    if (accounts != null) {
      for (var i = 0; i < accounts.length; i += 1) {
        accounts[i].balance = // eslint-disable-line no-param-reassign
        web3.fromWei(web3.eth.getBalance(accounts[i].address));
      }
    }
    res.json(new _responseData2.default(accounts));
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * Delete account.
 * @returns {Account}
 */
function remove(req, res, next) {
  var account = req.account;
  account.remove().then(function () {
    return res.json(new _responseData2.default({}, false, '删除成功'));
  }).catch(function (e) {
    return next(e);
  });
}

exports.default = { load: load, get: get, create: create, update: update, remove: remove, getByName: getByName };
//# sourceMappingURL=account.controller.js.map
