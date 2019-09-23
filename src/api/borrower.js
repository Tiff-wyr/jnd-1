import request from './request'

export function updateApplyStatus(params) {
  return request({
    url: '/order/modifyOrderStatus',
    method: 'post',
    params
  })
}
