import axios from 'axios'

const apiConfig = axios.create({
  baseURL: 'https://vue-course-api.hexschool.io/api/tomtravel/',
  // headers: {
  //   'X-Client-Version': '0.1.1'
  // }
})

apiConfig.interceptors.request.use(function (config) {
  if (window.localStorage.getItem('token')) {
    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

apiConfig.interceptors.response.use((data) => {
  return data
}, (err) => {
  window.localStorage.setItem('error-code', err.response.status)
  if (err.response.status === 418 && err.response.data.error_code) {
    window.localStorage.setItem('error-code', err.response.data.error_code)
  }
  return Promise.reject(err)
})

export default apiConfig
