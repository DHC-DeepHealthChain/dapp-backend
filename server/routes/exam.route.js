import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import examCtrl from '../controllers/jkbapp/exam.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/recommend')
  /** GET /api/exams - get exam list */
  .get(examCtrl.getRecommendList);

router.route('/')
  /** GET /api/exams - get exam list */
  .get(examCtrl.getList)
    /** GET /api/exams - get exam list */
  .post(validate(paramValidation.createExams), examCtrl.postExam);

router.route('/:examId')
  /** GET /api/exams - get exam info by examId */
  .get(examCtrl.getExamInfo)

  // /** put /api/exams - get exam list */
  .put(examCtrl.recommendExam);

router.route('/questions')
    /** Post /api/exams/questions*/
  .post(validate(paramValidation.createQuestions), examCtrl.postQ);

router.route('/questions/:questionId')
    /** Post /api/exams/questions*/
  .delete(examCtrl.removeQ);

router.route('/questions/items')
    /** Post /api/exams/questions*/
  .post(validate(paramValidation.createItems), examCtrl.postItem);

router.route('/questions/items/:itemId')
    /** Post /api/exams/questions*/
  .delete(examCtrl.removeItem);

router.route('/answers')
.post(examCtrl.postScantron);

router.route('/answers/:examId')
  /** Post /api/exams/answers*/
.get(examCtrl.getScantron);

export default router;
