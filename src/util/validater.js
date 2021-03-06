/**
 * Created by Administrator on 2019/1/11 0011.
 */
const validater = {
  // 手机号码校验
  phoneNumber(rule, value, callback) {
    value = value.trim()
    if (value && (!(/^[1][3456789]\d{9}$/).test(value) || !(/^[1-9]\d*$/).test(value) || value.length !== 11)) {
      callback(new Error('手机号码不符合规范'))
    } else {
      callback()
    }
  },
  // 邮箱校验
  emailValue(rule, value, callback) {
    value = value.trim()
    const temp = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/
    if (value && (!(temp).test(value))) {
      callback(new Error('邮箱格式不符合规范'))
    } else {
      callback()
    }
  },
  // 身份证号码校验
  idCard(rule, value, callback) {
    if (value) {
      value = value.trim()
    }
    if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
      callback(new Error('身份证号码不符合规范'))
    } else {
      callback()
    }
  },

  // 贷款金额校验
  loanAmountValidator(rule, value, callback) {
    const reg = /^[1-9]\d*$/
    value = value.trim()
    if (value && !reg.test(value)) {
      callback(new Error('贷款金额格式错误'))
    } else {
      callback()
    }
  },
  validateRate(val) { // Verify the interest rate
    const reg = /^\d+(\.(?!.*0$)\d{1,2})?$/
    return reg.test(val)
  }
}
export default validater
