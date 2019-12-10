import request from './request'

export function fetchCodeByLogin(phone, code) {
  return request({
    url: `/base/getLoginCode/${phone}`,
    method: 'get',
    params: {
      code
    }
  })
}
export function checkPhoneStatus(phone) {
  return request({
    url: `/user/selectPhone/${phone}`,
    method: 'get'
  })
}
