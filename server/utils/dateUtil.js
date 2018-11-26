/**
* 获取本周、本季度、本月、上月的开始日期、结束日期
*/
let now; // 当前日期
let nowDayOfWeek; // 今天本周的第几天
let nowDay; // 当前日
let nowMonth; // 当前月
let nowYear;
let lastMonthDate; // 上月日期
let lastMonth;

// 格式化日期：返回时间戳
function formatDate(date) {
  const myyear = date.getFullYear();
  let mymonth = date.getMonth() + 1;
  let myweekday = date.getDate();

  if (mymonth < 10) {
    mymonth = '0' + mymonth;// eslint-disable-line
  }
  if (myweekday < 10) {
    myweekday = '0' + myweekday;// eslint-disable-line
  }
  return new Date(myyear + '-' + mymonth + '-' + myweekday + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()).getTime(); // eslint-disable-line
}

// 初始化每天的年月日参数
function initData() {
  now = new Date(); // 当前日期
  nowDayOfWeek = now.getDay(); // 今天本周的第几天
  nowDay = now.getDate(); // 当前日
  nowMonth = now.getMonth(); // 当前月
  nowYear = now.getYear(); // 当前年
  nowYear += (nowYear < 2000) ? 1900 : 0; //
  lastMonthDate = new Date();
  lastMonthDate.setDate(1);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  lastMonth = lastMonthDate.getMonth();
}

// 获得当月的天数
function getMonthDays() {
  initData();
  const monthStartDate = new Date(nowYear, nowMonth, 1);
  const monthEndDate = new Date(nowYear, nowMonth + 1, 1);
  const days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
}

// 获得本季度的开始月份
function getQuarterStartMonth() {
  initData();
  let quarterStartMonth = 0;
  if (nowMonth < 3) {
    quarterStartMonth = 0;
  }
  if (2 < nowMonth && nowMonth < 6) { // eslint-disable-line
    quarterStartMonth = 3;
  }
  if (5 < nowMonth && nowMonth < 9) { // eslint-disable-line
    quarterStartMonth = 6;
  }
  if (nowMonth > 8) {
    quarterStartMonth = 9;
  }
  return quarterStartMonth;
}

// 获得 当天 的开始日期
function getDayStartDate() {
  initData();
  const weekStartDate = new Date(nowYear, nowMonth, nowDay, 0, 0, 0); // eslint-disable-line
  return formatDate(weekStartDate);
}

// 获得 当天 的开始日期
function getDayEndDate() {
  initData();
  const weekStartDate = new Date(nowYear, nowMonth, nowDay, 23, 59, 59); // eslint-disable-line
  return formatDate(weekStartDate);
}

// 获得 昨天 的开始日期
function getYesterdayStartDate() {
  initData();
  const weekStartDate = new Date(nowYear, nowMonth, nowDay - 1, 0, 0, 0); // eslint-disable-line
  return formatDate(weekStartDate);
}

// 获得 昨天 的开始日期
function getYesterdayEndDate() {
  initData();
  const weekStartDate = new Date(nowYear, nowMonth, nowDay - 1, 23, 59, 59); // eslint-disable-line
  return formatDate(weekStartDate);
}

// 获得本周的开始日期
function getWeekStartDate() {
  initData();
  const weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1, 0, 0, 0); // eslint-disable-line
  return formatDate(weekStartDate);
}

// 获得本周的结束日期
function getWeekEndDate() {
  initData();
  const weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek) + 1, 23, 59, 59);
  return formatDate(weekEndDate);
}

// 获得本月的开始日期
function getMonthStartDate() {
  initData();
  const monthStartDate = new Date(nowYear, nowMonth, 1, 0, 0, 0);
  return formatDate(monthStartDate);
}

// 获得本月的结束日期
function getMonthEndDate() {
  initData();
  const monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth), 23, 59, 59);
  return formatDate(monthEndDate);
}

// 获得上月开始时间
function getLastMonthStartDate() {
  initData();
  const lastMonthStartDate = new Date(nowYear, lastMonth, 1, 0, 0, 0);
  return formatDate(lastMonthStartDate);
}

// 获得上月结束时间
function getLastMonthEndDate() {
  initData();
  const lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth), 23, 59, 59);
  return formatDate(lastMonthEndDate);
}

// 获得本季度的开始日期
function getQuarterStartDate() {
  initData();
  const quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1, 0, 0, 0);
  return formatDate(quarterStartDate);
}

// 获得本季度的结束日期
function getQuarterEndDate() {
  initData();
  const quarterEndMonth = getQuarterStartMonth() + 2;
  const quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth), 23, 59, 59);// eslint-disable-line
  return formatDate(quarterStartDate);
}

export default {
  formatDate,
  getDayStartDate,
  getDayEndDate,
  getYesterdayStartDate,
  getYesterdayEndDate,
  getWeekStartDate,
  getWeekEndDate,
  getMonthStartDate,
  getMonthEndDate,
  getLastMonthStartDate,
  getLastMonthEndDate,
  getQuarterStartDate,
  getQuarterEndDate,
};
