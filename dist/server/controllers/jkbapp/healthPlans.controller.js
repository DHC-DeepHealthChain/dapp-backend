'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 获取计划单列表
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
var list = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$query, _req$query$pageSize, pageSize, _req$query$page, page, healthPlans;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, _req$query$pageSize = _req$query.pageSize, pageSize = _req$query$pageSize === undefined ? 20 : _req$query$pageSize, _req$query$page = _req$query.page, page = _req$query$page === undefined ? 0 : _req$query$page;
            _context.next = 3;
            return _healthPlan4.default.list(pageSize, page);

          case 3:
            healthPlans = _context.sent;
            return _context.abrupt('return', res.json(new _responseData2.default(healthPlans, false, null)));

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
 * 创建计划
 * @param {*} req
 * @param {*} res
 */


/**
 * 根据计划单id获取计划项详情
 * @param {*} req
 * @param {*} res
 */
var getPlanItemInfo = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var planId, userId, userPlan, continueStep, timeStamp, createdDateTimestamp, finish, healthPlanItem, updateParam;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            planId = req.params.planId;
            userId = (0, _jwtUtil.getUserId)(req, res);
            // 查询是不是存在

            _context2.next = 4;
            return _healthUserPlan2.default.getByUserIdAndPlanId(userId, planId);

          case 4:
            userPlan = _context2.sent;

            if (!(userPlan && userPlan.delete === false)) {
              _context2.next = 25;
              break;
            }

            continueStep = void 0;
            timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
            createdDateTimestamp = userPlan.createdDate.getTime() / 1000;
            finish = false;

            if (createdDateTimestamp < timeStamp) {
              continueStep = userPlan.continueStep + 1;
            } else {
              finish = userPlan.finish;
              continueStep = userPlan.continueStep;
            }
            _context2.next = 13;
            return _healthPlanItem2.default.getByStep(continueStep, planId);

          case 13:
            healthPlanItem = _context2.sent;

            if (healthPlanItem) {
              _context2.next = 18;
              break;
            }

            _context2.next = 17;
            return _healthPlanItem2.default.getByStep(continueStep - 1, planId);

          case 17:
            healthPlanItem = _context2.sent;

          case 18:
            if (!healthPlanItem) {
              _context2.next = 23;
              break;
            }

            _context2.next = 21;
            return (0, _ipfsFile.getContent)(healthPlanItem.ipfsHash);

          case 21:
            healthPlanItem.content = _context2.sent;

            healthPlanItem.finish = finish;

          case 23:
            if (userPlan.continueStep < continueStep) {
              // 更新用户要进行的步骤
              updateParam = {
                finish: false,
                continueStep: continueStep,
                createdDate: new Date()
              };

              _healthUserPlan2.default.findOneAndUpdate({ userId: userId, planId: planId }, { $set: updateParam }, function (err) {
                if (err) {
                  console.log(err);
                }
              });
            }
            return _context2.abrupt('return', res.json(new _responseData2.default(healthPlanItem)));

          case 25:
            return _context2.abrupt('return', res.json(new _responseData2.default(null, true, '获取项目失败')));

          case 26:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getPlanItemInfo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * 用户参加计划
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */


