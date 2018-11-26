import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(userCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create);

// router.route('/all')
//   /** GET /api/users - Get list of users */
//   .get(userCtrl.getAll);

router.route('/resetPassword')
  /** POST /api/users/resetPassword - reset password by userId */
  .post(validate(paramValidation.resetPassword), userCtrl.resetPassword);

router.route('/invite')
  /** GET /api/users/invite - 获取邀请码 */
  .get(userCtrl.getInviteCode)
  /** GET /api/users/invite/:inviteCode - 校验邀请码 */
  .post(userCtrl.checkInviteCode);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(userCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(userCtrl.remove);

router.route('/sendCaptcha/:mobileNumber')
  /** POST /api/users/feedback - Post feedback by userId */
  .get(userCtrl.sendCaptchaByMobile);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

export default router;
