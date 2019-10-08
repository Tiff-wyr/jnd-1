import request from './request'

export function saveNotLoginProductOrder(params) { // 找产品， 未登录状态，快速申请
  /**
   * @params { Object } params - No login status, apply for loan parameters
   * @params { string } params.productId - Id of applicant
   * @params { string } params.borrowerName - Name of applicant
   * @params { number } params.sex - Sex of applicant 1 man 0 women
   * @params { address1 } params.address1 - Applicant`s region(province)
   * @params { address2 } params.address2 - Applicant`s region(city)
   * @params { phone } params.phone - Phone of applicant.
   * @params { code } params.code - This is message authentication code.
   */
  return request({
    url: '/orderAll/saveNotLoginProductOrder',
    method: 'post',
    params
  })
}

export function applyLoanByNoLogin(params) {
  return request({
    url: '/orderAll/saveNoLoginOrder',
    method: 'post',
    params
  })
}

export function validPhoneIsRegister(phone) {
  return request({
    url: '/user/selectPhone/' + phone,
    method: 'get'
  })
}

/**
 * 申请贷款发送验证码
 * @param {*} phone
 *
 */
export function sendPhoneCode(phone) {
  return request({
    url: `base/getUpdatePhoneCode/${phone}`,
    method: 'get'
  })
}

export function validateRegister(phone) { // 检测手机号是否注册
  return request({
    url: '/user/checkUserByPhone/' + phone,
    method: 'get'
  })
}

/**
 * 检测是否可以申请贷款
 * @param {String} phone
 */
export function validIfApply(phone) {
  return request({
    url: `/user/checkUserIsNotBorrower/${phone}`,
    method: 'get'
  })
}

/**
 * 检测验证码是否有效
 * @param {String} phone
 * @param {String} code
 */
export function valideCode(phone, code) {
  return request({
    url: `/base/checkPhoneAndCode/${phone}/${code}`,
    method: 'get'
  })
}

/**
 * 详情页面注册
 * @param {Object} params
 */
export function applyRegister(data) {
  const param = new FormData()
  for (const i in data) {
    param.append(i, data[i])
  }
  return request({
    url: '/userBorrower/registerBorrower1',
    method: 'post',
    data: param
  })
}

// 注册之后进行信息完善
export function modifyInfo(params) {
  return request({
    url: '/userBorrower/modify1',
    method: 'post',
    params
  })
}

// 申请贷款，保存订单信息
export function saveOrder(params) {
  return request({
    url: '/order/save',
    method: 'post',
    params
  })
}

// 获取贷款人个人信息
export function getUserInfo(phone) {
  return request({
    url: `/userBorrower/getUserBorrowerByPhone/${phone}`,
    method: 'get'
  })
}

// 贷款人修改个人信息
export function updateUserInfo(data) {
  const param = new FormData()
  console.log(data)
  for (const i in data) {
    param.append(i, data[i])
  }
  return request({
    url: '/userBorrower/modifyUserBorrowerByPhone',
    method: 'post',
    data: param
  })
}
