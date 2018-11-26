import async from 'async';
import Block from '../models/block.model';
import ResData from '../helpers/responseData';
// import jwt from 'jsonwebtoken';
// import config from '../../config/config';

/**
 * Load block and append to req.
 */
function load(req, res, next, id) {
  Block.get(id)
    .then((block) => {
      req.block = block; // eslint-disable-line no-param-reassign
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
//   var blockName = decoded.blockname;
//   return blockName;
// }

/**
 * Get block
 * @returns {Block}
 */
function get(req, res) {
  console.log('get');
  return res.json(new ResData(req.block));
}

/**
 * Get block list.
 * @property {number} req.query.skip - Number of blocks to be skipped.
 * @property {number} req.query.limit - Limit number of blocks to be returned.
 * @returns {Block[]}
 */
function list(req, res, next) {
  const { pageSize = 20, page = 0 } = req.query;
  pageList(Number(pageSize), Number(page), {}, next, res);
}

function pageList(limit, skip, condition, next, res) {
  const countQuery = (callback) => {
    Block.count(condition, (err, counter) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, counter);
      }
    });
  };

  const retrieveQuery = (callback) => {
    Block.find(condition).skip(+(skip * limit))
                 .sort({ timestamp: -1 })
                 .limit(limit)
                 .exec((err, doc) => {
                   if (err) {
                     callback(err, null);
                   } else {
                     callback(null, doc);
                   }
                 });
  };

  async.parallel([countQuery, retrieveQuery], (err, results) => {
        // err contains the array of error of all the functions
        // results contains an array of all the results
        // results[0] will contain value of doc.length from countQuery function
        // results[1] will contain doc of retrieveQuery function
        // You can send the results as
    if (err) {
      next(err);
    } else {
      res.json(new ResData({
        list: results[1], pagination: { pageSize: limit, current: skip, total: results[0] }
      }));
    }
  });
}

export default { load, get, list };
