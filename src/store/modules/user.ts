import type { UserInfo } from '#/store';
import { defineStore } from 'pinia';
import { RoleEnum } from '@/enums/roleEnum';
import { store } from '@/store'
import { login, logout, getInfo } from '@/api/user/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import defAva from '@/assets/images/profile.jpg'
import { Fn } from '@vueuse/core';
const menuManager: {
  domList: Element[];
  resolve: Fn;
} = {
  domList: [],
  resolve: () => {},
};
interface UserState {
  // userInfo: Nullable<UserInfo>;
  // userInfo?: object | null;
  // token?: string;
  // roleList: RoleEnum[];
  // sessionTimeout?: boolean;
  // lastUpdateTime: number;
  token?: string
  name?: string
  avatar?: string
  roles: Array<any>
  permissions: Array<any>
  testNum: number
}

interface UserForm {
  username?:string
  password?:string
  code?:string|number
  uuid?:string|number
}

export const useUserStore = defineStore({
  id: 'app-user',

	state: (): UserState =>({
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    testNum: 0
	}),

	getters: {
    getUserToken(): string {
      return this.token || ''
    },
    getUserName(): string {
      return this.name || ''
    },
    getAvatar(): string {
      return this.avatar || ''
    },
    getRoles(): RoleEnum[] {
      return this.roles.length > 0 ? this.roles : []
    },
    getPermissions(): Array<any> {
      return this.permissions.length > 0 ? this.permissions : []
    },
    getTestNum(): number {
      return this.testNum
    },
	},

  actions: {
    // setToken(info: string | undefined) {
    //   this.token = info ? info : ''; // for null or undefined value
    // },
    // 登录
    login(userForm: object){
      // const username = userForm.username!.trim()
      // const password = userForm.password
      // const code = userForm.code
      // const uuid = userForm.uuid
      return new Promise((resolve, reject) => {
        login(userForm).then(res => {
          setToken(res.token)
          // commit('SET_TOKEN', res.token)
          this.token = res.token
          console.log(this.token)
          console.log(res.token)
          resolve('')
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo(){
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const user = res.user
          const avatar = user.avatar == "" ? defAva : import.meta.env.VITE_APP_BASE_API + user.avatar;
         
          if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            this.roles = res.roles
            this.permissions = res.permissions
          } else {
            this.roles = ["ROLE_DEFAULT"]
          }
          this.name = res.name
          this.avatar = avatar
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut() {
      return new Promise((resolve, reject) => {
        // const token = this.token
        logout().then(() => {
          this.token = ''
          this.roles = []
          this.permissions = []
          removeToken()
          resolve('')
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    // 测试
    addTestNum(num: number){
      this.testNum += num
      console.log(this.testNum,num);
    }

  }

})

export function useUserStoreOut() {
  return useUserStore(store);
}