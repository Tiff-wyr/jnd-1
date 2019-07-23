import request from './request'
export function fetchParent() {
  return request({
    url: `/aboutPlatform/getFatherAll`,
    method: 'get'
  })
}
export function fetchSon(params) {
  return request({
    url: `/aboutPlatform/getSonByFatherId`,
    method: 'get',
    params
  })
}
export function fetchDetail(id) {
  const params = {
    id
  }
  return request({
    url: `/aboutPlatform/getSonById`,
    method: 'get',
    params
  })
}
