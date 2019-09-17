import request from './request'

const getListApi = {
  getPageBorrowerByBrokerIdUnPaid(params) { // get location
    return request({
      url: '/brokerResource/getPageBorrowerByBrokerIdUnPaid',
      method: 'get',
      params
    })
  },
  seleteBorByCon(data) { // get location
    const params = {
      ...data
    }
    return request({
      url: '/agencyResource/seleteBorByCon',
      method: 'post',
      params
    })
  }
}
export default getListApi
