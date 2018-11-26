import HealthPlan from '../../models/jkbapp/healthPlan.model';
import { getContentsByHash, getListImgByHash } from '../../utils/ipfsList';

/**
 * 获取计划单列表
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function list(pageSize, page) {
  let healthPlans = await HealthPlan.list({ pageSize, page });
  if (healthPlans !== null) {
    healthPlans = await getContentsByHash(healthPlans);
    healthPlans = await getListImgByHash(healthPlans);
  }
  // 计算总数
  const total = await HealthPlan.countAll();
  // 组装分页结果
  const pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
  // 下次app发版是解开
  // const result = { list: healthPlans, pagination };
  return healthPlans;
}

/**
 * 修改参与人数
 * @param {*} planId
 * @param {*} type
 */
async function updateJoinNumByPlanId(planId, type) {
  const healthPlan = await HealthPlan.get(planId);
  let newJoinNum = 0;
  if (type === 'add') {
    newJoinNum = parseInt(healthPlan.joinNum, 10) + 1;
  } else if (type === 'sub') {
    newJoinNum = parseInt(healthPlan.joinNum, 10) - 1;
  }
  await HealthPlan.findOneAndUpdate({ _id: planId }, { $set: { joinNum: newJoinNum } });
}

export default { list, updateJoinNumByPlanId };
