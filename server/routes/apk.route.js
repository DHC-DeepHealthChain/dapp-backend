import express from 'express';
import apkCtrl from '../controllers/jkbapp/apk.controller';


const router = express.Router(); // eslint-disable-line new-cap
router.route('/apkVersion')
  /** GET /api/apks - get apkVersion */
  .get(apkCtrl.getApkVersion);

export default router;
