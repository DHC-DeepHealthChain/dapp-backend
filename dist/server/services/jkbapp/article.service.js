'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 获取文章列表
 * @param {*} pageSize
 * @param {*} page
 */
var list = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(pageSize, page, passType) {
    var total, articles, pagination, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _article2.default.countAll(passType);

          case 2:
            total = _context2.sent;
            _context2.next = 5;
            return _article2.default.list(pageSize, page, passType);

          case 5:
            articles = _context2.sent;

            if (!(articles !== null)) {
              _context2.next = 13;
              break;
            }

            _context2.next = 9;
            return (0, _ipfsList.getContentsByHash)(articles);

          case 9:
            articles = _context2.sent;
            _context2.next = 12;
            return (0, _ipfsList.getListImgByHash)(articles);

          case 12:
            articles = _context2.sent;

          case 13:
            // 组装分页结果
            pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
            // 下次app发版是解开

            result = { list: articles, pagination: pagination };
            return _context2.abrupt('return', result);

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function list(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 添加新文章
 * @param {*} userid
 * @param {*} body
 */


var create = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userid, body) {
    var ipfsData, hash, article;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // 定义ipfs中存储的数据
            ipfsData = {
              userId: userid,
              name: body.name,
              releaseTime: body.releaseTime,
              releaseMan: body.releaseMan,
              readNum: body.readNum,
              listImg: body.listImg,
              content: body.content,
              comeFrom: body.comeFrom,
              summary: body.summary
            };
            // 上传到IPFS

            _context3.next = 3;
            return (0, _ipfsFile.addContent)(ipfsData);

          case 3:
            hash = _context3.sent;

            // 定义mongo存储的数据
            article = new _article2.default({
              ipfsHash: hash,
              userId: userid,
              name: body.name,
              releaseTime: body.releaseTime,
              releaseMan: body.releaseMan,
              readNum: body.readNum,
              listImg: body.listImg,
              comeFrom: body.comeFrom,
              summary: body.summary
            });
            // 保存数据库

            _context3.next = 7;
            return _article2.default.create(article);

          case 7:
            return _context3.abrupt('return', '添加成功');

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function create(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * 删除文章
 * @param {*} _id
 */


var remove = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_id) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _article2.default.findOneAndUpdate({ _id: _id }, { delete: true });

          case 2:
            return _context4.abrupt('return', '删除成功');

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function remove(_x7) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * 根据文章id获取文章详情（无需用户登录）
 * @param {*} articleId
 */


var infoNoUser = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(articleId) {
    var article, content, _id, readNumT, ipfsData, hash, trueImg;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _article2.default.get(articleId);

          case 2:
            article = _context5.sent;
            _context5.next = 5;
            return getIpfsContent(article.ipfsHash);

          case 5:
            content = _context5.sent;

            article.content = content;

            // 增加readNum次数
            _id = article._id;
            readNumT = parseInt(article.readNum, 10) + 1;
            ipfsData = {
              userId: article.userId,
              name: article.name,
              releaseTime: article.releaseTime,
              releaseMan: article.releaseMan,
              readNum: readNumT,
              listImg: article.listImg,
              content: JSON.parse(article.content).content,
              comeFrom: article.comeFrom
            };
            // 上传到IPFS

            _context5.next = 12;
            return (0, _ipfsFile.addContent)(ipfsData);

          case 12:
            hash = _context5.sent;
            _context5.next = 15;
            return _article2.default.findOneAndUpdate({ _id: _id }, { readNum: readNumT, ipfsHash: hash });

          case 15:
            _context5.next = 17;
            return (0, _ipfsFile.getContent)(article.listImg, 'noString');

          case 17:
            trueImg = _context5.sent;

            article.listImg = trueImg.toString('base64');
            return _context5.abrupt('return', new _responseData2.default(article, false, null));

          case 20:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function infoNoUser(_x8) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * 根据文章id获取文章详情
 * @param {*} userId
 * @param {*} articleId
 */


var info = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userId, articleId) {
    var article, content, isFavorite, favorites, _id, readNumT, ipfsData, hash, trueImg;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _article2.default.get(articleId);

          case 2:
            article = _context6.sent;
            _context6.next = 5;
            return getIpfsContent(article.ipfsHash);

          case 5:
            content = _context6.sent;

            article.content = content;
            // 检测是否收藏
            isFavorite = false;
            _context6.next = 10;
            return _favorite2.default.getByUserIdAndArticleId(userId, articleId);

          case 10:
            favorites = _context6.sent;

            if (favorites != null && favorites.length > 0 && favorites[0].delete === false) {
              isFavorite = true;
            }
            article.isFavorite = isFavorite;
            // 增加readNum次数
            _id = article._id;
            readNumT = parseInt(article.readNum, 10) + 1;
            ipfsData = {
              userId: article.userId,
              name: article.name,
              releaseTime: article.releaseTime,
              releaseMan: article.releaseMan,
              readNum: readNumT,
              listImg: article.listImg,
              content: JSON.parse(article.content).content,
              comeFrom: article.comeFrom
            };
            // 上传到IPFS

            _context6.next = 18;
            return (0, _ipfsFile.addContent)(ipfsData);

          case 18:
            hash = _context6.sent;
            _context6.next = 21;
            return _article2.default.findOneAndUpdate({ _id: _id }, { readNum: readNumT, ipfsHash: hash });

          case 21:
            if (!(article.listImg && article.listImg.indexOf('http') < 0)) {
              _context6.next = 26;
              break;
            }

            _context6.next = 24;
            return (0, _ipfsFile.getContent)(article.listImg, 'noString');

          case 24:
            trueImg = _context6.sent;

            article.listImg = trueImg.toString('base64');

          case 26:
            _context6.next = 28;
            return addArticleLog(userId, articleId, 'ReadArticle');

          case 28:
            return _context6.abrupt('return', new _responseData2.default(article, false, null));

          case 29:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function info(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * 分享文章
 * @param {*} userId
 * @param {*} articleId
 */


var share = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(userId, articleId) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return addArticleLog(userId, articleId, 'ShareArticle');

          case 2:
            return _context7.abrupt('return', '分享成功');

          case 3:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function share(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * 审核文章
 * @param {*} req
 * @param {*} res
 */


var pass = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(articleIds, passType) {
    var _this = this;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            articleIds.map(function () {
              var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(item) {
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return _article2.default.findByIdAndUpdate({ _id: item }, { pass: passType });

                      case 2:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, _callee8, _this);
              }));

              return function (_x15) {
                return _ref9.apply(this, arguments);
              };
            }());
            return _context9.abrupt('return', new _responseData2.default(null, false, '设置成功'));

          case 2:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function pass(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();

/** 内部方法开始 ****************************/
/**
 * 添加阅读\分享日志
 */


var addArticleLog = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(userId, articleId, taskType) {
    var articleLog, todayStartDate, todayFlag, ipfsDataArticleLog, hashArticleLog, newArticleLog;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _articleLog2.default.existByUserIdAndArticleIdAndType(userId, articleId, taskType);

          case 2:
            articleLog = _context10.sent;
            // eslint-disable-line
            // existFlag 为 true 表示已分享过，false表示未分享过

            // 判断今日是否达到分享上线
            // 获取今日开始时间
            todayStartDate = _dateUtil2.default.getDayStartDate();
            // todayFlag 为 true 表示已达到上限，false表示未分达到上限，可加积分

            todayFlag = void 0;
            _context10.t0 = taskType;
            _context10.next = _context10.t0 === 'ReadArticle' ? 8 : _context10.t0 === 'ShareArticle' ? 12 : 16;
            break;

          case 8:
            _context10.next = 10;
            return _scorelog2.default.readableByUserIdAndTaskTypeAndDate(userId, taskType, todayStartDate);

          case 10:
            todayFlag = _context10.sent;
            return _context10.abrupt('break', 18);

          case 12:
            _context10.next = 14;
            return _scorelog2.default.shareableByUserIdAndTaskTypeAndDate(userId, taskType, todayStartDate);

          case 14:
            todayFlag = _context10.sent;
            return _context10.abrupt('break', 18);

          case 16:
            todayFlag = true;
            return _context10.abrupt('break', 18);

          case 18:
            if (!(articleLog === null && !todayFlag)) {
              _context10.next = 28;
              break;
            }

            // 添加操作记录
            // 定义ipfs中存储的数据
            ipfsDataArticleLog = {
              userId: userId,
              articleId: articleId,
              type: taskType
            };
            // 上传到IPFS

            _context10.next = 22;
            return (0, _ipfsFile.addContent)(ipfsDataArticleLog);

          case 22:
            hashArticleLog = _context10.sent;

            // 添加分享日志
            newArticleLog = {
              ipfsHash: hashArticleLog,
              userId: userId,
              articleId: articleId,
              type: taskType
            };
            _context10.next = 26;
            return _articleLog2.default.create(newArticleLog);

          case 26:
            _context10.next = 28;
            return _scorelog4.default.create(userId, taskType);

          case 28:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function addArticleLog(_x16, _x17, _x18) {
    return _ref10.apply(this, arguments);
  };
}();
/** 内部方法结束 ****************************/

var _article = require('../../models/jkbapp/article.model');

var _article2 = _interopRequireDefault(_article);

var _favorite = require('../../models/jkbapp/favorite.model');

var _favorite2 = _interopRequireDefault(_favorite);

var _ipfsFile = require('../../utils/ipfsFile');

var _ipfsList = require('../../utils/ipfsList');

var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _scorelog = require('../../models/jkbapp/scorelog.model');

var _scorelog2 = _interopRequireDefault(_scorelog);

var _articleLog = require('../../models/jkbapp/articleLog.model');

var _articleLog2 = _interopRequireDefault(_articleLog);

var _dateUtil = require('../../utils/dateUtil');

var _dateUtil2 = _interopRequireDefault(_dateUtil);

var _scorelog3 = require('./scorelog.service');

var _scorelog4 = _interopRequireDefault(_scorelog3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getIpfsContent = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(hash) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _ipfsFile.getContent)(hash);

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getIpfsContent(_x) {
    return _ref.apply(this, arguments);
  };
}();exports.default = { list: list, create: create, info: info, infoNoUser: infoNoUser, remove: remove, share: share, pass: pass };
//# sourceMappingURL=article.service.js.map
