'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _healthIndicator = require('../controllers/jkbapp/healthIndicator.controller');

var _healthIndicator2 = _interopRequireDefault(_healthIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/last')
/** GET /api/healthIndicators - get last healthIndicators item by userId */
.get(_healthIndicator2.default.getlastList);

/** healthIndicator */
router.route('/')
/** GET /api/healthIndicators/bloodPressure - get healthIndicator list by userId */
.get(_healthIndicator2.default.getList);
/** POST /api/healthIndicators - create healthIndicator */
// .post(healthIndicatorCtrl.create);

/** step */
router.route('/step')
/** POST /api/healthIndicators/step - create step */
.post(_healthIndicator2.default.createStep);

router.route('/:healthIndicatorId')
/** DELETE /api/healthIndicators - remove healthIndicator by objectId */
.delete(_healthIndicator2.default.remove);

exports.default = router;
//# sourceMappingURL=healthIndicator.route.js.map
