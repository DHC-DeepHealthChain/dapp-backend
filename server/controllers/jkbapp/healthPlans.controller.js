import ResData from '../../helpers/responseData';
import HealthPlan from '../../models/jkbapp/healthPlan.model';
import HealthUserPlan from '../../models/jkbapp/healthUserPlan.model';
import HealthPlanItem from '../../models/jkbapp/healthPlanItem.model';
import { addContent, getContent } from '../../utils/ipfsFile';
import { getContentsByHash, getListImgByHash } from '../../utils/ipfsList';
import { getUserId } from '../../utils/jwtUtil';
// import PlanContract from '../../helpers/planContract';
import scoreLogService from '../../services/jkbapp/scorelog.service';
import healthPlanService from '../../services/jkbapp/healthPlan.service';
import UserPlanContract from '../../contracts/userPlanContract';

const userPlanContract = new UserPlanContract();
function load(req, res, next, id) {
  HealthPlan.get(id)
    .then((healthPlan) => {
      getContent(healthPlan.ipfsHash)
        .then((buffer) => {
          healthPlan.detail = buffer;// eslint-disable-line no-param-reassign
          req.healthPlan = healthPlan; // eslint-disable-line no-param-reassign
          return next();
        })
        .catch(e => next(e));
    })
    .catch(e => next(e));
}

/**
 * 获取计划单列表
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function list(req, res) {
  const { pageSize = 20, page = 0 } = req.query;
  const healthPlans = await healthPlanService.list(pageSize, page);
  return res.json(new ResData(healthPlans, false, null));
}

/**
 * 创建计划
 * @param {*} req
 * @param {*} res
 */
function create(req, res, next) {
  // todo名称唯一性校验
  const ipfsData = {
    name: req.body.name,
    cycleDay: req.body.cycleDay,
    content: req.body.content,
    introduce: req.body.introduce,
    listImg: req.body.listImg,
    item: req.body.item,
  };
  // 上传到IPFS
  addContent(ipfsData)
    .then((hash) => {
      const healthPlan = new HealthPlan({
        ipfsHash: hash,
        joinNum: 0,
        listImg: req.body.listImg,
      });
      // 保存数据库
      healthPlan.save()
        .then(() => res.json(new ResData({}, false, '创建成功')))
        .catch(e => next(e));
      // // 上传到合约
      // const planContract = new PlanContract();
      // planContract.post(hash);
    })
    .catch(e => next(e));
}

/**
 * 获取计划单
 * @param {*} req
 * @param {*} res
 */
function get(req, res) {
  return res.json(req.healthPlan);
}


/**
 * 创建计划项
 * @param {*} req
 * @param {*} res
 */
function createItem(req, res, next) {
  // 上传到IPFS
  addContent(req.body)
    .then((hash) => {
      const healthPlanItem = new HealthPlanItem({
        ipfsHash: hash,
        planId: req.body.planId,
        step: req.body.step
      });
      // 保存数据库
      healthPlanItem.save()
        .then(() => res.json(new ResData({}, false, '创建成功')))
        .catch(e => next(e));
      // // 上传到合约
      // const planContract = new PlanContract();
      // planContract.post(hash);
    })
    .catch(e => next(e));
}

/**
 * 根据计划单id获取计划项详情
 * @param {*} req
 * @param {*} res
 */
