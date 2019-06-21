import request from './request'
export function fetchList(params) {
  return request({
    url: `/information/getList`,
    method: 'post',
    params
  })
}

export function fetchDetail(id) {
  return request({
    url: `/information/getInformationById/${id}`,
    method: 'get'
  })
}

export function addNum(id) {
  return request({
    url: '/information/addViewNumber/' + id,
    method: 'get'
  })
}
