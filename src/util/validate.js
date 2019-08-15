/**
 * @returns {Boolean}
 */
/**
 *
 * @param {string|number} val
 */
export function validaterPhone(val) {
  const reg = /^1[3578][\d]{9}$/
  return reg.test(val)
}

export function validaterLoanAmount(val) {
  const reg = /^[1-9]\d*$/
  return reg.test(val)
}

export function validaterInt(val) {
  const reg = /^\d*$/
  return reg.test(val)
}

export function validaterInter(val) {
  const reg = /^[1-9]\d*$/
  return reg.test(val)
}
export function validaterFloat(val) {
  const reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
  return reg.test(val)
}
/**
 * @param {string} val
 */
export function validatrerPassword(val) {
  const reg = /^[a-zA-Z]+\d+[a-zA-Z\d]+$/
  return reg.test(val) && val.length > 5 && val.length < 19
}

/**
 * @param {string} name
 */
export function validaterName(name) {
  const reg = /^[\u4e00-\u9fa5_]{1,}$/
  return reg.test(name)
}

export function validaterOragnName(name) {
  const reg = /^[\u4e00-\u9fa5_a-zA-Z]{1,}$/
  return reg.test(name)
}

/**
 * @param {string} email
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

export function validPassword(val) {
  const reg = /^[a-zA-Z]\d{5,17}/
  return reg.test(val)
}
