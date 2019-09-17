export function carStatusListOptions() {
  const carStatusListOptions = [
    {
      id: 1,
      label: '无车准备买车'
    }, {
      id: 2,
      label: '按揭车'
    }, {
      id: 3,
      label: '全款车'
    }
  ]
  return carStatusListOptions
}

export function loanAmountList() {
  const loanAmountOptions = [
    { id: 0, label: '0.3万元', value: 0.3 },
    { id: 1, label: '1万元', value: 1 },
    { id: 2, label: '5万元', value: 5 },
    { id: 3, label: '10万元', value: 10 },
    { id: 4, label: '20万元', value: 20 },
    { id: 5, label: '50万元', value: 50 },
    { id: 6, label: '100万元', value: 100 },
    { id: 7, label: '500万元', value: 500 },
    { id: 8, label: '其他', value: 0 }
  ]
  return loanAmountOptions
}

export function loanTimeList() {
  const loanTimeOptions = [
    { id: 1, label: '3个月' },
    { id: 2, label: '6个月' },
    { id: 3, label: '12个月' },
    { id: 4, label: '2年' },
    { id: 5, label: '3年' },
    { id: 6, label: '5年' },
    { id: 7, label: '10年' }
  ]
  return loanTimeOptions
}

export function jobTypeList() {
  const jobTypeOptions =  [
    { id: '', label: '不限' },
    { id: 1, label: '私企职员' },
    { id: 2, label: '国企职员' },
    { id: 3, label: '公务员/事业单位职员' },
    { id: 4, label: '个体工商户' },
    { id: 5, label: '小微企业主' },
    { id: 6, label: '自由职业/求职中' }
  ]
  return jobTypeOptions
}

export function monthInComeList() {
  const monthInComeOptions =  [
    { id: 1, label: '1000~3000元' },
    { id: 2, label: '3000~5000元' },
    { id: 3, label: '5000~10000元' },
    { id: 4, label: '10000~20000元' },
    { id: 5, label: '20000~50000元' },
    { id: 6, label: '50000元以上' }
  ]
  return monthInComeOptions
}

export function houseStatusList() {
  const houseStatusOptions = [
    { id: 1, label: '无房' },
    { id: 2, label: '按揭房' },
    { id: 3, label: '全款房' }
  ]
  return houseStatusOptions
}

export function creditList() {
  const creditOptions = [
    { id: '', label: '请选择' },
    { id: 1, label: '无信用卡或贷款' },
    { id: 2, label: '信用良好无逾期' },
    { id: 3, label: '少量逾期' },
    { id: 4, label: '多次逾期' },
    { id: 5, label: '当前逾期' },
    { id: 6, label: '超过90天逾期' }
  ]
  return creditOptions
}