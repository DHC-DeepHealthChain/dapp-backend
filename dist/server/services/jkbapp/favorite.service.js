'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 根据类型获取收藏列表
 * @param {*} userId
 * @param {*} pageSize
 * @param {*} page
 * @param {*} favoriteType
 */
var getListByUserId = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userId, pageSize, page, favoriteType) {
    var _this = this;

    var total, favorites, list, pagination;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _favorite2.default.countByFavoriteType();

          case 2:
            total = _context2.sent;
            _context2.next = 5;
            return _favorite2.default.list({ pageSize: pageSize, page: page, userId: userId, favoriteType: favoriteType });

          case 5:
            favorites = _context2.sent;

            if (!(favorites !== null)) {
              _context2.next = 10;
              break;
            }

            _context2.next = 9;
            return (0, _ipfsList.getContentsByHash)(favorites);

          case 9:
            favorites = _context2.sent;

          case 10:
            list = favorites.map(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(item) {
                var content, article, trueImg, text;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        content = JSON.parse(item.content);
                        _context.next = 3;
                        return _article2.default.get(content.otherId);

                      case 3:
                        article = _context.sent;

                        item.name = article.name; // eslint-disable-line
                        _context.next = 7;
                        return (0, _ipfsFile.getContent)(article.listImg, 'noString');

                      case 7:
                        trueImg = _context.sent;

                        item.listImg = trueImg.toString('base64'); // eslint-disable-line
                        item.readNum = article.readNum; // eslint-disable-line
                        item.summary = article.summary; // eslint-disable-line
                        _context.next = 13;
                        return (0, _ipfsFile.getContent)(article.ipfsHash);

                      case 13:
                        text = _context.sent;

                        item.text = JSON.parse(text).content; // eslint-disable-line
                        return _context.abrupt('return', item);

                      case 16:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x5) {
                return _ref2.apply(this, arguments);
              };
            }());

            // 组装分页结果

            pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
            // 下次app发版是解开
            // const result = { list: await Promise.all(list), pagination };

            _context2.next = 14;
            return Promise.all(list);

          case 14:
            return _context2.abrupt('return', _context2.sent);

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getListByUserId(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 添加一个收藏记录
 * @param {*} userid
 * @param {*} otherid
 * @param {*} favoriteTypeT
 */


var create = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userid, otherid, favoriteTypeT) {
    var favorites, ipfsData, hash, favorite;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _favorite2.default.getByUserIdAndArticleId(userid, otherid);

          case 2:
            favorites = _context3.sent;

            if (!(favorites !== null && favorites.length > 0)) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt('return', '添加成功');

          case 5:
            // 定义ipfs中存储的数据
            ipfsData = {
              userId: userid,
              favoriteType: favoriteTypeT,
              otherId: otherid
            };
            // 上传到IPFS

            _context3.next = 8;
            return (0, _ipfsFile.addContent)(ipfsData);

          case 8:
            hash = _context3.sent;

            // 定义mongo存储的数据
            favorite = new _favorite2.default({
              ipfsHash: hash,
              userId: userid,
              favoriteType: favoriteTypeT,
              otherId: otherid
            });
            // 保存数据库

            _context3.next = 12;
            return _favorite2.default.create(favorite);

          case 12:
            return _context3.abrupt('return', '添加成功');

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function create(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * 取消收藏
 * @param {*} req
 * @param {*} res
 */


var remove = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(userId, otherId) {
    var _this2 = this;

    var favorites;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _favorite2.default.getByUserIdAndArticleId(userId, otherId);

          case 2:
            favorites = _context5.sent;

            favorites.map(function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(item) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return _favorite2.default.remove(item);

                      case 2:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, _this2);
              }));

              return function (_x11) {
                return _ref5.apply(this, arguments);
              };
            }());
            return _context5.abrupt('return', '取消成功');

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function remove(_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

var _favorite = require('../../models/jkbapp/favorite.model');

var _favorite2 = _interopRequireDefault(_favorite);

var _article = require('../../models/jkbapp/article.model');

var _article2 = _interopRequireDefault(_article);

var _ipfsFile = require('../../utils/ipfsFile');

var _ipfsList = require('../../utils/ipfsList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = { getListByUserId: getListByUserId, create: create, remove: remove };
//# sourceMappingURL=favorite.service.js.map
