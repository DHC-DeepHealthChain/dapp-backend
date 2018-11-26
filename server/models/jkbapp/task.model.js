import mongoose from 'mongoose';
import { extendSchema, BaseEntity } from '../base/mongoose-extend-schema';

/**
 * Task Schema
 */
const TaskSchema = extendSchema(BaseEntity, {
  // 任务创建人
  userId: {
    type: String,
    required: true
  },
  taskType: {
    type: String,
    required: true
  },
  delete: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    required: true
  }
});

/**
 * method
 */
TaskSchema.method({

});

/**
 * statics
 */
TaskSchema.statics = {

  get(id) {
    return this.findById(id)
      .lean()
      .exec()
      .then((task) => {
        if (task) {
          return task;
        }
        return null;
      });
  },

  fingByTaskType(taskType) {
    return this.find({ taskType })
      .sort({ createdDate: -1 })
      .lean()
      .exec()
      .then((tasks) => {
        if (tasks.length > 0) {
          return tasks;
        }
        return null;
      });
  },

  list({ pageSize = 200, page = 0 } = {}) {
    const skip = Number(pageSize * page);
    return this.find({})
      .sort({ createdDate: -1 })
      .skip(+skip)
      .limit(+pageSize)
      .lean()
      .exec();
  },

  countAll() {
    return this.count({})
      .lean()
      .exec();
  }

};

/**
 * @typedef Task
 */
export default mongoose.model('Task', TaskSchema);
