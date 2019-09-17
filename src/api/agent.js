import request from './request'
/**
 * 获取经纪人成功案例
 * @param {String | Number} brokerId 经纪人ID
 */
export function fetchSuccessList(brokerId) {
  return request({
    url: `/order/getTopSixOrderByBrokerId/${brokerId}`,
    method: 'get'
  })
}

/**
 * 获取经纪人未付费资源
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
