import express from 'express';
import validate from 'express-validation';
import accountCtrl from '../controllers/account.controller';
import paramValidation from '../../config/param-validation';


const router = express.Router(); // eslint-disable-line new-cap
router.route('/')
/** POST /api/users - Create new user */
.post(validate(paramValidation.createAccount), accountCtrl.create);

router.route('/myAddress')
  /** GET /api/accounts - Get list of accounts */
  .get(accountCtrl.getByName);

router.route('/:accountId')
  /** DELETE /api/users/:userId - Delete user */
  .delete(accountCtrl.remove);
export default router;
