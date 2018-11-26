'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _favoriteController = require('../controllers/jkbapp/favoriteController');

var _favoriteController2 = _interopRequireDefault(_favoriteController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/favorites - get favorite list by userId*/
.get(_favoriteController2.default.getListByUserId);

router.route('/:favoriteId')
/** POST /api/favorites/:favoriteId - add favorite */
.post(_favoriteController2.default.create)

/** DELETE /api/favorites/:favoriteId - remove favorite */
.delete(_favoriteController2.default.remove);

exports.default = router;
//# sourceMappingURL=favorite.route.js.map
