import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      mobileNumber: Joi.string().required(),
      password: Joi.string().required(),
      sex: Joi.string().required(),
      height: Joi.number().required(),
      weight: Joi.number().required(),
      age: Joi.string().required(),
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      type: Joi.string().required(),
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // Reset Password /api/users/resetPassword
  resetPassword: {
    body: {
      mobileNumber: Joi.string().required(),
      password: Joi.string().required(),
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      mobileNumber: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  thirdLogin: {
    body: {
      code: Joi.string().required(),
      type: Joi.string().required(),
    }
  },

   // POST /api/ipfs
  createIpfs: {
    body: {
      username: Joi.string().required(),
      hash: Joi.string().required(),
    }
  },
  uploadContent: {
    body: {
      documentHash: Joi.string().required(),
      fileName: Joi.string().required(),
      fileType: Joi.string().required(),
      password: Joi.string().required(),
    }
  },
  // POST /api/account
  createAccount: {
    body: {
      username: Joi.string().required(),
      address: Joi.string().required(),
    }
  },


   // POST /api/healthPlan
  createHealthPlan: {
    body: {
      name: Joi.string().required(),
      cycleDay: Joi.number().required(),
      content: Joi.string().required(),
      introduce: Joi.string().required(),
      listImg: Joi.string().required(),
      item: Joi.string().required(),
    }
  },
   // POST /api/healthPlan
  createHealthPlanItem: {
    body: {
      planId: Joi.string().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
      step: Joi.number().required()
    }
  },

   // POST /api/exams
  createExams: {
    body: {
      name: Joi.string().required(),
      introduce: Joi.string().required(),
      listImg: Joi.string().required(),
      answerNum: Joi.number().required(),
    }
  },
 // POST /api/exams/questions
  createQuestions: {
    body: {
      name: Joi.string().required(),
      orderNum: Joi.number().required(),
      type: Joi.string().required(),
      examId: Joi.string().required(),
    }
  },
  // POST /api/items/questions
  createItems: {
    body: {
      name: Joi.string().required(),
      orderNum: Joi.number().required(),
      questionId: Joi.string().required(),
    }
  },
};
