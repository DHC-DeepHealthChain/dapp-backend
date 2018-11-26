import ResData from '../../helpers/responseData';
import Comment from '../../models/jkbapp/comment.model';
import { getUserId } from '../../utils/jwtUtil';
import { getContentsByHash } from '../../utils/ipfsList';
import { addContent } from '../../utils/ipfsFile';
/**
 * 获取所有评论
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function getList(req, res, next) {
  try {
    const { pageSize = 20, page = 0 } = req.query;
    const userId = getUserId(req, res);
    let comments = await Comment.list({ pageSize, page, userId });
    if (comments !== null) {
      comments = await getContentsByHash(comments);
    }
    res.json(new ResData(comments));
    return undefined;
  } catch (e) {
    return next(e);
  }
}

/**
 * 添加一个评论
 * @param {*} res
 * @param {*} req
 */
function create(req, res, next) {
  // 定义ipfs中存储的数据
  const userid = getUserId(req, res);
  const ipfsData = {
    userId: userid,
    commentType: req.body.commentType,
    content: req.body.content,
    toCommenterId: req.body.toCommenterId,
    resourceId: req.body.resourceId,
    level: req.body.level,
  };
  // 上传到IPFS
  addContent(ipfsData)
    .then((hash) => {
      // 定义mongo存储的数据
      const comment = new Comment({
        ipfsHash: hash,
        userId: userid,
        commentType: req.body.commentType,
        toCommenterId: req.body.toCommenterId,
        resourceId: req.body.resourceId,
        level: req.body.level,
      });
      // 保存数据库
      Comment.create(comment);
      // 上传到合约 代做
      return res.json(new ResData('添加成功'));
    })
    .catch(e => next(e));
}


/**
 * 删除评论
 * @param {*} req
 * @param {*} res
 */
function remove(req, res) {
  Comment.get(req.params.commentId).then((comment) => {
    Comment.remove(comment)
      .then(() => res.json(new ResData({}, false, '删除成功')))
      .catch(e => res.json(new ResData({}, false, e)));
  });
}

export default { getList, create, remove };
