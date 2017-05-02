import axios from 'axios'

axios.defaults.baseURL = 'http://0.0.0.0:8000/'
axios.defaults.headers.common['Authorization'] = getAuthorization()

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
/**
 * POST 请求封装函数
 * @param {string} url
 * @param {object} payload
 * @param {function} success
 * @param {function} error
 */
export function post (url, payload, success, error) {
  axios({
    method: 'post',
    url: url,
    data: payload
    // headers: {
    //   'Authorization': getAuthorization()
    // }
  }).then(
    success
  ).catch(
    error
  )
}

