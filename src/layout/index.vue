<template>
  <div :class="classObj" class="app-wrapper" :style="{ '--current-color': theme }">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar @setLayout="setLayout" />
        <TagsView v-if="needTagsView" />
      </div>
      <AppMain />
      <!-- TODO: -->
      <!-- <settings ref="settingRef" /> -->
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useAppStore } from '@/store/modules/app'
import { useSettingsStore } from '@/store/modules/settings'
import { useWindowSize } from '@vueuse/core'
import Sidebar from './components/Sidebar'
import { AppMain, Navbar, Settings, TagsView } from './components'
import defaultSettings from '@/settings'
import { computed,ref,watchEffect  } from '@vue/runtime-core'
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const theme = computed(() => '#409EFF');
// const theme = computed(() => store.state.settings.theme);
// const sideTheme = computed(() => store.state.settings.sideTheme);
const sidebar = computed(() => appStore.sidebar);
const device = computed(() => appStore.device);
const needTagsView = computed(() => settingsStore.tagsView);
const fixedHeader = computed(() => settingsStore.fixedHeader);

const classObj = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  openSidebar: sidebar.value.opened,
  withoutAnimation: sidebar.value.withoutAnimation,
  mobile: device.value === 'mobile'
}))

const { width, height } = useWindowSize();
const WIDTH = 992; // refer to Bootstrap's responsive design

watchEffect(() => {
  if (device.value === 'mobile' && sidebar.value.opened) {
    // store.dispatch('app/closeSideBar', { withoutAnimation: false })
    appStore.CloseSideBar({ withoutAnimation: false })
  }
  if (width.value - 1 < WIDTH) {
    appStore.ToggleDevice('mobile')
    appStore.CloseSideBar({ withoutAnimation: true })

    // store.dispatch('app/toggleDevice', 'mobile')
    // store.dispatch('app/closeSideBar', { withoutAnimation: true })
  } else {
    appStore.ToggleDevice('desktop')

    // store.dispatch('app/toggleDevice', 'desktop')
  }
})

function handleClickOutside() {
  appStore.CloseSideBar({ withoutAnimation: false })

  // store.dispatch('app/closeSideBar', { withoutAnimation: false })
}

const settingRef = ref<any>(null);
function setLayout() {
  settingRef.value.openSetting();
}
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/mixin.scss";
  @import "@/assets/styles/variables.module.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$base-sidebar-width});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>