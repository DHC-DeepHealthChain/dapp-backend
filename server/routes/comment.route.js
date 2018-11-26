import express from 'express';
import commentCtrl from '../controllers/jkbapp/comment.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/commments - get commments list by userId */
  .get(commentCtrl.getList)
  /** POST /api/commments - create commment */
  .post(commentCtrl.create);

router.route('/:commentId')
  /** DELETE /api/commments - delete commment by commentId */
  .delete(commentCtrl.remove);

export default router;

