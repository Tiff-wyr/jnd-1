import request from './request'

const detailApi = {
  checkIfPay(agencyId, borId) {
    const params = {
      agencyId,
      borId
    }
    return request({
      url: '/agencyResource/seleteStateById',
      method: 'post',
      params
    })
  },
  checkAgentIfPay(brokerId, borrowerId) {
    return request({
      url: `/brokerResource/getBrokerResource/${brokerId}/${borrowerId}`,
      method: 'get'
    })
  },
  getAngentList(params) {
    return request({
      url: '/solr/xcxSolrNoHighLight',
      method: 'get',
      params
    })
  },
  getUserDetail(params) {
    return request({
      url: '/userBorrower/getBorrower',
      method: 'post',
      params
    })
  }
}
export default detailApi