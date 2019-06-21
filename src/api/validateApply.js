import request from './request'

export function publics(phone) { // 检查当天该用户是否在公共申请
  return request({
    url: '/orderAll/getOrderByBTP/' + phone,
    method: 'get'
  })
}

export function agent(phone, brokerId) { // 检查当天该用户是否在该经纪人下申请过
  const params = {
    phone,
    brokerId
  }
  return request({
    url: '/orderAll/getOrderByBTBid',
    method: 'get',
    params
  })
}
export function organ(phone, agencyId) { // 检查当天该用户是否在该机构下申请过
  const params = {
    phone,
    agencyId
  }
  return request({
    url: '/orderAll/getOrderByBTAid',
    method: 'get',
    params
  })
}