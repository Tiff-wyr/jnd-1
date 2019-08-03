import request from './request'

export function getOrderSn(phone) {
  return request({
    url: '/orderUtil/getUniqueId/' + phone,
    method: 'get'
  })
}

export function aliPay(params) {
  return request({
    url: '/alipay/pay',
    method: 'post',
    params
  })
}

export function checkPayResult(orderSn) {
  return request({
    url: '/vip/checkPayResult/' + orderSn,
    method: 'get'
  })
}

export function getMember(phone) {
  return request({
    url: '/vipDetail/getVipCenter/' + phone,
    method: 'get'
  })
}

export function getMemberData(businessType, phone) {
  return request({
    url: `/paySet/getPay/${businessType}/${phone}`,
    method: 'get'
  })
}
