import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'

// import { useI18n } from 'vue-i18n'
import router from '@/router'
import { RouteLocationNormalized } from 'vue-router'
import { useUserStoreOut } from './store/modules/user'
import { useSettingsStoreOut } from './store/modules/settings'
import { usePermisStoreOut } from './store/modules/permission'
import { getToken } from '@/utils/auth'
import { isHttp } from '@/utils/validate'
import { store } from './store'


// import settings from '@/config/default/setting.config'
NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register'];
// const getPageTitle = (key: string) => {
//   const i18n = useI18n()
//   const title = settings.title
//   const hasKey = i18n.te(`route.${key}`)
//   if (hasKey) {
//     const pageName = i18n.t(`route.${key}`)
//     return `${pageName} - ${title}`
//   }
//   return `${title}`
// }

const userStore = useUserStoreOut()
const settingsStore = useSettingsStoreOut()
const permisStore = usePermisStoreOut()

interface accessRoutesItemType {
	redirect: string
	path: string
	key: any
}

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => {
  NProgress.start()
  if (getToken()) {
    to.meta.title && settingsStore.setTitle(to.meta.title + '')

    if (to.path === '/login') {
      NProgress.done()
			debugger
      next({ path: '/' }) // 有token
			return
    } else {
      // 判断当前用户是否已拉取完user_info信息
      if (userStore.roles.length === 0) {
				userStore.GetInfo().then(() => {
          permisStore.generateRoutes().then((accessRoutes: any) => {
						console.log(accessRoutes)
            // 根据roles权限生成可访问的路由表
            accessRoutes.forEach((route: any) => {
              if (!isHttp(route.path)) {
                router.addRoute(route) // 动态添加可访问路由表
              }
            })
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
						return
          })
        }).catch(err => {
          userStore.LogOut().then(() => {
            ElMessage.error(err)
            next({ path: '/' })
						return
          })
        })
      } else {
        next()
				return
      }
    }
  } else {
    // 无token
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单,直接进入
      next()
			return
    } else {
      NProgress.done()
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
			return 
    }
  }
})

router.afterEach((to: RouteLocationNormalized) => {
  console.log(to)
  // Finish progress bar
  // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
  NProgress.done()

  // set page title
  // document.title = getPageTitle(to.meta.title)
})
