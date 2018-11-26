import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import healthPlanCtrl from '../controllers/jkbapp/healthPlans.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/healthPlans/:userId - get healthPlan list */
  .get(healthPlanCtrl.list)

  /** POST /api/healthPlans/:userId - add a healthPlan */
  .post(validate(paramValidation.createHealthPlan), healthPlanCtrl.create);

router.route('/my')
  /** GET /api/healthPlans/:userId - Get user`s healthPlan list */
  .get(healthPlanCtrl.getPlanList);

router.route('/join/:planId')
  /** POST /api/healthPlans/:userId - join a healthPlan */
  .post(healthPlanCtrl.joinPlan)

  /** DELETE /api/healthPlans/:userId - Delete a healthPlan */
  .delete(healthPlanCtrl.removePlan);

router.route('/planItemInfo')
  /** POST /api/healthPlans/planItemInfo - add a healthPlanItem by planId*/
  .post(validate(paramValidation.createHealthPlanItem), healthPlanCtrl.createItem);

router.route('/planItemInfo/:planId')
  /** GET /api/healthPlans/planItemInfo - Get info for healthPlanItem by planItemId*/
  .get(healthPlanCtrl.getPlanItemInfo);

router.route('/planItemInfo/remark/:planId')
  /** GET /api/healthPlans/panInfo - Get introduce for healthPlans by planId */
  .put(healthPlanCtrl.remarkContinueStep);

// router.param('userId', healthPlanCtrl.load);

export default router;
