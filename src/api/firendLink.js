import request from './request'

export function fetchFirendLink() {
  return request({
    url: '/friendLink/getAll',
    method: 'get'
  })
}
