'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _paramValidation = require('../../config/param-validation');

var _paramValidation2 = _interopRequireDefault(_paramValidation);

var _exam = require('../controllers/jkbapp/exam.controller');

var _exam2 = _interopRequireDefault(_exam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/recommend')
/** GET /api/exams - get exam list */
.get(_exam2.default.getRecommendList);

router.route('/')
/** GET /api/exams - get exam list */
.get(_exam2.default.getList)
/** GET /api/exams - get exam list */
.post((0, _expressValidation2.default)(_paramValidation2.default.createExams), _exam2.default.postExam);

router.route('/:examId')
/** GET /api/exams - get exam info by examId */
.get(_exam2.default.getExamInfo)

// /** put /api/exams - get exam list */
.put(_exam2.default.recommendExam);

router.route('/questions')
/** Post /api/exams/questions*/
.post((0, _expressValidation2.default)(_paramValidation2.default.createQuestions), _exam2.default.postQ);

router.route('/questions/:questionId')
/** Post /api/exams/questions*/
.delete(_exam2.default.removeQ);

router.route('/questions/items')
/** Post /api/exams/questions*/
.post((0, _expressValidation2.default)(_paramValidation2.default.createItems), _exam2.default.postItem);

router.route('/questions/items/:itemId')
/** Post /api/exams/questions*/
.delete(_exam2.default.removeItem);

router.route('/answers').post(_exam2.default.postScantron);

router.route('/answers/:examId')
/** Post /api/exams/answers*/
.get(_exam2.default.getScantron);

exports.default = router;
//# sourceMappingURL=exam.route.js.map
