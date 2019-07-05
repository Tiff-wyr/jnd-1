import request from './request'

export function fetchAgent() {
  return request({
    url: '/userBroker/getIndex8',
    method: 'get'
  })
}

export function fetchSpecial() {
  return request({
    url: '/product/indexSpecialRecommend',
    method: 'get'
  })
}

export function fetchProduct() {
  return request({
    url: '/product/indexProRecommend',
    method: 'get'
  })
}
