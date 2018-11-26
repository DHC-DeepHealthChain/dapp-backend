import express from 'express';
import transcationCtrl from '../controllers/transcation.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/transcations - Get list of transcations */
  .get(transcationCtrl.list)
  /** POST /api/transcations - add a transcation */
  .post(transcationCtrl.createTransaction);

router.route('/my')
  /** GET /api/transcations/:transcationId - Get transcation */
  .get(transcationCtrl.myList);

/** Load transcation when API with transcationId route parameter is hit */
router.param('transcationId', transcationCtrl.load);

export default router;
