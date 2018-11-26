// import fetch from 'node-fetch';
// import URLSearchParams from 'url-search-params';
import request from 'request';

/**
 * 发送验证码
 * @param {*} buffer
 */
exports.sendCaptcha = (mobileNumber, captcha) => new Promise((resolve, reject) => {
  const contenttemp = encodeURI(`亲爱的健康宝用户您好，您的验证码为${captcha}。验证码5分钟内有效。`);
  const SMS_URL = `http://115.28.143.178:8080/sms/sendUtf.do?spId=5427&loginName=ddkwlkj&password=ddkwlkjbnmkg&content=${contenttemp}&mobiles=${mobileNumber}&subPort=`;
  request.post({ url: SMS_URL }, (err, httpResponse) => {
    const resultTemp = httpResponse.body;
    // 解析结果
    const info = resultTemp.split('&');
    const resultsTemp0 = info[0].split('=');
    // 1000为成功的标识符
    if (resultsTemp0[1] === '1000') {
      resolve(true);
    } else {
      reject(false);
    }
  });
});
