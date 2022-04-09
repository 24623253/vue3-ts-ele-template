import { defineStore } from "pinia";
import { store } from "@/store";
import Cookies from 'js-cookie'

// TODO: any 类型待解决

interface AppType {
  sidebar: any,
  device: string,
  size: string
}

export const useAppStore = defineStore({
  id: 'app',

  state: (): AppType => ({
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    size: Cookies.get('size') || 'Default'
  }),

  actions: {

    ToggleSideBar(){
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', '1')
      } else {
        Cookies.set('sidebarStatus', '0')
      }
    },

    CloseSideBar({ withoutAnimation }: any){
      Cookies.set('sidebarStatus', '0')
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },

    ToggleDevice(device: string){
      this.device = device
    },

    SetSize(size: string){
      this.size = size
      Cookies.set('size', size)
    }

  }

})

export function useAppStoreOut() {
  return useAppStore(store);
}