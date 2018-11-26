"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResData = function ResData(result) {
  var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  _classCallCheck(this, ResData);

  this.error = error;
  this.message = message;
  this.result = result;
};

exports.default = ResData;
//# sourceMappingURL=responseData.js.map
