'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 获取所有消息
 * @param {*} userId
 * @param {*} pageSize
 * @param {*} page
 */
var getList = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId, pageSize, page) {
    var messages, total, pagination;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _message2.default.list({ pageSize: pageSize, page: page, userId: userId });

          case 2:
            messages = _context.sent;

            if (!(messages !== null)) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return (0, _ipfsList.getContentsByHash)(messages);

          case 6:
            messages = _context.sent;

          case 7:
            _context.next = 9;
            return _message2.default.countAll();

          case 9:
            total = _context.sent;

            // 组装分页结果
            pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
            // 下次app发版是解开
            // const result = { list: messages, pagination };

            return _context.abrupt('return', messages);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getList(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 添加一个消息
 * @param {*} userid
 * @param {*} type
 * @param {*} contentT
 */


var create = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userid, type, contentT, otherid) {
    var ipfsData, hash, message;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // 定义ipfs中存储的数据
            ipfsData = {
              userId: userid,
              messageType: type,
              content: contentT,
              otherId: otherid,
              isRead: false
            };
            // 上传到IPFS

            _context2.next = 3;
            return (0, _ipfsFile.addContent)(ipfsData);

          case 3:
            hash = _context2.sent;

            // 定义mongo存储的数据
            message = new _message2.default({
              ipfsHash: hash,
              userId: userid,
              messageType: type
            });
            // 保存数据库

            _context2.next = 7;
            return _message2.default.create(message);

          case 7:
            return _context2.abrupt('return', '添加成功');

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function create(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 设置消息已读
 * @param {*} _id
 */


var read = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_id) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _message2.default.findOneAndUpdate({ _id: _id }, { isRead: true });

          case 2:
            return _context3.abrupt('return', '已读');

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function read(_x8) {
    return _ref3.apply(this, arguments);
  };
}();

var _message = require('../../models/jkbapp/message.model');

var _message2 = _interopRequireDefault(_message);

var _ipfsList = require('../../utils/ipfsList');

var _ipfsFile = require('../../utils/ipfsFile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = { getList: getList, create: create, read: read };
//# sourceMappingURL=message.service.js.map
