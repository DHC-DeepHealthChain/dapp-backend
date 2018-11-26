import express from 'express';
import healthIndicatorCtrl from '../controllers/jkbapp/healthIndicator.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/last')
  /** GET /api/healthIndicators - get last healthIndicators item by userId */
  .get(healthIndicatorCtrl.getlastList);

/** healthIndicator */
router.route('/')
  /** GET /api/healthIndicators/bloodPressure - get healthIndicator list by userId */
  .get(healthIndicatorCtrl.getList);
  /** POST /api/healthIndicators - create healthIndicator */
  // .post(healthIndicatorCtrl.create);

/** step */
router.route('/step')
  /** POST /api/healthIndicators/step - create step */
  .post(healthIndicatorCtrl.createStep);

router.route('/:healthIndicatorId')
  /** DELETE /api/healthIndicators - remove healthIndicator by objectId */
  .delete(healthIndicatorCtrl.remove);

export default router;
