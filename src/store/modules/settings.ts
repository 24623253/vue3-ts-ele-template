import { defineStore } from 'pinia';
import { useDynamicTitle } from '@/utils/dynamicTitle'
import { LocalStorageService } from '@/utils/storage'
import { store } from '@/store'
import defaultSettings from '@/settings'
const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings

const storageSetting = LocalStorageService.get('layout-setting') || ''


interface settingsState {
  title?: string|null
  theme?: string
  sideTheme?: string
  sidebarLogo?: string
  tagsView?: string
  topNav?: string
  fixedHeader?: string
  dynamicTitle: string|undefined
}

export const useSettingsStore = defineStore({

  id:'app-settings',

  state: (): settingsState =>({
    title: '',
    theme: storageSetting.theme || '#409EFF',
    sideTheme: storageSetting.sideTheme || sideTheme,
    sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
    tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
    topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
    fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
    dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle
  }),

  getters:{
    getTitle() :string|null|undefined {
      return this.title || ''
    }
  },

  actions: {
    // 设置网页标题
    setTitle(title:string) {
      this.title = title
      useDynamicTitle();
    }
  }

})

export function useSettingsStoreOut() {
  return useSettingsStore(store);
}