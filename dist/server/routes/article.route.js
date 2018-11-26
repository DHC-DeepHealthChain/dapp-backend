'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _article = require('../controllers/jkbapp/article.controller');

var _article2 = _interopRequireDefault(_article);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** POST /api/articles/:articleId - 添加文章 */
.post(_article2.default.create)
/** GET /api/articles - 获取文章列表 */
.get(_article2.default.list);

router.route('/:articleId')
/** DELETE /api/articles/:articleId - 根据文章id删除文章 */
.delete(_article2.default.remove);

router.route('/articleInfo/:articleId')
/** GET /api/articles/:articleId - 获取文章详情 */
.get(_article2.default.info);

router.route('/articleInfoNoUser/:articleId')
/** GET /api/articles/:articleId - 获取文章详情（无需用户登录） */
.get(_article2.default.infoNoUser);

router.route('/share/:articleId')
/** POST /api/articles/share/:articleId - 分享文章 */
.post(_article2.default.share);

router.route('/pass')
/** POST /api/articles/pass/:articleId - 审核文章 */
.post(_article2.default.pass);

exports.default = router;
//# sourceMappingURL=article.route.js.map
