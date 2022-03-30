 
import axios, {AxiosRequestConfig}from 'axios'
import { ElMessage  } from 'element-plus'
// import { getToken } from '@/utils/auth'
 
 
export  const request =(options:any)=> {
  return new Promise((resolve, reject) => {
 
    // create an axios instance
    const service = axios.create({
      headers: {'Content-Type': 'application/json;charset=utf-8'},

      baseURL: process.env.BASE_API, // api 的 base_url
      // baseURL: '/api',
      timeout: 80000 // request timeout
    })
 
    // request interceptor
    service.interceptors.request.use(
      (config:AxiosRequestConfig) => {
        // 是否需要设置 token
        const isToken = (config.headers || {}).isToken === false
        // 是否需要防止数据重复提交
        const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
        if (getToken() && !isToken) {
          config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
      
        return config
      },
      error => {
        // Do something with request error
        console.log("出错啦", error) // for debug
        Promise.reject(error)
      }
    )
 
    // response interceptor
    service.interceptors.response.use(
      response => {
        return response.data
      },
      error => {
        console.log('err' + error) // for debug
        if(error.response.status == 403){
          ElMessage.error('错了')
        }else{
          ElMessage.error('服务器请求错误，请稍后再试')
        }
        return Promise.reject(error)
      }
    )
    // 请求处理
    service(options)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
 
 
export default request