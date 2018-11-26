'use strict';

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appId = 'wxbf057113704253d3';
var appSecret = '483ca4e3e476e9b2a38c287995654c48';
var AUTHURL = 'https://api.weixin.qq.com/sns/oauth2/access_token';
var USERINFOURL = 'https://api.weixin.qq.com//sns/userinfo';
function authorize(code) {
  var params = {
    appid: appId,
    secret: appSecret,
    grant_type: 'authorization_code',
    code: code
  };
  var opts = {
    url: AUTHURL,
    qs: params,
    json: true
  };
  return (0, _requestPromise2.default)(opts).then(function (body) {
    if (body && body.access_token) {
      return body;
    }
    return null;
  }).catch(function (err) {
    console.log('err', err);
    return null;
  });
}

function userInfo(accessToken, openid) {
  var params = {
    access_token: accessToken,
    openid: openid
  };
  var opts = {
    url: USERINFOURL,
    qs: params,
    json: true
  };
  return (0, _requestPromise2.default)(opts).then(function (body) {
    if (body && body.access_token) {
      return body;
    }
    return null;
  }).catch(function (err) {
    console.log('err', err);
    return null;
  });
}
module.exports = { authorize: authorize, userInfo: userInfo };
//# sourceMappingURL=weixin.js.map
