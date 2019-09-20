import request from './request'
export function getCountByAgencyId(id) {
  return request({
    url: '/product/getCountByAgencyId/' + id,
    method: 'get'
  })
}

// 机构资源中心列表
export function getResourceCenList(params) {
  return request({
    url: '/agencyResource/getPageBorrowerByAgencyIdUnPaid',
    method: 'get',
    params
  })
}

// 机构付费资源列表
export function getPayResource(agencyId, page, pageSize) {
  return request({
    url: `/agencyResource/getPageBorrowerByAgencyIdPaid/${agencyId}/${page}/${pageSize}`,
    method: 'get'
  })
}

/**
 * 申请记录
 * @param { Object } params
 * @param { params } brokerId
 * @param { params } agencyId
 * @param { page } page
 * @param { pageSize } pageSize
 *
 */
export function applyRecord(params) {
  return request({
    url: `/order/getPageOrderByBrokerIdOrAgencyId`,
    method: 'get',
    params
  })
}
