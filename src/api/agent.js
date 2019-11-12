import request from './request'
/**
 * 获取信贷经理成功案例
 * @param {String | Number} brokerId 信贷经理ID
 */
export function fetchSuccessList(brokerId) {
  return request({
    url: `/order/getTopSixOrderByBrokerId/${brokerId}`,
    method: 'get'
  })
}

/**
 * 获取信贷经理未付费资源
 */
export function fetchNoPayResource(params) {
  return request({
    url: `/brokerResource/getPageBorrowerByBrokerIdUnPaid`,
    method: 'get',
    params
  })
}

export function fetchPayResource(params) {
  return request({
    url: `/brokerResource/getPageBorrowerByBrokerIdUnPaid`,
    method: 'get',
    params
  })
}

export function getBorDetail(orderId) {
  return request({
    url: `/order/getOrderByOrderId/${orderId}`,
    method: 'get'
  })
}
