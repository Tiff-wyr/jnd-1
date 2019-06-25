
import request from './request'

export function registerAccount(params) {
  return request({
    url: '/userBroker/registerUserBroker',
    method: 'post',
    params
  })
}

export function fetchProvince() {
  return request({
    url: '/city/getAllProvincial',
    method: 'get'
  })
}

export function fetchCity(id) {
  return request({
    url: '/city/getAllCity/' + id,
    method: 'get'
  })
}
