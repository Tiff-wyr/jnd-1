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

export function sendPhoneCode(phone) {
  return request({
    url: `base/getUpdatePhoneCode/${phone}`,
    method: 'get'
  })
}
