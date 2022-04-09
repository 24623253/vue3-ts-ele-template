import { useSettingsStore } from '@/store/modules/settings'
import defaultSettings from '@/settings'

/**
 * 动态修改标题
 */
export function useDynamicTitle() {
  if (useSettingsStore().dynamicTitle) {
    document.title = useSettingsStore().title + ' - ' + defaultSettings.title;
  } else {
    document.title = defaultSettings.title + '';
  }
}