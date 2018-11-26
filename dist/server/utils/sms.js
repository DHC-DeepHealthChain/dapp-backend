'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 发送验证码
 * @param {*} buffer
 */
exports.sendCaptcha = function (mobileNumber, captcha) {
  return new Promise(function (resolve, reject) {
    var contenttemp = encodeURI('\u4EB2\u7231\u7684\u5065\u5EB7\u5B9D\u7528\u6237\u60A8\u597D\uFF0C\u60A8\u7684\u9A8C\u8BC1\u7801\u4E3A' + captcha + '\u3002\u9A8C\u8BC1\u78015\u5206\u949F\u5185\u6709\u6548\u3002');
    var SMS_URL = 'http://115.28.143.178:8080/sms/sendUtf.do?spId=5427&loginName=ddkwlkj&password=ddkwlkjbnmkg&content=' + contenttemp + '&mobiles=' + mobileNumber + '&subPort=';
    _request2.default.post({ url: SMS_URL }, function (err, httpResponse) {
      var resultTemp = httpResponse.body;
      // 解析结果
      var info = resultTemp.split('&');
      var resultsTemp0 = info[0].split('=');
      // 1000为成功的标识符
      if (resultsTemp0[1] === '1000') {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}; // import fetch from 'node-fetch';
// import URLSearchParams from 'url-search-params';
//# sourceMappingURL=sms.js.map
