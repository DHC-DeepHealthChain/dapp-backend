import { addContent, getContent } from '../../utils/ipfsFile';
import DateUtil from '../../utils/dateUtil';
import HealthIndicator from '../../models/jkbapp/healthIndicator.model';
import scoreService from '../../services/jkbapp/score.service';
import { getContentsByHash } from '../../utils/ipfsList';
import ResData from '../../helpers/responseData';
import scoreLogService from './scorelog.service';

/**
 * 获取用户指标项的最后一条记录
 * @param {*} userId
 */
async function getlastList(userId) {
  const arr = {};
  arr.bloodPressure = await getHealthIndicatorLast1ByUserIdAndHealthType(userId, 'bloodPressure');
  arr.weight = await getHealthIndicatorLast1ByUserIdAndHealthType(userId, 'weight');
  arr.step = await getHealthIndicatorLast1ByUserIdAndHealthType(userId, 'step');
  arr.waistline = await getHealthIndicatorLast1ByUserIdAndHealthType(userId, 'waistline');
  arr.temperature = await getHealthIndicatorLast1ByUserIdAndHealthType(userId, 'temperature');
  arr.heartRate = await getHealthIndicatorLast1ByUserIdAndHealthType(userId, 'heartRate');
  return arr;
}

async function getHealthIndicatorLast1ByUserIdAndHealthType(userId, healthType) {
  const data = await HealthIndicator.getLast1ByUserIdAndHealthType(userId, healthType);
  if (data) {
    const content = await getContent(data[0].ipfsHash);
    if (content) {
      data[0].content = content;
      return data[0];
    }
    return null;
  }
  return null;
}

/**
 * 根据类型获取健康指标项集合
 * @param {*} userId 用户id
 * @param {*} pageSize
 * @param {*} page
 * @param {*} healthType 健康指标类型
 */
async function getList(userId, pageSize, page, healthType) {
  let healthIndicators = await HealthIndicator.list({ pageSize, page, userId, healthType });
  if (healthIndicators !== null) {
    healthIndicators = await getContentsByHash(healthIndicators);
  }
  // 计算总数
  const total = await HealthIndicator.countByHealthType();
  // 组装分页结果
  const pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
  // 下次app发版是解开
  // const result = { list: healthIndicators, pagination };
  return healthIndicators;
}

/**
 * 创建健康指标
 * @param {*} htype 上传健康指标 类型
 * @param {*} userid 用户id
 * @param {*} body 指标项内容
 */
async function create(htype, userid, body) {
  // 获取今日开始时间
  const todayStartDate = DateUtil.getDayStartDate();
  // 判断今日是否已上传数据
  const flag = await HealthIndicator.getByDateGreatThenAndHealthTypeAndUserId(todayStartDate, htype, userid); // eslint-disable-line
  if (htype !== 'step' && flag) {
    return new ResData(null, true, '今日已上传过该类型的健康指标数据');
  }

  // 添加健康指标项
  await buildHeathIndicator(htype, userid, body, flag);
  // 上传到合约 代做

  // 今日若没有上传，则添加积分
  if (!flag) {
    // 添加积分
    const taskType = 'HealthIndicator';
    const scoreResultBody = await scoreService.update(userid, taskType);
    if (scoreResultBody !== null && scoreResultBody.error) {
      return new ResData(null, true, scoreResultBody.message);
    }
  }
  return new ResData(null, false, '添加成功');
}

/**
 * 删除健康指标
 * @param {*} objectId 指标项 id
 */
async function remove(_id) {
  await HealthIndicator.findByIdAndUpdate({ _id }, { delete: true });
  return '删除成功';
}

/**
 * 添加步数
 * @param {*} htype 上传健康指标 类型
 * @param {*} userid 用户id
 * @param {*} body 指标项内容
 */
async function createStep(htype, userid, step) {
  // 获取今日开始时间
  const todayStartDate = DateUtil.getDayStartDate();
  // 判断今日是否已上传数据
  const healthIndicator = await HealthIndicator.getStepByDateGreatThenAndUserId(todayStartDate, userid); // eslint-disable-line
  if (healthIndicator === null) {
    const result = await stepCreate(userid, step);// 新建步数
    return result;
  }
  const content = await getContent(healthIndicator.ipfsHash);
  const oldStep = JSON.parse(content).content;
  const _id = healthIndicator._id;
  const result = await stepUpdate(userid, oldStep, step, _id);// 修改步数
  return result;
}

/** 内部方法 *****************************************/
async function buildHeathIndicator(htype, userid, body, flag) {
  // 定义ipfs中存储的数据
  const ipfsData = {
    userId: userid,
    healthType: htype,
    content: body,
  };
  // 上传到IPFS,返回对应hash
  const hash = await addContent(ipfsData);

  if (!flag) {
    // 定义 healthIndicator对象数据
    const healthIndicator = new HealthIndicator({
      ipfsHash: hash,
      userId: userid,
      healthType: htype,
    });
    // 保存数据库
    await HealthIndicator.create(healthIndicator);
    return new ResData(null, true, '今日已上传过该类型的健康指标数据');
  } else if (htype === 'step' && flag) {
    // 修改步数信息
    const oldHealthIndicators = await HealthIndicator.getLast1ByUserIdAndHealthType(userid, htype);
    await HealthIndicator.findByIdAndUpdate({ _id: oldHealthIndicators[0]._id },
      { $set: { ipfsHash: hash } });
  }

  return '添加成功';
}

async function stepCreate(userId, step) {
  // 定义ipfs中存储的数据
  const ipfsData = {
    userId,
    healthType: 'step',
    content: step,
  };
  // 上传到IPFS,返回对应hash
  const hash = await addContent(ipfsData);
  // 定义 healthIndicator对象数据
  const healthIndicator = new HealthIndicator({
    ipfsHash: hash,
    userId,
    healthType: 'step',
  });
  // 保存数据库
  await HealthIndicator.create(healthIndicator);
  let taskType;
  if (Number(step) < 3000) {
    taskType = undefined;
  } else if (Number(step) >= 3000 && Number(step) < 7000) {
    taskType = 'Step3000';
  } else if (Number(step) >= 7000) {
    taskType = 'Step7000';
  }
  if (taskType !== undefined) {
    // 添加积分日志
    await scoreLogService.create(userId, taskType);
  }
  return new ResData(null, false, '添加成功');
}

async function stepUpdate(userId, oldStep, step, _id) {
  // 定义ipfs中存储的数据
  const ipfsData = {
    userId,
    healthType: 'step',
    content: step,
  };
  // 上传到IPFS,返回对应hash
  const hash = await addContent(ipfsData);
  // 修改步数信息
  await HealthIndicator.findByIdAndUpdate({ _id }, { ipfsHash: hash });
  let taskType;
  if (oldStep < 3000) {
    if (step < 3000) {
      taskType = undefined;
    } else if (step >= 3000 && step < 7000) {
      taskType = 'Step3000';
    } else if (step >= 7000) {
      taskType = 'Step7000';
    }
  } else if (oldStep >= 3000 && oldStep < 7000) {
    if (step >= 3000 && step < 7000) {
      taskType = undefined;
    } else if (step >= 7000) {
      taskType = 'Step3000';
    }
  } else if (oldStep >= 7000) {
    taskType = undefined;
  }
  if (taskType !== undefined) {
    // 添加积分日志
    await scoreLogService.create(userId, taskType);
  }
  return new ResData(null, false, '修改成功');
}
/** 内部方法 *****************************************/

export default { getlastList, getList, create, createStep, remove };
