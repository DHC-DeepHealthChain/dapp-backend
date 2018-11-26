'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 添加影像文件
 * @param {*} userid
 * @param {*} hash
 * @param {*} type
 * @param {*} title
 */
var createMedia = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userid, hash, type, title) {
    var ipfs;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ipfs = new _ipfs2.default({
              userId: userid,
              ipfsHash: hash,
              fileType: type,
              fileTitle: title
            });
            _context.next = 3;
            return ipfs.save();

          case 3:
            return _context.abrupt('return', '添加成功');

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createMedia(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 根据ipfsHash获取base64图片
 * @param {*} req
 * @param {*} res
 */


var getImgByIpfsHash = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ipfsHash) {
    var trueImg, listImg;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _ipfsFile.getContent)(ipfsHash, 'noString');

          case 2:
            trueImg = _context2.sent;
            listImg = trueImg.toString('base64'); // eslint-disable-line no-param-reassign

            return _context2.abrupt('return', listImg);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getImgByIpfsHash(_x5) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 获取用户上传的ipfs数据
 * @param {*} userId
 * @param {*} pageSize
 * @param {*} page
 * @param {*} fileType
 */


var getList = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userId, pageSize, page, fileType) {
    var ipfss, total, pagination, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _ipfs2.default.findByUserIdAndFileType(userId, pageSize, page, fileType);

          case 2:
            ipfss = _context3.sent;
            _context3.next = 5;
            return _ipfs2.default.countByUserIdAndFileType(userId, fileType);

          case 5:
            total = _context3.sent;
            pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line

            result = { list: ipfss, pagination: pagination };
            // if (ipfss !== null) {
            //   ipfss = await getContentsByHash(ipfss);
            // }

            return _context3.abrupt('return', result);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getList(_x6, _x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * 获取所有用户上传的ipfs数据
 * @param {*} pageSize
 * @param {*} page
 * @param {*} fileType
 */


var getAllList = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(pageSize, page, fileType) {
    var ipfss, total, pagination, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _ipfs2.default.findByFileType(pageSize, page, fileType);

          case 2:
            ipfss = _context4.sent;
            _context4.next = 5;
            return _ipfs2.default.countByFileType(fileType);

          case 5:
            total = _context4.sent;
            pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line

            result = { list: ipfss, pagination: pagination };
            // if (ipfss !== null) {
            //   ipfss = await getContentsByHash(ipfss);
            // }

            return _context4.abrupt('return', result);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getAllList(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * 检测今日是否达到上传上限
 * @param {*} req
 * @param {*} res
 */


var checkCreateMedia = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(userid, type) {
    var todayStartDate;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            todayStartDate = _dateUtil2.default.getDayStartDate(); // 获取今日开始时间

            _context5.next = 3;
            return _ipfs2.default.checkCreateMedia(userid, type, todayStartDate);

          case 3:
            return _context5.abrupt('return', _context5.sent);

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function checkCreateMedia(_x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}();

var _ipfsFile = require('../utils/ipfsFile');

var _ipfs = require('../models/ipfs.model');

var _ipfs2 = _interopRequireDefault(_ipfs);

var _dateUtil = require('../utils/dateUtil');

var _dateUtil2 = _interopRequireDefault(_dateUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import { getContentsByHash } from '../utils/ipfsList';


exports.default = { getImgByIpfsHash: getImgByIpfsHash, createMedia: createMedia, getList: getList, getAllList: getAllList, checkCreateMedia: checkCreateMedia };
//# sourceMappingURL=ipfs.service.js.map
