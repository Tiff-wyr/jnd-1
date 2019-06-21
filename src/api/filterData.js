import request from './request'

const api = {
  /**
   * wxf
   */
  getProvice() {
    return request({
      url: '/city/getAllProvincial',
      method: 'get'
    })
  },
  getCity(id) {
    return request({
      url: '/city/getAllCity/' + id,
      method: 'get'
    })
  },
  getAllIsPawn() { // 是否有抵押物
    return request({
      url: '/isPawn/getAllIsPawn',
      method: 'get'
    })
  },
  getAllPawn() { // 抵押物
    return request({
      url: '/pawn/getAllPawn',
      method: 'get'
    })
  },
  getMoney() { // 贷款金额
    return request({
      url: '/get/getAmount',
      method: 'get'
    })
  },
  getType() { // 贷款类型（业务类型）
    return request({
      url: '/get/getType',
      method: 'get'
    })
  },
  getAllAgeArea() { // 年龄范围
    return request({
      url: '/age/getAllAgeArea',
      method: 'get'
    })
  },
  getJob() { // 职位
    return request({
      url: '/get/getJob',
      method: 'get'
    })
  },
  getIncome() { // 收入范围
    return request({
      url: '/get/getIncome',
      method: 'get'
    })
  }
}
export default api