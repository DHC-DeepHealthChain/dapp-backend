'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  // POST /api/users
  createUser: {
    body: {
      mobileNumber: _joi2.default.string().required(),
      password: _joi2.default.string().required(),
      sex: _joi2.default.string().required(),
      height: _joi2.default.number().required(),
      weight: _joi2.default.number().required(),
      age: _joi2.default.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      type: _joi2.default.string().required()
    },
    params: {
      userId: _joi2.default.string().hex().required()
    }
  },

  // Reset Password /api/users/resetPassword
  resetPassword: {
    body: {
      mobileNumber: _joi2.default.string().required(),
      password: _joi2.default.string().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      mobileNumber: _joi2.default.string().required(),
      password: _joi2.default.string().required()
    }
  },

  thirdLogin: {
    body: {
      code: _joi2.default.string().required(),
      type: _joi2.default.string().required()
    }
  },

  // POST /api/ipfs
  createIpfs: {
    body: {
      username: _joi2.default.string().required(),
      hash: _joi2.default.string().required()
    }
  },
  uploadContent: {
    body: {
      documentHash: _joi2.default.string().required(),
      fileName: _joi2.default.string().required(),
      fileType: _joi2.default.string().required(),
      password: _joi2.default.string().required()
    }
  },
  // POST /api/account
  createAccount: {
    body: {
      username: _joi2.default.string().required(),
      address: _joi2.default.string().required()
    }
  },

  // POST /api/healthPlan
  createHealthPlan: {
    body: {
      name: _joi2.default.string().required(),
      cycleDay: _joi2.default.number().required(),
      content: _joi2.default.string().required(),
      introduce: _joi2.default.string().required(),
      listImg: _joi2.default.string().required(),
      item: _joi2.default.string().required()
    }
  },
  // POST /api/healthPlan
  createHealthPlanItem: {
    body: {
      planId: _joi2.default.string().required(),
      title: _joi2.default.string().required(),
      content: _joi2.default.string().required(),
      step: _joi2.default.number().required()
    }
  },

  // POST /api/exams
  createExams: {
    body: {
      name: _joi2.default.string().required(),
      introduce: _joi2.default.string().required(),
      listImg: _joi2.default.string().required(),
      answerNum: _joi2.default.number().required()
    }
  },
  // POST /api/exams/questions
  createQuestions: {
    body: {
      name: _joi2.default.string().required(),
      orderNum: _joi2.default.number().required(),
      type: _joi2.default.string().required(),
      examId: _joi2.default.string().required()
    }
  },
  // POST /api/items/questions
  createItems: {
    body: {
      name: _joi2.default.string().required(),
      orderNum: _joi2.default.number().required(),
      questionId: _joi2.default.string().required()
    }
  }
};
//# sourceMappingURL=param-validation.js.map
