import axios from 'axios'
import router from '@/router'

 

const service = axios.create({
  baseURL: '/api',
  timeout: 60000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'token': ''
  }
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  (response) => {
    console.log(response)
    // 400登录失效
    if (response.data.code === 400) {
      console.log(router)
      router.push({name:'login'})
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service