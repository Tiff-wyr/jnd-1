import request from './request'

// phone &vipType &month &businessType
export function getQrCode(params) {
  return request({
    url: '/WX/createNative',
    method: 'post',
    params
  })
}

export function getQrCodeUrl(code_url) {
  const params = {
    code_url
  }
  return request({
    url: '/WX/qr_codeImg',
    method: 'post',
    params
  })
}

export function checkPayStatus(uniqueId) {
  const params = {
    uniqueId
  }
  return request({
    url: '/WX/queryPayStatus',
    method: 'get',
    params
  })
}

export function updateBaseStatus(params) {
  return request({
    url: '/WX/update',
    method: 'post',
    params
  })
}
