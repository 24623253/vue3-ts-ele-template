import type { UserInfo } from '#/store';
import { defineStore } from 'pinia';
import { RoleEnum } from '@/enums/roleEnum';
import { store } from '@/store'
import { login, logout, getInfo } from '@/api/user/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import defAva from '@/assets/images/profile.jpg'

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
  roles: RoleEnum[]
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
    login(userForm: object){
      // const username = userForm.username!.trim()
      // const password = userForm.password
      // const code = userForm.code
      // const uuid = userForm.uuid
      return new Promise((resolve: any, reject) => {
        login(userForm).then(res => {
          setToken(res.token)
          // commit('SET_TOKEN', res.token)
          this.token = res.token
          console.log(this.token)
          console.log(res.token)
          debugger
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    addTestNum(num: number){
      this.testNum += num
      console.log(this.testNum,num);
      
    }

  }

})

export function useUserStoreWithOut() {
  return useUserStore(store);
}