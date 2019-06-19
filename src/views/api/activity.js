import request from './request'
export function getGetStatus(phone) {
  return request({
    url: `/brokerActivity/getVerify/${phone}/2019-06-13`,
    method: 'post'
  })
}

export function getGift(phone) {
  return request({
    url: `/brokerActivity/getGift/${phone}/2019-06-13`,
    method: 'post'
  })
}
