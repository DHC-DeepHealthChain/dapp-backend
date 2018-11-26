import ResData from '../../helpers/responseData';

function getApkVersion(req, res) {
  const result = { version: '1.1.0', path: 'http://test-ddk-hd1-test.oss-cn-hangzhou.aliyuncs.com/healthBao/app-release1.1.0.apk' };
  return res.json(new ResData(result, false, null));
}

export default {
  getApkVersion
};
