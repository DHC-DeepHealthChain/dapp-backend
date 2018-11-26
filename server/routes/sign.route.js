import express from 'express';
import signCtrl from '../controllers/jkbapp/sign.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/signs - get sign list */
  .get(signCtrl.getList)
  /** POST /api/signs - create sign */
  .post(signCtrl.create);

router.route('/signState')
  /** GET /api/signs/signState - get sign state */
  .get(signCtrl.getSignState);

export default router;
