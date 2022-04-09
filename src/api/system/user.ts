import request from '@/utils/https'

// 用户头像上传
export function uploadAvatar(data: object) {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    data
  })
}

// 修改用户个人信息
export function updateUserProfile(data: object) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword: string, newPassword: string) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/system/user/profile',
    method: 'get'
  })
}