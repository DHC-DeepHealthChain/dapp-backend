'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _transcation = require('../controllers/transcation.controller');

var _transcation2 = _interopRequireDefault(_transcation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/transcations - Get list of transcations */
.get(_transcation2.default.list)
/** POST /api/transcations - add a transcation */
.post(_transcation2.default.createTransaction);

router.route('/my')
/** GET /api/transcations/:transcationId - Get transcation */
.get(_transcation2.default.myList);

/** Load transcation when API with transcationId route parameter is hit */
router.param('transcationId', _transcation2.default.load);

exports.default = router;
//# sourceMappingURL=transcation.route.js.map
