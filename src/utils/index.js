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
 * POST 请求封装函数
 * @param {string} url
 * @param {object} payload
 * @param {function} success
 * @param {function} error
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

