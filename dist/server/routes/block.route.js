'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _block = require('../controllers/block.controller');

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/blocks - Get list of blocks */
.get(_block2.default.list);

router.route('/:blockId')
/** GET /api/blocks/:blockId - Get block */
.get(_block2.default.get);

/** Load block when API with blockId route parameter is hit */
router.param('blockId', _block2.default.load);

exports.default = router;
//# sourceMappingURL=block.route.js.map
