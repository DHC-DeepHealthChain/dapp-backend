'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
var envVarsSchema = _joi2.default.object({
  NODE_ENV: _joi2.default.string().allow(['development', 'production', 'test', 'provision']).default('development'),
  PORT: _joi2.default.number().default(4040),
  MONGOOSE_DEBUG: _joi2.default.boolean().when('NODE_ENV', {
    is: _joi2.default.string().equal('development'),
    then: _joi2.default.boolean().default(true),
    otherwise: _joi2.default.boolean().default(false)
  }),
  JWT_SECRET: _joi2.default.string().required().description('JWT Secret required to sign'),
  MONGO_HOST: _joi2.default.string().required().description('Mongo DB host url'),
  MONGO_PORT: _joi2.default.number().default(27017)
}).unknown().required();

var _Joi$validate = _joi2.default.validate(process.env, envVarsSchema),
    error = _Joi$validate.error,
    envVars = _Joi$validate.value;

if (error) {
  throw new Error('Config validation error: ' + error.message);
}
console.log(envVars.PORT);
var config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  },
  web3Provider: envVars.LOCAL_NODE_URL,
  coinbase: envVars.COINBASE,
  coinbasePass: envVars.COINBASEPASS,
  inviteCodeValidCount: 10,
  appPath: 'https://test-ddk-hd1-test.oss-cn-hangzhou.aliyuncs.com/healthBao/1525336622.png'
};

exports.default = config;
//# sourceMappingURL=config.js.map
