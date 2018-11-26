'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _responseData = require('../../helpers/responseData');

var _responseData2 = _interopRequireDefault(_responseData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getApkVersion(req, res) {
  var result = { version: '1.1.0', path: 'http://test-ddk-hd1-test.oss-cn-hangzhou.aliyuncs.com/healthBao/app-release1.1.0.apk' };
  return res.json(new _responseData2.default(result, false, null));
}

exports.default = {
  getApkVersion: getApkVersion
};
//# sourceMappingURL=apk.controller.js.map
