'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 获取文章列表
 * @param {*} req
 * @param {*} res
 */
var list = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$query, _req$query$pageSize, pageSize, _req$query$page, page, passType, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, _req$query$pageSize = _req$query.pageSize, pageSize = _req$query$pageSize === undefined ? 20 : _req$query$pageSize, _req$query$page = _req$query.page, page = _req$query$page === undefined ? 0 : _req$query$page, passType = _req$query.passType;
            _context.next = 3;
            return _article2.default.list(pageSize, page, passType);

          case 3:
            result = _context.sent;
            return _context.abrupt('return', res.json(new _responseData2.default(result, false, null)));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function list(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 添加新文章
 * @param {*} req
 * @param {*} res
 */


var create = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var userid, body, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // 定义ipfs中存储的数据
            userid = (0, _jwtUtil.getUserId)(req, res);
            body = {
              name: req.body.name,
              releaseTime: req.body.releaseTime,
              releaseMan: req.body.releaseMan,
              readNum: req.body.readNum,
              listImg: req.body.listImg,
              content: req.body.content,
              comeFrom: req.body.comeFrom,
              summary: req.body.summary
            };
            _context2.next = 4;
            return _article2.default.create(userid, body);

          case 4:
            result = _context2.sent;

            res.json(new _responseData2.default(null, false, result));

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function create(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 删除文章
 * @param {*} req
 * @param {*} res
 */


var remove = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _id, result;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _id = req.params.articleId;
            _context3.next = 3;
            return _article2.default.remove(_id);

          case 3:
            result = _context3.sent;

            res.json(new _responseData2.default(null, false, result));

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function remove(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * 根据文章id获取文章详情(无需用户登录)
 * @param {*} req
 * @param {*} res
 */


var infoNoUser = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var articleId, resultBody;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            articleId = req.params.articleId;
            _context4.next = 3;
            return _article2.default.infoNoUser(articleId);

          case 3:
            resultBody = _context4.sent;

            if (!resultBody.error) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt('return', res.json(new _responseData2.default(null, true, resultBody.message)));

          case 6:
            return _context4.abrupt('return', res.json(new _responseData2.default(resultBody.result, false, null)));

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function infoNoUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * 根据文章id获取文章详情
 * @param {*} req
 * @param {*} res
 */


var info = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var userId, articleId, resultBody;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            userId = (0, _jwtUtil.getUserId)(req, res);
            articleId = req.params.articleId;
            _context5.next = 4;
            return _article2.default.info(userId, articleId);

          case 4:
            resultBody = _context5.sent;
            return _context5.abrupt('return', res.json(resultBody));

          case 6:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function info(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * 分享文章
 * @param {*} req
 * @param {*} res
 */


var share = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var userId, articleId, result;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            userId = (0, _jwtUtil.getUserId)(req, res);
            articleId = req.params.articleId;
            _context6.next = 4;
            return _article2.default.share(userId, articleId);

          case 4:
            result = _context6.sent;
            return _context6.abrupt('return', res.json(new _responseData2.default(null, false, result)));

          case 6:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function share(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * 审核文章
 * @param {*} req
 * @param {*} res
 */


var pass = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var articleIds, passType, result;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            articleIds = req.body.articleIds;
            passType = req.body.pass;
            _context7.next = 4;
            return _article2.default.pass(articleIds, passType);

          case 4:
            result = _context7.sent;
            return _context7.abrupt('return', res.json(new _responseData2.default(null, false, result)));

          case 6:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function pass(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _jwtUtil = require('../../utils/jwtUtil');

var _article = require('../../services/jkbapp/article.service');

var _article2 = _interopRequireDefault(_article);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = { list: list, create: create, info: info, infoNoUser: infoNoUser, remove: remove, share: share, pass: pass };
//# sourceMappingURL=article.controller.js.map
