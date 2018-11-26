import Message from '../../models/jkbapp/message.model';
import { getContentsByHash } from '../../utils/ipfsList';
import { addContent } from '../../utils/ipfsFile';

/**
 * 获取所有消息
 * @param {*} userId
 * @param {*} pageSize
 * @param {*} page
 */
async function getList(userId, pageSize, page) {
  let messages = await Message.list({ pageSize, page, userId });
  if (messages !== null) {
    messages = await getContentsByHash(messages);
  }
  // 计算总数
  const total = await Message.countAll();
  // 组装分页结果
  const pagination = { pageSize: Number(pageSize), current: Number(page), total: Number(total) }; // eslint-disable-line
  // 下次app发版是解开
  // const result = { list: messages, pagination };
  return messages;
}

/**
 * 添加一个消息
 * @param {*} userid
 * @param {*} type
 * @param {*} contentT
 */
async function create(userid, type, contentT, otherid) {
  // 定义ipfs中存储的数据
  const ipfsData = {
    userId: userid,
    messageType: type,
    content: contentT,
    otherId: otherid,
    isRead: false
  };
  // 上传到IPFS
  const hash = await addContent(ipfsData);
  // 定义mongo存储的数据
  const message = new Message({
    ipfsHash: hash,
    userId: userid,
    messageType: type,
  });
  // 保存数据库
  await Message.create(message);
  // 上传到合约 代做
  return '添加成功';
}


/**
 * 设置消息已读
 * @param {*} _id
 */
async function read(_id) {
  await Message.findOneAndUpdate({ _id }, { isRead: true });
  return '已读';
}

export default { getList, create, read };
