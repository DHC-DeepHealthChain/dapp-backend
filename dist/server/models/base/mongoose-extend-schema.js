'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseEntity = new _mongoose2.default.Schema({
  tag1: { type: String, required: false },
  tag2: { type: String, required: false },
  tag3: { type: String, required: false },
  tag4: { type: String, required: false },
  tag5: { type: String, required: false },
  tag6: { type: String, required: false },
  tag7: { type: String, required: false },
  tag8: { type: String, required: false },
  tag9: { type: String, required: false },
  tag10: { type: String, required: false },
  tag11: { type: String, required: false },
  tag12: { type: String, required: false },
  tag13: { type: String, required: false },
  tag14: { type: String, required: false },
  tag15: { type: String, required: false },
  tag16: { type: String, required: false },
  tag17: { type: String, required: false },
  tag18: { type: String, required: false },
  tag19: { type: String, required: false },
  tag20: { type: String, required: false },
  createdDate: { type: Date, default: Date.now },
  ipfsHash: { type: String, required: true }
});
function extendSchema(Schema, definition, options) {
  return new _mongoose2.default.Schema(Object.assign({}, Schema.obj, definition), options);
}
module.exports = { extendSchema: extendSchema, BaseEntity: BaseEntity };
//# sourceMappingURL=mongoose-extend-schema.js.map
