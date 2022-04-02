import axios, { AxiosRequestConfig } from 'axios'
import {
  ElNotification,
  ElMessageBox,
  ElMessage,
  ElLoading,
} from 'element-plus'
import errorCode from '@/utils/errorCode'

// import { getToken } from '@/utils/auth'

let isReloginShow: Boolean

export const request = (options: Object) => {
  return new Promise((resolve, reject) => {
    console.log(options)

    // create an axios instance
    const service = axios.create({
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      //
      // baseURL: process.env.BASE_API, // api 的 base_url
      baseURL: import.meta.env.VITE_APP_BASE_API,
      // baseURL: '/api',
      timeout: 80000, // request timeout
    })

    // request interceptor
    service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        console.log('request')

        // 是否需要设置 token
        const isToken = (config.headers || {}).isToken === false
        // 是否需要防止数据重复提交
        const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
        // if (getToken() && !isToken) {
        // config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        // }
        config.headers['Authorization'] = 'Bearer ' + 'asdasd' // 让每个请求携带自定义token 请根据实际情况自行修改

        return config
      },
      (error) => {
        // Do something with request error
        console.log('出错啦', error) // for debug
        Promise.reject(error)
      }
    )

    // response interceptor
    // service.interceptors.response.use(
    //   response => {
    //     return response.data
    //   },
    //   error => {
    //     console.log('err' + error) // for debug
    //     if(error.response.status == 403){
    //       ElMessage.error('错了')
    //     }else{
    //       ElMessage.error('服务器请求错误，请稍后再试')
    //     }
    //     return Promise.reject(error)
    //   }
    // )
    // 响应拦截器
    service.interceptors.response.use(
      (res: any) => {
        console.log('response')

        // 未设置状态码则默认成功状态
				// interface codeType {
				// 	readonly [index: number]: string;
				// }
				// interface errorCode {
				// 	'401'?: string|Number;
				// 	'403'?: string|Number;
				// 	'404'?: string|Number;
				// 	'default'?: string|Number;
				// }
        const code = res.data.code || 200
        // 获取错误信息
				// @ts-ignore(使用suppressImplicitAnyIndexErrors是一种相当激进的方法。建议改用@ts-ignore注释)
        const msg = errorCode[code] || res.data.msg || errorCode['default']
        // 二进制数据则直接返回
        if (
          res.request.responseType === 'blob' ||
          res.request.responseType === 'arraybuffer'
        ) {
          return res.data
        }
        if (code === 401) {
          if (!isReloginShow) {
            isReloginShow = true
            ElMessageBox.confirm(
              '登录状态已过期，您可以继续留在该页面，或者重新登录',
              '系统提示',
              {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning',
              }
            )
              .then(() => {
                isReloginShow = false
                console.log('如果是登录页面不需要重新加载')

                // store.dispatch('LogOut').then(() => {
                //   // 如果是登录页面不需要重新加载
                //   if (window.location.hash.indexOf("#/login") != 0) {
                //     location.href = '/index';
                //   }
                // })
              })
              .catch(() => {
                isReloginShow = false
              })
          }
          return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
          ElMessage({
            message: msg,
            type: 'error',
          })
          return Promise.reject(new Error(msg))
        } else if (code !== 200) {
          ElNotification.error({
            title: msg,
          })
          return Promise.reject('error')
        } else {
          console.log(res.data)
          return Promise.resolve(res.data)
        }
      },
      (error: any) => {
        console.log('err' + error)
        let { message } = error
        if (message == 'Network Error') {
          message = '后端接口连接异常'
        } else if (message.includes('timeout')) {
          message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
          message = '系统接口' + message.substr(message.length - 3) + '异常'
        }
        ElMessage({
          message: message,
          type: 'error',
          duration: 5 * 1000,
        })
        return Promise.reject(error)
      }
    )
    // 请求处理
    service(options)
      .then((res) => {
        console.log(res)
        resolve(res)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}

export default request