async function getPlanItemInfo(req, res) {
  const { planId } = req.params;
  const userId = getUserId(req, res);
  // 查询是不是存在
  const userPlan = await HealthUserPlan.getByUserIdAndPlanId(userId, planId);
  if (userPlan && userPlan.delete === false) {
    let continueStep;
    const timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
    const createdDateTimestamp = userPlan.createdDate.getTime() / 1000;
    let finish = false;
    if (createdDateTimestamp < timeStamp) {
      continueStep = userPlan.continueStep + 1;
    } else {
      finish = userPlan.finish;
      continueStep = userPlan.continueStep;
    }
    let healthPlanItem = await HealthPlanItem.getByStep(continueStep, planId);
    if (!healthPlanItem) {
      healthPlanItem = await HealthPlanItem.getByStep(continueStep - 1, planId);
    }
    if (healthPlanItem) {
      healthPlanItem.content = await getContent(healthPlanItem.ipfsHash);
      healthPlanItem.finish = finish;
    }
    if (userPlan.continueStep < continueStep) {
      // 更新用户要进行的步骤
      const updateParam = {
        finish: false,
        continueStep,
        createdDate: (new Date()),
      };
      HealthUserPlan.findOneAndUpdate({ userId, planId }, { $set: updateParam }, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    return res.json(new ResData(healthPlanItem));
  }
  return res.json(new ResData(null, true, '获取项目失败'));
}


/**
 * 用户参加计划
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function joinPlan(req, res, next) {
  const { planId } = req.params;
  const userId = getUserId(req, res);
  // 查询是不是存在
  const userPlan = await HealthUserPlan.getByUserIdAndPlanId(userId, planId);
  if (userPlan) {
    if (userPlan.delete === false) {
      return res.json(new ResData(null, true, '你已经加入'));
    }
    HealthUserPlan.findOneAndUpdate({ userId, planId }, { $set: { delete: false } }, (err) => {
      if (err) {
        return res.json(new ResData(null, true, '添加失败'));
      }
      return res.json(new ResData(null, false, '添加成功'));
    });
  } else {
    const ipfsData = {
      userId,
      planId,
      continueStep: 1,
      finish: false,
    };
    // 上传到IPFS
    addContent(ipfsData)
      .then(async (hash) => {
        const healthUserPlan = new HealthUserPlan({
          userId,
          planId,
          ipfsHash: hash,
          continueStep: 1,
          finish: false,
        });
        // 保存数据库
        healthUserPlan.save()
          .then(() => res.json(new ResData(null, false, '加入成功')))
          .catch(e => next(e));
        // 数据上链
        userPlanContract.addUserPlan(hash);
      });
  }
  // 增加计划单参与人数
  await healthPlanService.updateJoinNumByPlanId(planId, 'add');

  return undefined;
}

/**
 * 用户取消计划
 * @param {*} req
 * @param {*} res
 */
async function removePlan(req, res) {
  const userId = getUserId(req, res);
  const { planId } = req.params;
  const healthUserPlan = await HealthUserPlan.getByUserIdAndPlanId(userId, planId);
  // 判断   在   记录存在且未被删除 的前提下， 减少参与人数
  if (healthUserPlan !== null && healthUserPlan.delete === false) {
    // 减少计划单参与人数
    await healthPlanService.updateJoinNumByPlanId(planId, 'sub');
  }

  HealthUserPlan.findOneAndUpdate({ userId, planId }, { $set: { delete: true } }, async (err) => {
    if (err) {
      return res.json(new ResData(null, true, '取消失败'));
    }
    // 删除合约中的用户信息
    userPlanContract.deleteUserPlan(healthUserPlan.ipfsHash);
    return res.json(new ResData(null, false, '取消成功'));
  });
}

/**
 * 获取已参与的计划列表
 * @param {*} req
 * @param {*} res
 */
async function getPlanList(req, res) {
  const userId = getUserId(req, res);
  let plans = await HealthPlan.list();
  const userPlans = await HealthUserPlan.getByUserId(userId);
  const data = {};
  let userJoinList = [];
  let userNotJoinList = [];

  if (userPlans == null) {
    plans = await getContentsByHash(plans);
    data.userNotJoinList = await getListImgByHash(plans);
  } else {
    plans.map((plan) => {
      if (checkHashExist(userPlans, plan._id.toString())) {
        userJoinList.push(plan);
      } else {
        userNotJoinList.push(plan);
      }
      return null;
    });
    userJoinList = await getContentsByHash(userJoinList);
    data.userJoinList = await getListImgByHash(userJoinList);
    userNotJoinList = await getContentsByHash(userNotJoinList);
    data.userNotJoinList = await getListImgByHash(userNotJoinList);
  }
  if (plans !== null) {
    plans = await getContentsByHash(plans);
  }
  return res.json(new ResData(data));
}


/**
 * 用户完成计划项
 * @param {*} req
 * @param {*} res
 */
async function remarkContinueStep(req, res) {
  const { planId } = req.params;
  const userId = getUserId(req, res);

  // 查询是不是存在
  const userPlan = await HealthUserPlan.getByUserIdAndPlanId(userId, planId);
  if (userPlan && userPlan.delete === false) {
    const updateParam = {
      finish: true,
      createdDate: (new Date()),
    };
    HealthUserPlan.findOneAndUpdate({ userId, planId }, { $set: updateParam }, async (err, newHealthUserPlan) => { // eslint-disable-line
      if (err) {
        return res.json(new ResData(null, true, '标记失败'));
      }
      // 添加积分
      let taskType = 'PlanItem';
      await scoreLogService.create(userId, taskType);

      // 判否整个计划都已完成，若计划完成则增加额外积分
      const healthPlan = await HealthPlan.get(newHealthUserPlan.planId);
      if (healthPlan) {
        const healthPlanContent = await getContent(healthPlan.ipfsHash);
        if (healthPlanContent) {
          const content = JSON.parse(healthPlanContent);
          if (content.cycleDay === newHealthUserPlan.continueStep) {
            // 添加额外积分
            taskType = 'Plan';
            await scoreLogService.create(userId, taskType);
          }
        }
      }
      return res.json(new ResData(null, false, '完成任务'));
    });
  }
}

/**
 * 判断是否已选择
 * @param {*} userPlans
 * @param {*} planId
 */
function checkHashExist(userPlans, planId) {
  let res = false;
  userPlans.map((userPlan) => {
    if (userPlan.planId === planId) {
      res = true;
    }
    return null;
  });
  return res;
}

export default {
  load,
  list,
  create,
  get,
  getPlanItemInfo,
  createItem,
  getPlanList,
  joinPlan,
  removePlan,
  remarkContinueStep,
};
