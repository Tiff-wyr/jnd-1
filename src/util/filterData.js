/**
 * 格式化数据
 */
export function formData(array, options) {
  const defaultOptions = {
    key: 'label',
    value: 'value'
  }
  return array.map(item => {
    const obj = {}
    if (options) {
      obj[options['key']] = item.label
      obj[options['value']] = item.value
    } else {
      obj[defaultOptions['key']] = item.label
      obj[defaultOptions['value']] = item.value
    }
    return obj
  })
}
/**
 * 使用期限列表
 */
export function useTimeList() {
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

/**
 * 贷款人贷款金额
 */
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
    { id: 8, label: '其他', value: '' }
  ]
  return loanAmountOptions
}

/**
 * 贷款人金额范围（删选）
 */
export function loanQuotaList() {
  const loanQuotaOptions = [
    { id: 0, label: '不限' },
    { id: 1, label: '0 ~ 5万' },
    { id: 2, label: '5 ~ 10万' },
    { id: 3, label: '10 ~ 50万' },
    { id: 4, label: '50 ~ 200万' },
    { id: 5, label: '200万以上' }
  ]
  return loanQuotaOptions
}

/**
 * 贷款类型
 */
export function loanTypeList() {
  const loanTypeOptions = [
    { id: 0, label: '不限' },
    { id: 1, label: '信用贷' },
    { id: 2, label: '抵押贷' }
  ]
  return loanTypeOptions
}

/**
 * 业务类型
 */
export function businessTypeList() {
  const businessTypeOptions = [
    { id: 0, label: '不限' },
    { id: 1, label: '个人贷款' },
    { id: 2, label: '企业贷款' }
  ]
  return businessTypeOptions
}

export function loanRateList() {
  const loanRateOptions = [
    { id: 0, label: '不限' },
    { id: 1, label: '0 ~ 0.5%' },
    { id: 2, label: '0.5 ~ 1%' },
    { id: 3, label: '1 ~ 2%' },
    { id: 4, label: '2%以上' }
  ]
  return loanRateOptions
}

/**
 * 贷款条件
 */
export function loanConList() {
  const loanConOptions = [
    { id: 0, label: '不限' },
    { id: 1, label: '有营业执照' },
    { id: 2, label: '有商业保险' },
    { id: 3, label: '有社保' },
    { id: 4, label: '有公积金' },
    { id: 5, label: '有打卡工资' },
    { id: 6, label: '有车' },
    { id: 7, label: '有房' },
    { id: 8, label: '有信用卡' },
    { id: 9, label: '有芝麻信用' }
  ]
  return loanConOptions
}

/**
 * 贷款人申请贷款 ———— 贷款时间
 */
export function loanTimeList() {
  const loanTimeOptions = [
    { id: 1, label: '3个月' },
    { id: 2, label: '6个月' },
    { id: 3, label: '12个月' },
    { id: 4, label: '2年' },
    { id: 5, label: '3年' },
    { id: 6, label: '5年' },
    { id: 7, label: '10年' },
    { id: 8, label: '20年' }
  ]
  return loanTimeOptions
}

/**
 * 贷款期限范围
 */
export function loanTimeScopeList() {
  const loanTimeOptions = [
    { id: 0, label: '不限' },
    { id: 1, label: '1 ~ 3年' },
    { id: 2, label: '3 ~ 5年' },
    { id: 3, label: '5 ~ 10年' },
    { id: 4, label: '10 ~ 20年' },
    { id: 5, label: '20年以上' }
  ]
  return loanTimeOptions
}

/**
 * 职业类型
 */
export function jobTypeList() {
  const jobTypeOptions = [
    { id: 0, label: '不限' },
    { id: 1, label: '上班族' },
    { id: 2, label: '公务员/事业单位' },
    { id: 3, label: '企业主' },
    { id: 4, label: '个体户' },
    { id: 5, label: '自由职业者' }
  ]
  return jobTypeOptions
}
/**
 * 月收入
 */
export function monthInComeList() {
  const monthInComeOptions = [
    { id: 1, label: '1000~3000元' },
    { id: 2, label: '3000~5000元' },
    { id: 3, label: '5000~10000元' },
    { id: 4, label: '10000~20000元' },
    { id: 5, label: '20000~50000元' },
    { id: 6, label: '50000元以上' }
  ]
  return monthInComeOptions
}

/**
 * 名下房产情况
 */
export function houseStatusList() {
  const houseStatusOptions = [
    { id: 1, label: '无房' },
    { id: 2, label: '按揭房' },
    { id: 3, label: '全款房' }
  ]
  return houseStatusOptions
}

/**
 * 名下车辆情况
 */
export function carStatusListList() {
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

/**
 * 社保选项
 */
export function socialProtectList() {
  const socialProtectOptions = [
    { id: 1, label: '无' },
    { id: 2, label: '有' }
  ]
  return socialProtectOptions
}

/**
 * 公积金选项
 */
export function gongjijinList() {
  const gongjijinOptions = [
    { id: 1, label: '无' },
    { id: 2, label: '有' }
  ]
  return gongjijinOptions
}

/**
 * 芝麻信用分选项
 */
export function zhimaList() {
  const zhimaOptions = [
    { id: 1, label: '无' },
    { id: 2, label: '有' }
  ]
  return zhimaOptions
}

export function creditList() {
  const creditOptions = [
    { id: 1, label: '无信用卡或贷款' },
    { id: 2, label: '信用良好无逾期' },
    { id: 3, label: '少量逾期' },
    { id: 4, label: '多次逾期' },
    { id: 5, label: '当前逾期' },
    { id: 6, label: '超过90天逾期' }
  ]
  return creditOptions
}
