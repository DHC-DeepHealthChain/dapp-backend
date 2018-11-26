'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('./user.route');

var _user2 = _interopRequireDefault(_user);

var _auth = require('./auth.route');

var _auth2 = _interopRequireDefault(_auth);

var _block = require('./block.route');

var _block2 = _interopRequireDefault(_block);

var _transcation = require('./transcation.route');

var _transcation2 = _interopRequireDefault(_transcation);

var _ipfs = require('./ipfs.route');

var _ipfs2 = _interopRequireDefault(_ipfs);

var _account = require('./account.route');

var _account2 = _interopRequireDefault(_account);

var _healthPlans = require('./healthPlans.route');

var _healthPlans2 = _interopRequireDefault(_healthPlans);

var _article = require('./article.route');

var _article2 = _interopRequireDefault(_article);

var _exam = require('./exam.route');

var _exam2 = _interopRequireDefault(_exam);

var _favorite = require('./favorite.route');

var _favorite2 = _interopRequireDefault(_favorite);

var _score = require('./score.route');

var _score2 = _interopRequireDefault(_score);

var _healthIndicator = require('./healthIndicator.route');

var _healthIndicator2 = _interopRequireDefault(_healthIndicator);

var _task = require('./task.route');

var _task2 = _interopRequireDefault(_task);

var _message = require('./message.route');

var _message2 = _interopRequireDefault(_message);

var _feedback = require('./feedback.route');

var _feedback2 = _interopRequireDefault(_feedback);

var _sign = require('./sign.route');

var _sign2 = _interopRequireDefault(_sign);

var _comment = require('./comment.route');

var _comment2 = _interopRequireDefault(_comment);

var _apk = require('./apk.route');

var _apk2 = _interopRequireDefault(_apk);

var _schedule = require('./schedule.route');

var _schedule2 = _interopRequireDefault(_schedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', function (req, res) {
  return res.send('OK');
});

// mount user routes at /users
router.use('/users', _user2.default);

// mount auth routes at /auth
router.use('/auth', _auth2.default);

// mount auth routes at /blocks
router.use('/blocks', _block2.default);

// mount auth routes at /transcations
router.use('/transactions', _transcation2.default);

// mount auth routes at /ipfs
router.use('/ipfs', _ipfs2.default);

// mount auth routes at /account
router.use('/account', _account2.default);

// mount auth routes at /healthPlan
router.use('/healthPlan', _healthPlans2.default);

// mount auth routes at /articles
router.use('/articles', _article2.default);

// mount auth routes at /exams
router.use('/exams', _exam2.default);

// mount auth routes at /favorites
router.use('/favorites', _favorite2.default);

// mount auth routes at /tasks
router.use('/scores', _score2.default);

// mount auth routes at /healthIndicators
router.use('/healthIndicators', _healthIndicator2.default);

// mount auth routes at /tasks
router.use('/tasks', _task2.default);

// mount auth routes at /messages
router.use('/messages', _message2.default);

// mount auth routes at /messages
router.use('/feedbacks', _feedback2.default);

// mount auth routes at /signs
router.use('/signs', _sign2.default);

// mount auth routes at /comments
router.use('/comments', _comment2.default);

// mount auth routes at /apkVersions
router.use('/apks', _apk2.default);

// mount auth routes at /scheduleRoutes
router.use('/schedules', _schedule2.default);

exports.default = router;
//# sourceMappingURL=index.route.js.map
