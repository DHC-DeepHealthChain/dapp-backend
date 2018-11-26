'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
var getList = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$query, _req$query$pageSize, pageSize, _req$query$page, page, exams;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, _req$query$pageSize = _req$query.pageSize, pageSize = _req$query$pageSize === undefined ? 50 : _req$query$pageSize, _req$query$page = _req$query.page, page = _req$query$page === undefined ? 0 : _req$query$page;
            _context.next = 3;
            return _exam2.default.list({ pageSize: pageSize, page: page });

          case 3:
            exams = _context.sent;
            _context.next = 6;
            return (0, _ipfsList.getContentsByHash)(exams);

          case 6:
            exams = _context.sent;
            _context.next = 9;
            return (0, _ipfsList.getListImgByHash)(exams);

          case 9:
            exams = _context.sent;
            return _context.abrupt('return', res.json(new _responseData2.default(exams)));

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getList(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * 根据试卷id获取试卷详情
 * @param {*} req
 * @param {*} res
 */


var getExamInfo = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var examId, qList, i, itemList;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            examId = req.params.examId;

            if (examId === '-1') {
              examId = '5ad9bc1e00bfe41e7e92b7bf';
            }
            _context2.next = 4;
            return _question2.default.getByExamId(examId);

          case 4:
            qList = _context2.sent;

            if (!qList) {
              _context2.next = 21;
              break;
            }

            _context2.next = 8;
            return (0, _ipfsList.getContentsByHash)(qList);

          case 8:
            qList = _context2.sent;
            i = 0;

          case 10:
            if (!(i < qList.length)) {
              _context2.next = 21;
              break;
            }

            _context2.next = 13;
            return _item2.default.getByQuestionId(qList[i]._id);

          case 13:
            itemList = _context2.sent;

            if (!itemList) {
              _context2.next = 18;
              break;
            }

            _context2.next = 17;
            return (0, _ipfsList.getContentsByHash)(itemList);

          case 17:
            qList[i].itemList = _context2.sent;

          case 18:
            i += 1;
            _context2.next = 10;
            break;

          case 21:
            return _context2.abrupt('return', res.json(new _responseData2.default(qList)));

          case 22:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getExamInfo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getScantron = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var examId, userId, userAnswer;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            examId = req.params.examId;
            userId = (0, _jwtUtil.getUserId)(req, res);
            _context3.next = 4;
            return _userAnswer2.default.getByExamIdAndUserId(examId, userId);

          case 4:
            userAnswer = _context3.sent;

            (0, _ipfsFile.getContent)(userAnswer.ipfsHash).then(function (buffer) {
              userAnswer.content = buffer; // eslint-disable-line no-param-reassign
              res.json(new _responseData2.default(userAnswer));
            }).catch(function (e) {
              return next(e);
            });

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getScantron(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * 提交问卷答案
 * 用户可以重复答题，但只发一次积分
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */


var postScantron = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var userId, examid, taskType, flag;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userId = (0, _jwtUtil.getUserId)(req, res); // 获取用户id

            examid = req.body.examId; // 获取试卷id
            // 添加积分

            taskType = 'Exam';
            // 检查是否已经下发过积分

            _context4.next = 5;
            return _scorelog4.default.checkExist(userId, taskType);

          case 5:
            flag = _context4.sent;

            if (flag) {
              _context4.next = 9;
              break;
            }

            _context4.next = 9;
            return _scorelog2.default.create(userId, taskType);

          case 9:
            // 上传到IPFS
            req.body.createdDate = new Date(); // eslint-disable-line no-param-reassign
            (0, _ipfsFile.addContent)(req.body).then(function (hash) {
              var userAnswer = new _userAnswer2.default({
                userId: userId,
                examId: examid,
                ipfsHash: hash
              });
              // 保存数据库
              userAnswer.save().then(function () {
                return res.json(new _responseData2.default({}, false, '回答完毕'));
              }).catch(function (e) {
                return next(e);
              });
            }).catch(function (e) {
              return next(e);
            });
            return _context4.abrupt('return', undefined);

          case 12:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function postScantron(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * 上传问券的基本信息
 * @param {*} req
 * @param {*} res
 */


var postExam = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _this = this;

    var hash, exam, newExam, users;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            // 上传到IPFS
            req.body.createdDate = new Date(); // eslint-disable-line no-param-reassign
            _context6.next = 3;
            return (0, _ipfsFile.addContent)(req.body);

          case 3:
            hash = _context6.sent;

            // 定义ipfs数据
            exam = new _exam2.default({
              ipfsHash: hash,
              listImg: req.body.listImg
            });
            // 保存数据库

            _context6.next = 7;
            return exam.save();

          case 7:
            newExam = _context6.sent;
            _context6.next = 10;
            return _user2.default.findAll();

          case 10:
            users = _context6.sent;

            users.map(function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(item) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return _message2.default.create(item._id, 'Exam', '有新的问卷', newExam._id);

                      case 2:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, _this);
              }));

              return function (_x13) {
                return _ref6.apply(this, arguments);
              };
            }());
            res.json(new _responseData2.default({}, false, '创建成功'));

          case 13:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function postExam(_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * 获取推荐的问券
 * @param {*} req
 * @param {*} res
 */


var getRecommendList = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var list;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log('getRecommendList');
            _context7.next = 3;
            return _exam2.default.getByIsRecommend();

          case 3:
            list = _context7.sent;

            if (!list) {
              _context7.next = 11;
              break;
            }

            _context7.next = 7;
            return (0, _ipfsList.getContentsByHash)(list);

          case 7:
            list = _context7.sent;
            _context7.next = 10;
            return (0, _ipfsList.getListImgByHash)(list);

          case 10:
            list = _context7.sent;

          case 11:
            return _context7.abrupt('return', res.json(new _responseData2.default(list)));

          case 12:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function getRecommendList(_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 * 问券推荐
 * @param {*} req
 * @param {*} res
 */


var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _exam = require('../../models/jkbapp/exam.model');

var _exam2 = _interopRequireDefault(_exam);

var _question = require('../../models/jkbapp/question.model');

var _question2 = _interopRequireDefault(_question);

var _item = require('../../models/jkbapp/item.model');

var _item2 = _interopRequireDefault(_item);

var _userAnswer = require('../../models/jkbapp/userAnswer.model');

var _userAnswer2 = _interopRequireDefault(_userAnswer);

var _ipfsFile = require('../../utils/ipfsFile');

var _ipfsList = require('../../utils/ipfsList');

var _jwtUtil = require('../../utils/jwtUtil');

var _scorelog = require('../../services/jkbapp/scorelog.service');

var _scorelog2 = _interopRequireDefault(_scorelog);

var _message = require('../../services/jkbapp/message.service');

var _message2 = _interopRequireDefault(_message);

var _user = require('../../services/user.service');

var _user2 = _interopRequireDefault(_user);

var _scorelog3 = require('../../models/jkbapp/scorelog.model');

var _scorelog4 = _interopRequireDefault(_scorelog3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function recommendExam(req, res) {
  var userId = (0, _jwtUtil.getUserId)();
  var examId = req.params.examId;
  var isRecommend = req.body.isRecommend;

  _exam2.default.findOneAndUpdate({ _id: examId }, { $set: { isRecommend: isRecommend } }, function (err) {
    if (err) {
      return res.json(new _responseData2.default(userId, true, '设置推荐失败'));
    }
    return res.json(new _responseData2.default(userId, false, '设置推荐成功'));
  });
}
/**
 * 删除问券
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function removeExam(req, res) {
  _exam2.default.deleteOne({ _id: req.params._id }, function (err) {
    if (err) {
      res.json(new _responseData2.default({}, true, '删除失败'));
    } else {
      res.json(new _responseData2.default({}, false, '删除成功'));
    }
  });
}
/**
 * 上传问题
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function postQ(req, res, next) {
  // 上传到IPFS
  req.body.createdDate = new Date(); // eslint-disable-line no-param-reassign
  (0, _ipfsFile.addContent)(req.body).then(function (hash) {
    var question = new _question2.default({
      ipfsHash: hash,
      orderNum: req.body.orderNum,
      examId: req.body.examId
    });
    // 保存数据库
    question.save().then(function () {
      return res.json(new _responseData2.default({}, false, '创建成功'));
    }).catch(function (e) {
      return next(e);
    });
  }).catch(function (e) {
    return next(e);
  });
}
/**
 * 删除问题
 * @param {*} req
 * @param {*} res
 */
function removeQ(req, res) {
  _question2.default.deleteOne({ _id: req.params.questionId }, function (err) {
    if (err) {
      res.json(new _responseData2.default({}, true, '删除失败'));
    } else {
      res.json(new _responseData2.default({}, false, '删除成功'));
    }
  });
}
/**
 * 创建选项
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function postItem(req, res, next) {
  var _req$body = req.body,
      orderNum = _req$body.orderNum,
      questionId = _req$body.questionId;
  // 上传到IPFS

  req.body.createdDate = new Date(); // eslint-disable-line no-param-reassign
  (0, _ipfsFile.addContent)(req.body).then(function (hash) {
    var item = new _item2.default({
      ipfsHash: hash,
      orderNum: orderNum,
      questionId: questionId
    });
    // 保存数据库
    item.save().then(function () {
      return res.json(new _responseData2.default({}, false, '创建成功'));
    }).catch(function (e) {
      return next(e);
    });
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * 删除问题
 * @param {*} req
 * @param {*} res
 */
function removeItem(req, res) {
  _item2.default.deleteOne({ _id: req.params.itemId }, function (err) {
    if (err) {
      res.json(new _responseData2.default({}, true, '删除失败'));
    } else {
      res.json(new _responseData2.default({}, false, '删除成功'));
    }
  });
}

exports.default = {
  getRecommendList: getRecommendList,
  getList: getList,
  getExamInfo: getExamInfo,
  postExam: postExam,
  removeExam: removeExam,
  postQ: postQ,
  removeQ: removeQ,
  postItem: postItem,
  removeItem: removeItem,
  postScantron: postScantron,
  getScantron: getScantron,
  recommendExam: recommendExam
};
//# sourceMappingURL=exam.controller.js.map
