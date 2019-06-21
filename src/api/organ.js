import request from './request'
export function getCountByAgencyId(id) {
  return request({
    url: '/product/getCountByAgencyId/' + id,
    method: 'get'
  })
}
export function getResourceCenList(params) {
  return request({
    url: '/agencyResource/seleteBorByCondition',
    method: 'get',
    params
  })
}