var joinPlan = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var _this = this;

    var planId, userId, userPlan, ipfsData;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            planId = req.params.planId;
            userId = (0, _jwtUtil.getUserId)(req, res);
            // 查询是不是存在

            _context4.next = 4;
            return _healthUserPlan2.default.getByUserIdAndPlanId(userId, planId);

          case 4:
            userPlan = _context4.sent;

            if (!userPlan) {
              _context4.next = 11;
              break;
            }

            if (!(userPlan.delete === false)) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt('return', res.json(new _responseData2.default(null, true, '你已经加入')));

          case 8:
            _healthUserPlan2.default.findOneAndUpdate({ userId: userId, planId: planId }, { $set: { delete: false } }, function (err) {
              if (err) {
                return res.json(new _responseData2.default(null, true, '添加失败'));
              }
              return res.json(new _responseData2.default(null, false, '添加成功'));
            });
            _context4.next = 13;
            break;

          case 11:
            ipfsData = {
              userId: userId,
              planId: planId,
              continueStep: 1,
              finish: false
            };
            // 上传到IPFS

            (0, _ipfsFile.addContent)(ipfsData).then(function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(hash) {
                var healthUserPlan;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        healthUserPlan = new _healthUserPlan2.default({
                          userId: userId,
                          planId: planId,
                          ipfsHash: hash,
                          continueStep: 1,
                          finish: false
                        });
                        // 保存数据库

                        healthUserPlan.save().then(function () {
                          return res.json(new _responseData2.default(null, false, '加入成功'));
                        }).catch(function (e) {
                          return next(e);
                        });
                        // 数据上链
                        userPlanContract.addUserPlan(hash);

                      case 3:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this);
              }));

              return function (_x8) {
                return _ref4.apply(this, arguments);
              };
            }());

          case 13:
            _context4.next = 15;
            return _healthPlan4.default.updateJoinNumByPlanId(planId, 'add');

          case 15:
            return _context4.abrupt('return', undefined);

          case 16:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function joinPlan(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * 用户取消计划
 * @param {*} req
 * @param {*} res
 */


var removePlan = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _this2 = this;

    var userId, planId, healthUserPlan;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            userId = (0, _jwtUtil.getUserId)(req, res);
            planId = req.params.planId;
            _context6.next = 4;
            return _healthUserPlan2.default.getByUserIdAndPlanId(userId, planId);

          case 4:
            healthUserPlan = _context6.sent;

            if (!(healthUserPlan !== null && healthUserPlan.delete === false)) {
              _context6.next = 8;
              break;
            }

            _context6.next = 8;
            return _healthPlan4.default.updateJoinNumByPlanId(planId, 'sub');

          case 8:

            _healthUserPlan2.default.findOneAndUpdate({ userId: userId, planId: planId }, { $set: { delete: true } }, function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(err) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        if (!err) {
                          _context5.next = 2;
                          break;
                        }

                        return _context5.abrupt('return', res.json(new _responseData2.default(null, true, '取消失败')));

                      case 2:
                        // 删除合约中的用户信息
                        userPlanContract.deleteUserPlan(healthUserPlan.ipfsHash);
                        return _context5.abrupt('return', res.json(new _responseData2.default(null, false, '取消成功')));

                      case 4:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, _this2);
              }));

              return function (_x11) {
                return _ref6.apply(this, arguments);
              };
            }());

          case 9:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function removePlan(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * 获取已参与的计划列表
 * @param {*} req
 * @param {*} res
 */


var getPlanList = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var userId, plans, userPlans, data, userJoinList, userNotJoinList;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            userId = (0, _jwtUtil.getUserId)(req, res);
            _context7.next = 3;
            return _healthPlan2.default.list();

          case 3:
            plans = _context7.sent;
            _context7.next = 6;
            return _healthUserPlan2.default.getByUserId(userId);

          case 6:
            userPlans = _context7.sent;
            data = {};
            userJoinList = [];
            userNotJoinList = [];

            if (!(userPlans == null)) {
              _context7.next = 19;
              break;
            }

            _context7.next = 13;
            return (0, _ipfsList.getContentsByHash)(plans);

          case 13:
            plans = _context7.sent;
            _context7.next = 16;
            return (0, _ipfsList.getListImgByHash)(plans);

          case 16:
            data.userNotJoinList = _context7.sent;
            _context7.next = 32;
            break;

          case 19:
            plans.map(function (plan) {
              if (checkHashExist(userPlans, plan._id.toString())) {
                userJoinList.push(plan);
              } else {
                userNotJoinList.push(plan);
              }
              return null;
            });
            _context7.next = 22;
            return (0, _ipfsList.getContentsByHash)(userJoinList);

          case 22:
            userJoinList = _context7.sent;
            _context7.next = 25;
            return (0, _ipfsList.getListImgByHash)(userJoinList);

          case 25:
            data.userJoinList = _context7.sent;
            _context7.next = 28;
            return (0, _ipfsList.getContentsByHash)(userNotJoinList);

          case 28:
            userNotJoinList = _context7.sent;
            _context7.next = 31;
            return (0, _ipfsList.getListImgByHash)(userNotJoinList);

          case 31:
            data.userNotJoinList = _context7.sent;

          case 32:
            if (!(plans !== null)) {
              _context7.next = 36;
              break;
            }

            _context7.next = 35;
            return (0, _ipfsList.getContentsByHash)(plans);

          case 35:
            plans = _context7.sent;

          case 36:
            return _context7.abrupt('return', res.json(new _responseData2.default(data)));

          case 37:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function getPlanList(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * 用户完成计划项
 * @param {*} req
 * @param {*} res
 */


var remarkContinueStep = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var _this3 = this;

    var planId, userId, userPlan, updateParam;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            planId = req.params.planId;
            userId = (0, _jwtUtil.getUserId)(req, res);

            // 查询是不是存在

            _context9.next = 4;
            return _healthUserPlan2.default.getByUserIdAndPlanId(userId, planId);

          case 4:
            userPlan = _context9.sent;

            if (userPlan && userPlan.delete === false) {
              updateParam = {
                finish: true,
                createdDate: new Date()
              };

              _healthUserPlan2.default.findOneAndUpdate({ userId: userId, planId: planId }, { $set: updateParam }, function () {
                var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(err, newHealthUserPlan) {
                  var taskType, healthPlan, healthPlanContent, content;
                  return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          if (!err) {
                            _context8.next = 2;
                            break;
                          }

                          return _context8.abrupt('return', res.json(new _responseData2.default(null, true, '标记失败')));

                        case 2:
                          // 添加积分
                          taskType = 'PlanItem';
                          _context8.next = 5;
                          return _scorelog2.default.create(userId, taskType);

                        case 5:
                          _context8.next = 7;
                          return _healthPlan2.default.get(newHealthUserPlan.planId);

                        case 7:
                          healthPlan = _context8.sent;

                          if (!healthPlan) {
                            _context8.next = 18;
                            break;
                          }

                          _context8.next = 11;
                          return (0, _ipfsFile.getContent)(healthPlan.ipfsHash);

                        case 11:
                          healthPlanContent = _context8.sent;

                          if (!healthPlanContent) {
                            _context8.next = 18;
                            break;
                          }

                          content = JSON.parse(healthPlanContent);

                          if (!(content.cycleDay === newHealthUserPlan.continueStep)) {
                            _context8.next = 18;
                            break;
                          }

                          // 添加额外积分
                          taskType = 'Plan';
                          _context8.next = 18;
                          return _scorelog2.default.create(userId, taskType);

                        case 18:
                          return _context8.abrupt('return', res.json(new _responseData2.default(null, false, '完成任务')));

                        case 19:
                        case 'end':
                          return _context8.stop();
                      }
                    }
                  }, _callee8, _this3);
                }));

                return function (_x16, _x17) {
                  return _ref9.apply(this, arguments);
                };
              }());
            }

          case 6:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function remarkContinueStep(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();

/**
 * 判断是否已选择
 * @param {*} userPlans
 * @param {*} planId
 */


var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

var _healthPlan = require('../../models/jkbapp/healthPlan.model');

var _healthPlan2 = _interopRequireDefault(_healthPlan);

var _healthUserPlan = require('../../models/jkbapp/healthUserPlan.model');

var _healthUserPlan2 = _interopRequireDefault(_healthUserPlan);

var _healthPlanItem = require('../../models/jkbapp/healthPlanItem.model');

var _healthPlanItem2 = _interopRequireDefault(_healthPlanItem);

var _ipfsFile = require('../../utils/ipfsFile');

var _ipfsList = require('../../utils/ipfsList');

var _jwtUtil = require('../../utils/jwtUtil');

var _scorelog = require('../../services/jkbapp/scorelog.service');

var _scorelog2 = _interopRequireDefault(_scorelog);

var _healthPlan3 = require('../../services/jkbapp/healthPlan.service');

var _healthPlan4 = _interopRequireDefault(_healthPlan3);

var _userPlanContract = require('../../contracts/userPlanContract');

var _userPlanContract2 = _interopRequireDefault(_userPlanContract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import PlanContract from '../../helpers/planContract';


var userPlanContract = new _userPlanContract2.default();
function load(req, res, next, id) {
  _healthPlan2.default.get(id).then(function (healthPlan) {
    (0, _ipfsFile.getContent)(healthPlan.ipfsHash).then(function (buffer) {
      healthPlan.detail = buffer; // eslint-disable-line no-param-reassign
      req.healthPlan = healthPlan; // eslint-disable-line no-param-reassign
      return next();
    }).catch(function (e) {
      return next(e);
    });
  }).catch(function (e) {
    return next(e);
  });
}function create(req, res, next) {
  // todo名称唯一性校验
  var ipfsData = {
    name: req.body.name,
    cycleDay: req.body.cycleDay,
    content: req.body.content,
    introduce: req.body.introduce,
    listImg: req.body.listImg,
    item: req.body.item
  };
  // 上传到IPFS
  (0, _ipfsFile.addContent)(ipfsData).then(function (hash) {
    var healthPlan = new _healthPlan2.default({
      ipfsHash: hash,
      joinNum: 0,
      listImg: req.body.listImg
    });
    // 保存数据库
    healthPlan.save().then(function () {
      return res.json(new _responseData2.default({}, false, '创建成功'));
    }).catch(function (e) {
      return next(e);
    });
    // // 上传到合约
    // const planContract = new PlanContract();
    // planContract.post(hash);
  }).catch(function (e) {
    return next(e);
  });
}

/**
 * 获取计划单
 * @param {*} req
 * @param {*} res
 */
function get(req, res) {
  return res.json(req.healthPlan);
}

/**
 * 创建计划项
 * @param {*} req
 * @param {*} res
 */
function createItem(req, res, next) {
  // 上传到IPFS
  (0, _ipfsFile.addContent)(req.body).then(function (hash) {
    var healthPlanItem = new _healthPlanItem2.default({
      ipfsHash: hash,
      planId: req.body.planId,
      step: req.body.step
    });
    // 保存数据库
    healthPlanItem.save().then(function () {
      return res.json(new _responseData2.default({}, false, '创建成功'));
    }).catch(function (e) {
      return next(e);
    });
    // // 上传到合约
    // const planContract = new PlanContract();
    // planContract.post(hash);
  }).catch(function (e) {
    return next(e);
  });
}function checkHashExist(userPlans, planId) {
  var res = false;
  userPlans.map(function (userPlan) {
    if (userPlan.planId === planId) {
      res = true;
    }
    return null;
  });
  return res;
}

exports.default = {
  load: load,
  list: list,
  create: create,
  get: get,
  getPlanItemInfo: getPlanItemInfo,
  createItem: createItem,
  getPlanList: getPlanList,
  joinPlan: joinPlan,
  removePlan: removePlan,
  remarkContinueStep: remarkContinueStep
};
//# sourceMappingURL=healthPlans.controller.js.map
