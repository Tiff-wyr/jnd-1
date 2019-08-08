import request from './request'
// 贷款类型
export function fetchLoanType() {
  return request({
    url: '/get/getLoanType',
    method: 'get'
  })
}
// 业务类型
export function fetchBusinessType() {
  return request({
    url: '/get/getType',
    method: 'get'
  })
}
// 贷款额度
export function fetchAmount() {
  return request({
    url: '/get/getAmount',
    method: 'get'
  })
}

// 贷款利率
export function fetchInterest() {
  return request({
    url: '/get/getInterest',
    method: 'get'
  })
}
// 贷款期限
export function fetchLife() {
  return request({
    url: '/get/getServiceLife',
    method: 'get'
  })
}

// 贷款条件
export function fetchCondition() {
  return request({
    url: '/get/getLoanRequirements',
    method: 'get'
  })
}
