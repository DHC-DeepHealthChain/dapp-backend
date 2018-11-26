import express from 'express';
import messageCtrl from '../controllers/jkbapp/message.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/messages - get messags list by userId */
  .get(messageCtrl.getList)
  /** POST /api/messages - create messags */
  .post(messageCtrl.create);

router.route('/read/:messageId')
  /** GET /api/messages/read/:messageId - set messags read */
  .put(messageCtrl.read);

export default router;

