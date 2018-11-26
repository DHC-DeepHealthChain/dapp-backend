'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseExtendSchema = require('../base/mongoose-extend-schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Task Schema
 */
var TaskSchema = (0, _mongooseExtendSchema.extendSchema)(_mongooseExtendSchema.BaseEntity, {
  // 任务创建人
  userId: {
    type: String,
    required: true
  },
  taskType: {
    type: String,
    required: true
  },
  delete: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    required: true
  }
});

/**
 * method
 */
TaskSchema.method({});

/**
 * statics
 */
TaskSchema.statics = {
  get: function get(id) {
    return this.findById(id).lean().exec().then(function (task) {
      if (task) {
        return task;
      }
      return null;
    });
  },
  fingByTaskType: function fingByTaskType(taskType) {
    return this.find({ taskType: taskType }).sort({ createdDate: -1 }).lean().exec().then(function (tasks) {
      if (tasks.length > 0) {
        return tasks;
      }
      return null;
    });
  },
  list: function list() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$pageSize = _ref.pageSize,
        pageSize = _ref$pageSize === undefined ? 200 : _ref$pageSize,
        _ref$page = _ref.page,
        page = _ref$page === undefined ? 0 : _ref$page;

    var skip = Number(pageSize * page);
    return this.find({}).sort({ createdDate: -1 }).skip(+skip).limit(+pageSize).lean().exec();
  },
  countAll: function countAll() {
    return this.count({}).lean().exec();
  }
};

/**
 * @typedef Task
 */
exports.default = _mongoose2.default.model('Task', TaskSchema);
//# sourceMappingURL=task.model.js.map
