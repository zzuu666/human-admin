import axios from 'axios'
import jwtDecoded from 'jwt-decode'

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

/**
 * set localStorage
 * @param {*} key
 * @param {*} value
 */
export function setStorage (key, value) {
  localStorage.setItem(key, value)
}

export function getAuthorization () {
  return localStorage.getItem('token') || ''
}

export function removeAuthorization () {
  localStorage.removeItem('token')
}

export function getJWTDecode () {
  let decode
  try {
    decode = jwtDecoded(getAuthorization())
  } catch (e) {
    decode = null
  }
  return decode
}
/**
 * AJAX 请求封装函数
 * @param {string} url 请求路径
 * @param {object} payload 请求参数
 * @param {function} success 成功回调函数
 * @param {function} error 失败请求函数
 */
export function fetch (url, method, payload, success, error) {
  axios({
    method: method,
    url: url,
    data: payload,
    headers: {
      'Authorization': 'JWT ' + getAuthorization()
    }
  }).then(
    success
  ).catch(
    error
  )
}

export function messageOptions (id, type, vm) {
  let auth = getJWTDecode()
  fetch(`human/message/${type}/${id}`, 'put', {}, (data) => {
    if (!data.error) {
      vm.$store.dispatch('getMessageList', {
        id: auth.user_id
      })
    }
  })
}

export function messageSend (payload, vm) {
  let auth = getJWTDecode()
  console.log(payload)
  fetch('human/message/send', 'post', payload, (data) => {
    if (!data.error) {
      vm.$store.dispatch('getMessageList', {
        id: auth.user_id
      })
    } else {
      vm.$Message.warning('操作异常')
    }
  }, () => {
    vm.$Message.warning('操作异常')
  })
}

/**
 * 计算两日期之间天数
 * @param {string} start 开始日期格式 y-m-d
 * @param {*} end 结束日期格式 y-m-d
 */
export function dateDiff (start, end) {
  let startArr = start.split('-')
  let endArr = end.split('-')
  let startValue = (new Date(startArr[0], startArr[1] - 1, startArr[2])).valueOf()
  let endValue = (new Date(endArr[0], endArr[1] - 1, endArr[2])).valueOf()

  return (endValue - startValue) / 1000 / 60 / 60 / 24
}

