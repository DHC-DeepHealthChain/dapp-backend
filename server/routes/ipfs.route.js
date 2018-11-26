import express from 'express';
import validate from 'express-validation';
import multer from 'multer';
import ipfsCtrl from '../controllers/ipfs.controller';
import paramValidation from '../../config/param-validation';


const router = express.Router(); // eslint-disable-line new-cap
const upload = multer();

router.route('/')
  /** GET /api/ipfss - 获取用户上传的ipfs数据 */
  .get(ipfsCtrl.list);

router.route('/allList')
  /** GET /api/ipfss - 获取所有用户上传的ipfs数据 */
  .get(ipfsCtrl.allList);

router.route('/media')
  /** POST /api/users - 上传影像 */
  .post(ipfsCtrl.createMedia);

router.route('/uploadFile')
  /** POST /api/ipfs/uploadFile - upload file */
  .post(upload.single('file'), ipfsCtrl.uploadFile);

router.route('/formData')
  /** POST /api/ipfs/formData - upload form data */
  .post(validate(paramValidation.uploadContent), ipfsCtrl.uploadContent);

router.route('/getImg/:IpfsHash')
  /** GET /api/ipfs/:ipfsId - Get ipfs */
  .get(ipfsCtrl.getImgByIpfsHash);

/** Load ipfs when API with ipfsId route parameter is hit */
router.param('ipfsId', ipfsCtrl.load);

export default router;
