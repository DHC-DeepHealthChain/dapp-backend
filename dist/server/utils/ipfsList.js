'use strict';

var _ipfsFile = require('./ipfsFile');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 根据集合获取ipfs上的内容
 * @param {*} userPlans
 */
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
}();

exports.getContentsByHash = function (list) {
  var result = list.map(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(item) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return getIpfsContent(item.ipfsHash);

            case 2:
              return _context2.abrupt('return', _context2.sent);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  return Promise.all(result).then(function (arr) {
    arr.map(function (item, index) {
      list[index].content = item; // eslint-disable-line no-param-reassign
      // if (item.listImg) {
      //   getContent(item.listImg, 'noString').then((imgBuffer) => {
      //     item.listImg = imgBuffer;// eslint-disable-line no-param-reassign
      //   });
      // }
      return undefined;
    });
    return list;
  });
};

var getImgIpfsContent = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(hash) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _ipfsFile.getContent)(hash, 'noString');

          case 2:
            return _context3.abrupt('return', _context3.sent);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getImgIpfsContent(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getListImgByHash = function (list) {
  var result = list.map(function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(item) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(item.listImg.indexOf('http') !== -1)) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt('return', item.listImg);

            case 2:
              _context4.next = 4;
              return getImgIpfsContent(item.listImg);

            case 4:
              return _context4.abrupt('return', _context4.sent);

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }());
  return Promise.all(result).then(function (arr) {
    arr.map(function (imgBuffer, index) {
      // 判断 如果地址包含http 则不转化为base64
      if (list[index].listImg.indexOf('http') !== -1) {
        list[index].listImg = list[index].listImg; // eslint-disable-line no-param-reassign
      } else {
        list[index].listImg = imgBuffer.toString('base64'); // eslint-disable-line no-param-reassign
      }
      // list[index].listImg = imgBuffer.toString('base64');// eslint-disable-line no-param-reassign
      // if (item.listImg) {
      //   getContent(item.listImg, 'noString').then((imgBuffer) => {
      //     item.listImg = imgBuffer;// eslint-disable-line no-param-reassign
      //   });
      // }
      return undefined;
    });
    return list;
  });
};
//# sourceMappingURL=ipfsList.js.map
