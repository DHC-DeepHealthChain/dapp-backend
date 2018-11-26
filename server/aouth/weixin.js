import rp from 'request-promise';

const appId = 'wxbf057113704253d3';
const appSecret = '483ca4e3e476e9b2a38c287995654c48';
const AUTHURL = 'https://api.weixin.qq.com/sns/oauth2/access_token';
const USERINFOURL = 'https://api.weixin.qq.com//sns/userinfo';
function authorize(code) {
  const params = {
    appid: appId,
    secret: appSecret,
    grant_type: 'authorization_code',
    code,
  };
  const opts = {
    url: AUTHURL,
    qs: params,
    json: true
  };
  return rp(opts).then((body) => {
    if (body && body.access_token) {
      return body;
    }
    return null;
  })
  .catch((err) => {
    console.log('err', err);
    return null;
  });
}

function userInfo(accessToken, openid) {
  const params = {
    access_token: accessToken,
    openid,
  };
  const opts = {
    url: USERINFOURL,
    qs: params,
    json: true
  };
  return rp(opts).then((body) => {
    if (body && body.access_token) {
      return body;
    }
    return null;
  })
  .catch((err) => {
    console.log('err', err);
    return null;
  });
}
module.exports = { authorize, userInfo };

