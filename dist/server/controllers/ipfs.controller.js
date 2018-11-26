'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 获取用户上传的ipfs数据
 * @param {*} req
 * @param {*} res
 */
var list = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var userId, _req$query, _req$query$pageSize, pageSize, _req$query$page, page, fileType, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = (0, _jwtUtil.getUserId)(req, res); // 获取用户id

            _req$query = req.query, _req$query$pageSize = _req$query.pageSize, pageSize = _req$query$pageSize === undefined ? 50 : _req$query$pageSize, _req$query$page = _req$query.page, page = _req$query$page === undefined ? 0 : _req$query$page;
            fileType = req.query.fileType;
            _context.next = 5;
            return _ipfs4.default.getList(userId, pageSize, page, fileType);

          case 5:
            result = _context.sent;
            return _context.abrupt('return', res.json(new _responseData2.default(result, false, null)));

          case 7:
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
 * 获取所有用户上传的ipfs数据
 * @param {*} req
 * @param {*} res
 */


var allList = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$query2, _req$query2$pageSize, pageSize, _req$query2$page, page, fileType, result;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$query2 = req.query, _req$query2$pageSize = _req$query2.pageSize, pageSize = _req$query2$pageSize === undefined ? 50 : _req$query2$pageSize, _req$query2$page = _req$query2.page, page = _req$query2$page === undefined ? 0 : _req$query2$page;
            fileType = req.query.fileType;
            _context2.next = 4;
            return _ipfs4.default.getAllList(pageSize, page, fileType);

          case 4:
            result = _context2.sent;
            return _context2.abrupt('return', res.json(new _responseData2.default(result, false, null)));

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function allList(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 添加影像文件
 * @param {*} req
 * @param {*} res
 */


var createMedia = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var userid, type, flag, taskType, hash, title, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userid = (0, _jwtUtil.getUserId)(req, res); // 获取用户id

            type = req.body.fileType;
            // 检测今日是否达到上传上限

            _context3.next = 4;
            return _ipfs4.default.checkCreateMedia(userid, type);

          case 4:
            flag = _context3.sent;

            if (!flag) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt('return', res.json(new _responseData2.default(null, true, '今日已达到上传上限')));

          case 7:
            // 添加积分日志
            taskType = 'UploadMedia';
            _context3.next = 10;
            return _scorelog2.default.create(userid, taskType);

          case 10:
            hash = req.body.hash;
            title = req.body.fileTitle;
            _context3.next = 14;
            return _ipfs4.default.createMedia(userid, hash, type, title);

          case 14:
            result = _context3.sent;
            return _context3.abrupt('return', res.json(new _responseData2.default(null, false, result)));

          case 16:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function createMedia(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * 根据ipfsHash获取base64图片
 * @param {*} req
 * @param {*} res
 */


var getImgByIpfsHash = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var ipfsHash, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(req.params.IpfsHash === null)) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt('return', res.json(new _responseData2.default(null, true, 'ipfs地址不能为空')));

          case 2:
            ipfsHash = req.params.IpfsHash;
            _context4.next = 5;
            return _ipfs4.default.getImgByIpfsHash(ipfsHash);

          case 5:
            result = _context4.sent;
            return _context4.abrupt('return', res.json(new _responseData2.default(result, false, null)));

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getImgByIpfsHash(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * 接收文件,加密上传到ipfs
 */


var _ipfsFile = require('../utils/ipfsFile');

var _aes = require('../utils/aes');

var _ipfs = require('../models/ipfs.model');

var _ipfs2 = _interopRequireDefault(_ipfs);

var _responseData = require('../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _ipfs3 = require('../services/ipfs.service');

var _ipfs4 = _interopRequireDefault(_ipfs3);

var _jwtUtil = require('../utils/jwtUtil');

var _scorelog = require('../services/jkbapp/scorelog.service');

var _scorelog2 = _interopRequireDefault(_scorelog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Load ipfs and append to req.
 */
function load(req, res, next, id) {
  _ipfs2.default.get(id).then(function (ipfs) {
    req.ipfs = ipfs; // eslint-disable-line no-param-reassign
    return next();
  }).catch(function (e) {
    return next(e);
  });
}function uploadFile(req, res, next) {
  var buffer = req.file.buffer;

  (0, _ipfsFile.addContent)(buffer, true).then(function (hash) {
    return res.json(new _responseData2.default({
      documentHash: hash,
      fileName: req.file.originalname,
      fileType: req.file.mimetype
    }));
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * 接收表单内容，加密上传到ipfs
 */
function uploadContent(req, res, next) {
  var encryptBuffer = (0, _aes.encrypt)(Buffer.from(JSON.stringify(req.body)));
  (0, _ipfsFile.addContent)(encryptBuffer).then(function (hash) {
    res.json(new _responseData2.default({}, false, hash));
  }).catch(function (e) {
    return next(e);
  });
}

exports.default = { load: load, list: list, allList: allList, getImgByIpfsHash: getImgByIpfsHash, createMedia: createMedia, uploadFile: uploadFile, uploadContent: uploadContent };
//# sourceMappingURL=ipfs.controller.js.map
