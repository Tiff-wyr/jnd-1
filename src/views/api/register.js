
import request from './request'

export function registerAccount(params) {
  return request({
    url: '/userBroker/registerUserBroker',
    method: 'post',
    params
  })
}
