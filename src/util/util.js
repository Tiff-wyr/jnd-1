export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function setSessoion(phone) {
  sessionStorage.setItem('phone', phone)
}
export function removeSession() {
  sessionStorage.removeItem('phone')
}

export function time() {
  const time = new Date()
  const year = time.getFullYear() // 年
  const month = time.getMonth() + 1 // 月
  const ri = time.getDate() // 日
  const hour = time.getHours() // 时
  const min = time.getMinutes() // 分
  const sec = time.getSeconds() // 秒

  return year + '-' + month + '-' + ri + hour + ':' + min + ':' + sec
}
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}
export function formatPhone(phone) {
  return phone.substr(0, 3) + '****' + phone.substr(7, 11)
}
/**
 * randomWord 产生任意长度随机字母数字组合
 * @param {*} randomFlag 是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 * @param {*} min
 * @param {*} max
 */
export function randomWord(randomFlag, min, max) {
  var str = ''
  var pos = ''
  var range = min
  var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}
export function timeToTimeStamp(time) {
  return new Date(time).getTime()
}

export function createA(url) {
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  console.log(a)
  a.click()
}

export function backTop() {
  const start = window.pageYOffset
  let i = 0
  const interval = setInterval(() => {
    const next = Math.floor(easeInOutQuad(10 * i, start, -start, 500))
    if (next <= 0) {
      window.scrollTo(0, 0)
      clearInterval(interval)
    } else {
      window.scrollTo(0, next)
    }
    i++
  }, 16.7)
  function easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b
    return -c / 2 * (--t * (t - 2) - 1) + b
  }
}
