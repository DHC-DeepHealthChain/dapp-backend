'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var shortid = require('shortid');

function getCode() {
  var code = shortid.generate().toUpperCase();
  code = code.replace('-', '');
  code = code.replace('_', '');
  if (code.length > 6) {
    return code.substring(0, 6);
  }
  return code;
}

exports.default = { getCode: getCode };
//# sourceMappingURL=inviteCode.js.map
