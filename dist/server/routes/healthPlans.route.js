'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _paramValidation = require('../../config/param-validation');

var _paramValidation2 = _interopRequireDefault(_paramValidation);

var _healthPlans = require('../controllers/jkbapp/healthPlans.controller');

var _healthPlans2 = _interopRequireDefault(_healthPlans);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/healthPlans/:userId - get healthPlan list */
.get(_healthPlans2.default.list)

/** POST /api/healthPlans/:userId - add a healthPlan */
.post((0, _expressValidation2.default)(_paramValidation2.default.createHealthPlan), _healthPlans2.default.create);

router.route('/my')
/** GET /api/healthPlans/:userId - Get user`s healthPlan list */
.get(_healthPlans2.default.getPlanList);

router.route('/join/:planId')
/** POST /api/healthPlans/:userId - join a healthPlan */
.post(_healthPlans2.default.joinPlan)

/** DELETE /api/healthPlans/:userId - Delete a healthPlan */
.delete(_healthPlans2.default.removePlan);

router.route('/planItemInfo')
/** POST /api/healthPlans/planItemInfo - add a healthPlanItem by planId*/
.post((0, _expressValidation2.default)(_paramValidation2.default.createHealthPlanItem), _healthPlans2.default.createItem);

router.route('/planItemInfo/:planId')
/** GET /api/healthPlans/planItemInfo - Get info for healthPlanItem by planItemId*/
.get(_healthPlans2.default.getPlanItemInfo);

router.route('/planItemInfo/remark/:planId')
/** GET /api/healthPlans/panInfo - Get introduce for healthPlans by planId */
.put(_healthPlans2.default.remarkContinueStep);

// router.param('userId', healthPlanCtrl.load);

exports.default = router;
//# sourceMappingURL=healthPlans.route.js.map
