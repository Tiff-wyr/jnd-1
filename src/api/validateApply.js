import request from './request'

export function agent(phone, brokerId) { // 检查当天该用户是否在该信贷经理下申请过
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
