'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// getContent
// const getIpfsContent = async hash => await getContent(hash);

/**
 * 根据用户id获取对应积分
 * @param {*} req
 * @param {*} res
 */
var getScores = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId) {
    var user, score;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user2.default.get(userId);

          case 2:
            user = _context.sent;
            score = user.score;
            // let score = await Score.getByUserId(userId);
            // if (score === null) {
            //   score = await create(userId);
            //   score = await Score.getByUserId(userId);
            // }
            // let content = await getIpfsContent(score.ipfsHash);
            // if (content) {
            //   score.content = content;
            // } else {
            //   content = await getIpfsContent(score.ipfsHash);
            //   score.content = content;
            // }
            // content = JSON.parse(score.content);
            // if (content.score === null) {
            //   content.score = 0;
            //   score.content = content;
            // }

            return _context.abrupt('return', score);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getScores(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
* 为新用户创建积分记录
* @param {*} userid
*/


var create = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userid) {
    var ipfsData, hash, score, newScore;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // 定义ipfs中存储的数据
            ipfsData = {
              userId: userid,
              score: 0
            };
            // 上传到IPFS

            _context2.next = 3;
            return (0, _ipfsFile.addContent)(ipfsData);

          case 3:
            hash = _context2.sent;

            // 定义mongo存储的数据
            score = new _score2.default({
              ipfsHash: hash,
              userId: userid
            });
            // 保存数据库

            _context2.next = 7;
            return _score2.default.create(score);

          case 7:
            newScore = _context2.sent;
            return _context2.abrupt('return', newScore);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function create(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 更新积分
 * @param {*} userid
 * @param {*} taskType
 */


var update = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userid, taskType) {
    var user, addScore, oldScore, newScore;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user2.default.get(userid);

          case 2:
            user = _context3.sent;

            if (user) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt('return', new _responseData2.default(null, true, '用户不存在'));

          case 5:
            _context3.next = 7;
            return _task2.default.getScoreByTaskType(taskType);

          case 7:
            addScore = _context3.sent;

            // 获取DHC不能超过10000
            // if (addScore < 10000) {
            //   console.log('addScore', addScore);
            //   // 产生交易
            //   const tokenContract = new TokenContract();
            //   await tokenContract.transferToken(user.publicKey, addScore);
            //   //   if (resultBody.error) {
            //   //     console.log('积分没有发送成功。');
            //   //     // return new ResData(null, true, '操作失败，请重新操作。');
            //   //   }
            // } else {
            //   console.log('发送的积分超过10000。');
            //   // return new ResData(null, true, '操作失败，请重新操作。');
            // }

            // 根据用户id获取用户历史积分
            oldScore = user.score;

            if (!oldScore) {
              oldScore = 0;
            }
            // 积分累加
            newScore = parseInt(oldScore, 10) + parseInt(addScore, 10);
            // 更新积分

            console.log(user.mobileNumber, taskType, oldScore, addScore, newScore);
            console.log('-----------------------------------------------');
            _context3.next = 15;
            return _user2.default.findByIdAndUpdate({ _id: userid }, { $set: { score: newScore } });

          case 15:
            return _context3.abrupt('return', '修改成功');

          case 16:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function update(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * 获取积分日志
 * @param {*} userid
 */


var getScoreLogs = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(userid, pageSize, page, looked) {
    var total, scoreLogs, pagination, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _scorelog2.default.countByUserId(userid, looked);

          case 2:
            total = _context4.sent;
            _context4.next = 5;
            return _scorelog4.default.getList(userid, pageSize, page, looked);

          case 5:
            scoreLogs = _context4.sent;

            // 组装分页结果
            pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
            // 下次app发版是解开

            result = { list: scoreLogs, pagination: pagination };
            return _context4.abrupt('return', result);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getScoreLogs(_x5, _x6, _x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * 获取积分排名
 * @param {*} userid
 */


var getScoreRanking = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(pageSize, page, order) {
    var scorelist, todayStartDate, list;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            scorelist = void 0;
            _context5.t0 = order;
            _context5.next = _context5.t0 === 'today' ? 4 : _context5.t0 === 'total' ? 9 : 13;
            break;

          case 4:
            // 获取今日开始时间
            todayStartDate = _dateUtil2.default.getDayStartDate();
            _context5.next = 7;
            return _user2.default.getRankingAndCreatedDateGrateBy(pageSize, page, todayStartDate);

          case 7:
            scorelist = _context5.sent;
            return _context5.abrupt('break', 14);

          case 9:
            _context5.next = 11;
            return _user2.default.getRanking(pageSize, page);

          case 11:
            scorelist = _context5.sent;
            return _context5.abrupt('break', 14);

          case 13:
            return _context5.abrupt('break', 14);

          case 14:
            list = scorelist.map(function (item, index) {
              var name = '';
              if (item.nickname) {
                name = item.nickname;
              }
              var score = 0;
              if (item.score !== null) {
                score = item.score;
              }
              return { index: index + 1, username: name, mobile: item.mobileNumber, score: score };
            });
            return _context5.abrupt('return', Promise.all(list));

          case 16:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getScoreRanking(_x9, _x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * 设置积分日志已阅读
 * @param {*} scoreLogId
 */


var lookScoreLog = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userId, scoreLogId) {
    var resultBody, taskType, scoreResultBody;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _scorelog4.default.lookScoreLog(scoreLogId);

          case 2:
            resultBody = _context6.sent;

            if (resultBody.error) {
              _context6.next = 10;
              break;
            }

            taskType = resultBody.result.scoreType;
            // 添加积分

            _context6.next = 7;
            return update(userId, taskType);

          case 7:
            scoreResultBody = _context6.sent;

            if (!(scoreResultBody !== null && scoreResultBody.error)) {
              _context6.next = 10;
              break;
            }

            return _context6.abrupt('return', new _responseData2.default(null, true, scoreResultBody.message));

          case 10:
            return _context6.abrupt('return', new _responseData2.default(null, false, '已阅读'));

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function lookScoreLog(_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * 批量 设置积分日志已阅读
 * @param {*} scoreLogId
 */


var lookScoreLogs = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(userId, scoreLogIds) {
    var scoreLogsTemp, scoreLogs, scoresTemp, scores, totalScore, user, score;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            scoreLogsTemp = scoreLogIds.map(function (item) {
              return _scorelog4.default.lookScoreLog(item);
            });
            _context7.next = 3;
            return Promise.all(scoreLogsTemp);

          case 3:
            scoreLogs = _context7.sent;
            scoresTemp = scoreLogs.map(function (item) {
              return _task2.default.getScoreByTaskType(item.scoreType);
            });
            _context7.next = 7;
            return Promise.all(scoresTemp);

          case 7:
            scores = _context7.sent;
            totalScore = scores.reduce(function (previousValue, currentValue) {
              return previousValue + currentValue;
            });

            if (!(totalScore > 0)) {
              _context7.next = 16;
              break;
            }

            _context7.next = 12;
            return _user2.default.get(userId);

          case 12:
            user = _context7.sent;
            score = Number(user.score) + Number(totalScore);
            _context7.next = 16;
            return _user2.default.findByIdAndUpdate({ _id: user._id }, { score: score });

          case 16:
            return _context7.abrupt('return', new _responseData2.default(null, false, '已阅读'));

          case 17:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function lookScoreLogs(_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * 根据积分日志id获取详情
 * @param {*} scoreLogId
 */


var getScoreLogInfoById = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(scoreLogId) {
    var result;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _scorelog4.default.getScoreLogInfoById(scoreLogId);

          case 2:
            result = _context8.sent;
            return _context8.abrupt('return', result);

          case 4:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function getScoreLogInfoById(_x16) {
    return _ref8.apply(this, arguments);
  };
}();

var aa = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    var result;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _scorelog4.default.aa();

          case 2:
            result = _context9.sent;
            return _context9.abrupt('return', result);

          case 4:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function aa() {
    return _ref9.apply(this, arguments);
  };
}();

var _ipfsFile = require('../../utils/ipfsFile');

var _score = require('../../models/jkbapp/score.model');

var _score2 = _interopRequireDefault(_score);

var _user = require('../../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _scorelog = require('../../models/jkbapp/scorelog.model');

var _scorelog2 = _interopRequireDefault(_scorelog);

var _scorelog3 = require('../../services/jkbapp/scorelog.service');

var _scorelog4 = _interopRequireDefault(_scorelog3);

var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _task = require('../jkbapp/task.service');

var _task2 = _interopRequireDefault(_task);

var _dateUtil = require('../../utils/dateUtil');

var _dateUtil2 = _interopRequireDefault(_dateUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import TokenContract from '../../helpers/tokenContract';


exports.default = {
  getScores: getScores,
  update: update,
  create: create,
  getScoreLogs: getScoreLogs,
  getScoreRanking: getScoreRanking,
  lookScoreLog: lookScoreLog,
  lookScoreLogs: lookScoreLogs,
  getScoreLogInfoById: getScoreLogInfoById,
  aa: aa
};
//# sourceMappingURL=score.service.js.map
