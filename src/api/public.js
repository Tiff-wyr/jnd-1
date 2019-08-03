import request from './request'

const publicApi = {
  getSession() { // 同步session
    return request({
      url: '/session/getSessionId',
      method: 'get'
    })
  },
  validateRegister(phone) { // 检测手机号是否注册
    return request({
      url: '/user/checkUserByPhone/' + phone,
      method: 'get'
    })
  },
  validateIfApply(phone) { // 判断是否是贷款人或未注册账号
    return request({
      url: `sRegisuser/selectIter/${phone}`,
      method: 'post'
    })
  },
  sendPhoneCode(phone) {
    return request({
      url: `base/getUpdatePhoneCode/${phone}`,
      method: 'get'
    })
  },
  validateAccountPwd(phone, password) {
    const params = {
      phone,
      password
    }
    return request({
      url: `/user/checkPassword`,
      method: 'post',
      params
    })
  }
}
export default publicApi
