import ResData from '../../helpers/responseData';
import Exam from '../../models/jkbapp/exam.model';
import Question from '../../models/jkbapp/question.model';
import Item from '../../models/jkbapp/item.model';
import UserAnswer from '../../models/jkbapp/userAnswer.model';
import { addContent, getContent } from '../../utils/ipfsFile';
import { getContentsByHash, getListImgByHash } from '../../utils/ipfsList';
import { getUserId } from '../../utils/jwtUtil';
import scoreLogService from '../../services/jkbapp/scorelog.service';
import messageService from '../../services/jkbapp/message.service';
import userService from '../../services/user.service';
import Scorelog from '../../models/jkbapp/scorelog.model';

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
async function getList(req, res) {
  const { pageSize = 50, page = 0 } = req.query;
  let exams = await Exam.list({ pageSize, page });
  exams = await getContentsByHash(exams);
  exams = await getListImgByHash(exams);
  return res.json(new ResData(exams));
}

/**
 * 根据试卷id获取试卷详情
 * @param {*} req
 * @param {*} res
 */
async function getExamInfo(req, res) {
  let { examId } = req.params;
  if (examId === '-1') {
    examId = '5ad9bc1e00bfe41e7e92b7bf';
  }
  let qList = await Question.getByExamId(examId);
  if (qList) {
    qList = await getContentsByHash(qList);
    for (let i = 0; i < qList.length; i += 1) {
      const itemList = await Item.getByQuestionId(qList[i]._id);
      if (itemList) {
        qList[i].itemList = await getContentsByHash(itemList);
      }
    }
  }
  return res.json(new ResData(qList));
}

async function getScantron(req, res, next) {
  const { examId } = req.params;
  const userId = getUserId(req, res);
  const userAnswer = await UserAnswer.getByExamIdAndUserId(examId, userId);
  getContent(userAnswer.ipfsHash)
    .then((buffer) => {
      userAnswer.content = buffer;// eslint-disable-line no-param-reassign
      res.json(new ResData(userAnswer));
    })
    .catch(e => next(e));
}
/**
 * 提交问卷答案
 * 用户可以重复答题，但只发一次积分
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function postScantron(req, res, next) {
  const userId = getUserId(req, res); // 获取用户id
  const examid = req.body.examId; // 获取试卷id
  // 添加积分
  const taskType = 'Exam';
  // 检查是否已经下发过积分
  const flag = await Scorelog.checkExist(userId, taskType);
  if (!flag) {
    // 添加积分日志
    await scoreLogService.create(userId, taskType);
  }
  // 上传到IPFS
  req.body.createdDate = new Date();// eslint-disable-line no-param-reassign
  addContent(req.body)
    .then((hash) => {
      const userAnswer = new UserAnswer({
        userId,
        examId: examid,
        ipfsHash: hash
      });
      // 保存数据库
      userAnswer.save()
        .then(() => res.json(new ResData({}, false, '回答完毕')))
        .catch(e => next(e));
    })
    .catch(e => next(e));
  return undefined;
}

/**
 * 上传问券的基本信息
 * @param {*} req
 * @param {*} res
 */
async function postExam(req, res) {
  // 上传到IPFS
  req.body.createdDate = new Date();// eslint-disable-line no-param-reassign
  const hash = await addContent(req.body);
  // 定义ipfs数据
  const exam = new Exam({
    ipfsHash: hash,
    listImg: req.body.listImg,
  });
  // 保存数据库
  const newExam = await exam.save();
  // 给每个用户添加消息
  const users = await userService.findAll();
  users.map(async (item) => {
    await messageService.create(item._id, 'Exam', '有新的问卷', newExam._id);
  });
  res.json(new ResData({}, false, '创建成功'));
}

/**
 * 获取推荐的问券
 * @param {*} req
 * @param {*} res
 */
async function getRecommendList(req, res) {
  console.log('getRecommendList');
  let list = await Exam.getByIsRecommend();
  if (list) {
    list = await getContentsByHash(list);
    list = await getListImgByHash(list);
  }
  return res.json(new ResData(list));
}
/**
 * 问券推荐
 * @param {*} req
 * @param {*} res
 */
function recommendExam(req, res) {
  const userId = getUserId();
  const { examId } = req.params;
  const { isRecommend } = req.body;
  Exam.findOneAndUpdate({ _id: examId }, { $set: { isRecommend } }, (err) => {
    if (err) {
      return res.json(new ResData(userId, true, '设置推荐失败'));
    }
    return res.json(new ResData(userId, false, '设置推荐成功'));
  });
}
/**
 * 删除问券
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function removeExam(req, res) {
  Exam.deleteOne({ _id: req.params._id }, (err) => {
    if (err) {
      res.json(new ResData({}, true, '删除失败'));
    } else {
      res.json(new ResData({}, false, '删除成功'));
    }
  });
}
/**
 * 上传问题
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function postQ(req, res, next) {
  // 上传到IPFS
  req.body.createdDate = new Date();// eslint-disable-line no-param-reassign
  addContent(req.body)
    .then((hash) => {
      const question = new Question({
        ipfsHash: hash,
        orderNum: req.body.orderNum,
        examId: req.body.examId
      });
      // 保存数据库
      question.save()
        .then(() => res.json(new ResData({}, false, '创建成功')))
        .catch(e => next(e));
    })
    .catch(e => next(e));
}
/**
 * 删除问题
 * @param {*} req
 * @param {*} res
 */
function removeQ(req, res) {
  Question.deleteOne({ _id: req.params.questionId }, (err) => {
    if (err) {
      res.json(new ResData({}, true, '删除失败'));
    } else {
      res.json(new ResData({}, false, '删除成功'));
    }
  });
}
/**
 * 创建选项
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function postItem(req, res, next) {
  const { orderNum, questionId } = req.body;
  // 上传到IPFS
  req.body.createdDate = new Date();// eslint-disable-line no-param-reassign
  addContent(req.body)
    .then((hash) => {
      const item = new Item({
        ipfsHash: hash,
        orderNum,
        questionId
      });
      // 保存数据库
      item.save()
        .then(() => res.json(new ResData({}, false, '创建成功')))
        .catch(e => next(e));
    })
    .catch(e => next(e));
}

/**
 * 删除问题
 * @param {*} req
 * @param {*} res
 */
function removeItem(req, res) {
  Item.deleteOne({ _id: req.params.itemId }, (err) => {
    if (err) {
      res.json(new ResData({}, true, '删除失败'));
    } else {
      res.json(new ResData({}, false, '删除成功'));
    }
  });
}

export default {
  getRecommendList,
  getList,
  getExamInfo,
  postExam,
  removeExam,
  postQ,
  removeQ,
  postItem,
  removeItem,
  postScantron,
  getScantron,
  recommendExam,
};
