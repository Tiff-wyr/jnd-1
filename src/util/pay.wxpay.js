import { createA } from './util'
import { getQrCode, checkPayStatus } from '@/api/pay.wxpay'

export function checkWxPayRusult(orderSn, success, fail) { // 检查支付结果
  checkPayStatus(orderSn).then(res => {
    // eslint-disable-next-line eqeqeq
    if (res.data.status == 200) { // 支付成功
      if (success) {
        success(res)
      }
    } else {
      if (fail) {
        fail(res)
      }
    }
  })
}
export function getQrCodes(params, callback) {
  getQrCode(params).then(res => {
    const urlCode = res.data.data.urlCode
    const out_trade_no = res.data.data.out_trade_no
    const wxMoney = res.data.data.free
    sessionStorage.setItem('uniqueId', out_trade_no)
    sessionStorage.setItem('code_url', urlCode)
    sessionStorage.setItem('wxMoney', wxMoney)
    if (callback) {
      callback(res)
    }
    if (params.upVipType === undefined) {
      createA(`/weixin?uniqueId=${out_trade_no}&phone=${params.phone}&vipType=${params.vipType}&month=${params.month}&businessType=${params.businessType}`)
    } else {
      createA(`/weixin?uniqueId=${out_trade_no}&phone=${params.phone}&vipType=${params.vipType}&month=${params.month}&businessType=${params.businessType}&upVipType=${params.upVipType}`)
    }
  })
}

export function reviewWxPay(orderSn, params) {
  if (params.upVipType === undefined) {
    createA(`/weixin?uniqueId=${orderSn}&phone=${params.phone}&vipType=${params.vipType}&month=${params.month}&businessType=${params.businessType}`)
  } else {
    createA(`/weixin?uniqueId=${orderSn}&phone=${params.phone}&vipType=${params.vipType}&month=${params.month}&businessType=${params.businessType}&upVipType=${params.upVipType}`)
  }
}
