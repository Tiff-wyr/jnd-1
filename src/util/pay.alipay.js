import { createA } from './util'
import { getOrderSn, checkPayResult, getMemberData } from '@/api/pay.alipay'
// var timer = null
export function checkAliPayRusult(orderSn, success, fail) { // 检查支付结果
  checkPayResult(orderSn).then(res => {
    if (res.data.status == 200) { // 支付成功
      if (success) {
        success(res)
      }
    } else {
      if (fail) {
        fail(res)
      }
    }
  });
}
export function createAliPayOrderSn(params, callback) {
  getOrderSn(params.phone).then(res => {
    const orderSn = res.request.response;
    if (params.vipType == 0) {
      createA(`#/aliPay?uniqueId=${orderSn}&phone=${params.phone}&vipType=${params.vipType}&businessType=${params.businessType}`);
    } else if (params.upVipType === undefined) {
      createA(`#/aliPay?uniqueId=${orderSn}&phone=${params.phone}&vipType=${params.vipType}&month=${params.month}&businessType=${params.businessType}`);
    } else {
      createA(`#/aliPay?uniqueId=${orderSn}&phone=${params.phone}&vipType=${params.vipType}&month=${params.month}&businessType=${params.businessType}&upVipType=${params.upVipType}`);
    }
    
    if (callback) {
      callback(res)
    }
  });
}

export function reviewAliPay(orderSn, params) {
  if (params.vipType == 0) {
    createA(`#/aliPay?uniqueId=${orderSn}&phone=${params.phone}&vipType=${params.vipType}&businessType=${params.businessType}`);
  } else if (params.upVipType === undefined) {
    createA(`#/aliPay?uniqueId=${orderSn}&phone=${params.phone}&vipType=${params.vipType}&month=${params.month}&businessType=${params.businessType}`);
  } else {
    createA(`#/aliPay?uniqueId=${orderSn}&phone=${params.phone}&vipType=${params.vipType}&month=${params.month}&businessType=${params.businessType}&upVipType=${params.upVipType}`);
  }
  // timer = setInterval(() => {
  //   checkAliPayRusult(orderSn)
  // }, 6000);
}

export function getMemberDatas(businessType, phone, callback) {
  getMemberData(businessType, phone).then(res => {
    callback(res)
  })
}