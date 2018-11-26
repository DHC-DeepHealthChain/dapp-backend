'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 获取所有评论
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
var getList = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$query, _req$query$pageSize, pageSize, _req$query$page, page, userId, comments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$query = req.query, _req$query$pageSize = _req$query.pageSize, pageSize = _req$query$pageSize === undefined ? 20 : _req$query$pageSize, _req$query$page = _req$query.page, page = _req$query$page === undefined ? 0 : _req$query$page;
            userId = (0, _jwtUtil.getUserId)(req, res);
            _context.next = 5;
            return _comment2.default.list({ pageSize: pageSize, page: page, userId: userId });

          case 5:
            comments = _context.sent;

            if (!(comments !== null)) {
              _context.next = 10;
              break;
            }

            _context.next = 9;
            return (0, _ipfsList.getContentsByHash)(comments);

          case 9:
            comments = _context.sent;

          case 10:
            res.json(new _responseData2.default(comments));
            return _context.abrupt('return', undefined);

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', next(_context.t0));

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 14]]);
  }));

  return function getList(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 添加一个评论
 * @param {*} res
 * @param {*} req
 */


var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _comment = require('../../models/jkbapp/comment.model');

var _comment2 = _interopRequireDefault(_comment);

var _jwtUtil = require('../../utils/jwtUtil');

var _ipfsList = require('../../utils/ipfsList');

var _ipfsFile = require('../../utils/ipfsFile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function create(req, res, next) {
  // 定义ipfs中存储的数据
  var userid = (0, _jwtUtil.getUserId)(req, res);
  var ipfsData = {
    userId: userid,
    commentType: req.body.commentType,
    content: req.body.content,
    toCommenterId: req.body.toCommenterId,
    resourceId: req.body.resourceId,
    level: req.body.level
  };
  // 上传到IPFS
  (0, _ipfsFile.addContent)(ipfsData).then(function (hash) {
    // 定义mongo存储的数据
    var comment = new _comment2.default({
      ipfsHash: hash,
      userId: userid,
      commentType: req.body.commentType,
      toCommenterId: req.body.toCommenterId,
      resourceId: req.body.resourceId,
      level: req.body.level
    });
    // 保存数据库
    _comment2.default.create(comment);
    // 上传到合约 代做
    return res.json(new _responseData2.default('添加成功'));
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * 删除评论
 * @param {*} req
 * @param {*} res
 */
function remove(req, res) {
  _comment2.default.get(req.params.commentId).then(function (comment) {
    _comment2.default.remove(comment).then(function () {
      return res.json(new _responseData2.default({}, false, '删除成功'));
    }).catch(function (e) {
      return res.json(new _responseData2.default({}, false, e));
    });
  });
}

exports.default = { getList: getList, create: create, remove: remove };
//# sourceMappingURL=comment.controller.js.map
