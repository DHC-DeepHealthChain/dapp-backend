import Exam from '../../models/jkbapp/exam.model';
import { getContentsByHash, getListImgByHash } from '../../utils/ipfsList';

async function getList(pageSize, page) {
  let exams = await Exam.list({ pageSize, page });
  // 计算总数
  const total = await Exam.countAll();
  if (exams !== null) {
    exams = await getContentsByHash(exams);
    exams = await getListImgByHash(exams);
  }
  // 组装分页结果
  const pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
  // 下次app发版是解开
  // const result = { list: articles, pagination };
  return exams;
}

export default { getList };
