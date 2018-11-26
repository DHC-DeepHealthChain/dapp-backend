'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _block = require('../models/block.model');

var _block2 = _interopRequireDefault(_block);

var _responseData = require('../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import jwt from 'jsonwebtoken';
// import config from '../../config/config';

/**
 * Load block and append to req.
 */
function load(req, res, next, id) {
  _block2.default.get(id).then(function (block) {
    req.block = block; // eslint-disable-line no-param-reassign
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
//   var blockName = decoded.blockname;
//   return blockName;
// }

/**
 * Get block
 * @returns {Block}
 */
function get(req, res) {
  console.log('get');
  return res.json(new _responseData2.default(req.block));
}

/**
 * Get block list.
 * @property {number} req.query.skip - Number of blocks to be skipped.
 * @property {number} req.query.limit - Limit number of blocks to be returned.
 * @returns {Block[]}
 */
function list(req, res, next) {
  var _req$query = req.query,
      _req$query$pageSize = _req$query.pageSize,
      pageSize = _req$query$pageSize === undefined ? 20 : _req$query$pageSize,
      _req$query$page = _req$query.page,
      page = _req$query$page === undefined ? 0 : _req$query$page;

  pageList(Number(pageSize), Number(page), {}, next, res);
}

function pageList(limit, skip, condition, next, res) {
  var countQuery = function countQuery(callback) {
    _block2.default.count(condition, function (err, counter) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, counter);
      }
    });
  };

  var retrieveQuery = function retrieveQuery(callback) {
    _block2.default.find(condition).skip(+(skip * limit)).sort({ timestamp: -1 }).limit(limit).exec(function (err, doc) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, doc);
      }
    });
  };

  _async2.default.parallel([countQuery, retrieveQuery], function (err, results) {
    // err contains the array of error of all the functions
    // results contains an array of all the results
    // results[0] will contain value of doc.length from countQuery function
    // results[1] will contain doc of retrieveQuery function
    // You can send the results as
    if (err) {
      next(err);
    } else {
      res.json(new _responseData2.default({
        list: results[1], pagination: { pageSize: limit, current: skip, total: results[0] }
      }));
    }
  });
}

exports.default = { load: load, get: get, list: list };
//# sourceMappingURL=block.controller.js.map
