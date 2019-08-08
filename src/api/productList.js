import request from './request'

export function fetchList(params) {
  return request({
    url: '/product/selectByConditionShengShi',
    method: 'get',
    params
  })
}

export function searchByKey(params) { // 关键字查找
  return request({
    url: '/solr/getPageProduct',
    method: 'get',
    params
  })
}
