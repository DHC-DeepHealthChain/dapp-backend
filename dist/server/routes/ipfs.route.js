'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _ipfs = require('../controllers/ipfs.controller');

var _ipfs2 = _interopRequireDefault(_ipfs);

var _paramValidation = require('../../config/param-validation');

var _paramValidation2 = _interopRequireDefault(_paramValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap
var upload = (0, _multer2.default)();

router.route('/')
/** GET /api/ipfss - 获取用户上传的ipfs数据 */
.get(_ipfs2.default.list);

router.route('/allList')
/** GET /api/ipfss - 获取所有用户上传的ipfs数据 */
.get(_ipfs2.default.allList);

router.route('/media')
/** POST /api/users - 上传影像 */
.post(_ipfs2.default.createMedia);

router.route('/uploadFile')
/** POST /api/ipfs/uploadFile - upload file */
.post(upload.single('file'), _ipfs2.default.uploadFile);

router.route('/formData')
/** POST /api/ipfs/formData - upload form data */
.post((0, _expressValidation2.default)(_paramValidation2.default.uploadContent), _ipfs2.default.uploadContent);

router.route('/getImg/:IpfsHash')
/** GET /api/ipfs/:ipfsId - Get ipfs */
.get(_ipfs2.default.getImgByIpfsHash);

/** Load ipfs when API with ipfsId route parameter is hit */
router.param('ipfsId', _ipfs2.default.load);

exports.default = router;
//# sourceMappingURL=ipfs.route.js.map
