// 'use strict'
// module.exports = {
//   NODE_ENV: '"production"',
// 	ENV_CONFIG: '"prod"',
//   BASE_URI: '"https://www.9nengdai.com/"'
// }

const target = process.env.npm_lifecycle_event;
let obj;
if (target == 'test') {
  //测试服
  obj = {
    NODE_ENV: '"test"',
    BASE_URI: '"http://192.168.0.109:8082"'
  }
} else {
  //正式服
  obj = {
    NODE_ENV: '"production"',
    BASE_URI: '"https://www.9nengdai.com"'
  }
}

module.exports = obj;