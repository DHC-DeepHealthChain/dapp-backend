import express from 'express';
import articleCtrl from '../controllers/jkbapp/article.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** POST /api/articles/:articleId - 添加文章 */
  .post(articleCtrl.create)
  /** GET /api/articles - 获取文章列表 */
  .get(articleCtrl.list);

router.route('/:articleId')
  /** DELETE /api/articles/:articleId - 根据文章id删除文章 */
  .delete(articleCtrl.remove);

router.route('/articleInfo/:articleId')
  /** GET /api/articles/:articleId - 获取文章详情 */
  .get(articleCtrl.info);

router.route('/articleInfoNoUser/:articleId')
  /** GET /api/articles/:articleId - 获取文章详情（无需用户登录） */
  .get(articleCtrl.infoNoUser);

router.route('/share/:articleId')
  /** POST /api/articles/share/:articleId - 分享文章 */
  .post(articleCtrl.share);

router.route('/pass')
  /** POST /api/articles/pass/:articleId - 审核文章 */
  .post(articleCtrl.pass);

export default router;
