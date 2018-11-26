import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import blockRoutes from './block.route';
import transcationRoutes from './transcation.route';
import ipfsRoutes from './ipfs.route';
import accountRoutes from './account.route';
import healthPlanRoutes from './healthPlans.route';
import articleRoutes from './article.route';
import examRoutes from './exam.route';
import favoriteRoutes from './favorite.route';
import scoreRoutes from './score.route';
import healthIndicatorRoutes from './healthIndicator.route';
import taskRoutes from './task.route';
import messageRoutes from './message.route';
import feedbackRoutes from './feedback.route';
import signRoutes from './sign.route';
import commentRoutes from './comment.route';
import apkRoutes from './apk.route';
import scheduleRoutes from './schedule.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount auth routes at /blocks
router.use('/blocks', blockRoutes);

// mount auth routes at /transcations
router.use('/transactions', transcationRoutes);

// mount auth routes at /ipfs
router.use('/ipfs', ipfsRoutes);

// mount auth routes at /account
router.use('/account', accountRoutes);

// mount auth routes at /healthPlan
router.use('/healthPlan', healthPlanRoutes);

// mount auth routes at /articles
router.use('/articles', articleRoutes);

// mount auth routes at /exams
router.use('/exams', examRoutes);

// mount auth routes at /favorites
router.use('/favorites', favoriteRoutes);

// mount auth routes at /tasks
router.use('/scores', scoreRoutes);

// mount auth routes at /healthIndicators
router.use('/healthIndicators', healthIndicatorRoutes);

// mount auth routes at /tasks
router.use('/tasks', taskRoutes);

// mount auth routes at /messages
router.use('/messages', messageRoutes);

// mount auth routes at /messages
router.use('/feedbacks', feedbackRoutes);

// mount auth routes at /signs
router.use('/signs', signRoutes);

// mount auth routes at /comments
router.use('/comments', commentRoutes);

// mount auth routes at /apkVersions
router.use('/apks', apkRoutes);

// mount auth routes at /scheduleRoutes
router.use('/schedules', scheduleRoutes);

export default router;
