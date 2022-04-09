import { defineStore } from 'pinia';
import { store } from '@/store'
import { constantRoutes } from "@/router";
import { getRouters } from '@/api/system/menu'
import Layout from '@/layout/index.vue'
import ParentView from '@/components/ParentView/index.vue'
import InnerLink from '@/layout/components/InnerLink/index.vue'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

interface PermissionState {
  routes: Array<any>
  addRoutes: Array<any>,
  defaultRoutes: Array<any>,
  topbarRouters: Array<any>,
  sidebarRouters: Array<any>
}

export const usePermisStore = defineStore({
  id: 'app-permission',
  

  state: (): PermissionState => ({
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: []
  }),

  actions: {
    // 生成路由
    generateRoutes(){
      return new Promise((resolve:any) =>{
        getRouters().then(res=>{
          const sdata = JSON.parse(JSON.stringify(res.data))
          const rdata = JSON.parse(JSON.stringify(res.data))
          const defaultData = JSON.parse(JSON.stringify(res.data))
          const sidebarRoutes = filterAsyncRouter(sdata)
          const rewriteRoutes = filterAsyncRouter(rdata, false, true)
          const defaultRoutes = filterAsyncRouter(defaultData)
          this.addRoutes = rewriteRoutes
          this.routes = constantRoutes.concat(rewriteRoutes)
          this.sidebarRouters = constantRoutes.concat(sidebarRoutes)
          this.defaultRoutes = constantRoutes.concat(sidebarRoutes)
          const index = [{
            path: 'index',
            meta: { title: '统计报表', icon: 'dashboard' }
          }]
          this.topbarRouters = defaultRoutes.concat(index);
          console.log(rewriteRoutes,'<><<<<rewriteRoutes')
          resolve(rewriteRoutes)
        })
      })
    }
  }
  

})

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap: any, lastRouter = false, type = false) {
  return asyncRouterMap.filter((route: any) => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap: Array<any>, lastRouter = false) {
  var children:Array<any> = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach((c :any) => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}

export const loadView = (view: string) => {
  let res;
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0];
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
}

export function usePermisStoreOut() {
  return usePermisStore(store);
}
