const shortid = require('shortid');

function getCode() {
  let code = shortid.generate().toUpperCase();
  code = code.replace('-', '');
  code = code.replace('_', '');
  if (code.length > 6) {
    return code.substring(0, 6);
  }
  return code;
}

export default { getCode };
