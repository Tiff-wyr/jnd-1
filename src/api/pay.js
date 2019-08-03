import request from './request'

const aliPay = {
  getOrderSn(phone) {
    return request({
      url: '/orderUtil/getUniqueId/' + phone,
      method: 'get'
    })
  },
  putOrder(params) {
    return request({
      url: '/alipay/pay',
      method: 'post',
      params
    })
  },
  checkPayResult(orderSn) {
    return request({
      url: '/vip/checkPayResult/' + orderSn,
      method: 'get'
    })
  }
}
export default aliPay
