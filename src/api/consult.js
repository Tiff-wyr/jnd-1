import request from './request'

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

export function upDownArticle(id) {
  return request({
    url: '/information/upDownInformation/' + id,
    method: 'get'
  })
}

export function fetchUp(id) {
  const params = {
    id
  }
  return request({
    url: '/information/getUpList',
    method: 'get',
    params
  })
}

export function fetchDown() {
  return request({
    url: '/information/getDownList',
    method: 'get'
  })
}

export function fetchAtricle(params) {
  return request({
    url: `/information/getUpList2`,
    method: 'get',
    params
  })
}

export function viewTop9Article() {
  return request({
    url: '/information/getTop9',
    method: 'get'
  })
}

export function getNewArticle() {
  return request({
    url: '/information/getTop9Latest',
    method: 'get'
  })
}
