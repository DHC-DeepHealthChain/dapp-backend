'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _task = require('../controllers/jkbapp/task.controller');

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/tasks - get task list */
.get(_task2.default.getList)
/** GET /api/tasks - create task */
.post(_task2.default.create);

router.route('/taskForAttachWeChatPlatform')
/** POST /api/tasks/taskForAttachWeChatPlatform - post task for AttachWeChatPlatform */
.post(_task2.default.taskForAttachWeChatPlatform);

router.route('/:taskId')
/** GET /api/tasks/:taskId - get task info */
.get(_task2.default.getInfo);

exports.default = router;
//# sourceMappingURL=task.route.js.map
