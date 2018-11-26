import express from 'express';
import taskCtrl from '../controllers/jkbapp/task.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/tasks - get task list */
  .get(taskCtrl.getList)
  /** GET /api/tasks - create task */
  .post(taskCtrl.create);

router.route('/taskForAttachWeChatPlatform')
  /** POST /api/tasks/taskForAttachWeChatPlatform - post task for AttachWeChatPlatform */
  .post(taskCtrl.taskForAttachWeChatPlatform);

router.route('/:taskId')
  /** GET /api/tasks/:taskId - get task info */
  .get(taskCtrl.getInfo);

export default router;
