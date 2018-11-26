'use strict';

var _weixin = require('../server/aouth2.0/weixin');

(0, _weixin.authorize)('test', function (err, body) {
  if (err) {
    return;
  }
  (0, _weixin.userInfo)(body.access_token, body.openid, function (err, body) {
    if (err) {}
  });
});
//# sourceMappingURL=test.js.map
