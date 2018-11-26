import express from 'express';
import feedbackCtrl from '../controllers/jkbapp/feedback.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/feedbacks - get feedback list */
  .get(feedbackCtrl.getList)
  /** GET /api/feedbacks - create feedback */
  .post(feedbackCtrl.create);

router.route('/:feedbackId')
  /** GET /api/feedbacks/:feedbackId - get feedback info */
  .get(feedbackCtrl.getInfo)
  /** POST /api/feedbacks/:feedbackId - 采纳反馈意见 */
  .post(feedbackCtrl.take);

export default router;
