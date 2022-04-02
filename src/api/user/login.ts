// import { request } from '@/utils/request'
import request from '@/utils/https'

// 登录方法
// export function login(username, password, code, uuid) {
  export function login(data:object) {
  // const data = {
  //   username,
  //   password,
  //   code,
  //   uuid
  // }
  return request({
    url: '/login',
    headers: {
      isToken: 'false'
    },
    method: 'post',
    data: data
  })
}

// // 注册方法
// export function register(data) {
//   return request({
//     url: '/register',
//     headers: {
//       isToken: false
//     },
//     method: 'post',
//     data: data
//   })
// }

// // 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// // 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
// export function getCodeImg(log) {
//   console.log(log,'<<<<<<<<<<<<getCodeImg')
//   return request({
//     url: '/captchaImage',
//     headers: {
//       isToken: false
//     },
//     method: 'get',
//     timeout: 20000
//   })
// }

// export function getCodeImg(params) {
//   console.log(params,'<<<<<<<<<<<<getCodeImg')
//   return request({
//     url: '/captchaImage',
//     headers: {
//       isToken: false
//     },
//     method: 'get',
//     params
//   })
// }
interface ParamsType {
  id: number
}
export const getCodeImg = (params: ParamsType) => {
  return request({
    url: '/captchaImage',
    method: 'get',
    params,
    headers: {
      isToken: 'false'
    },
  })
}
