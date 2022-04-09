<template>
  <div>
    <el-dropdown trigger="click" @command="handleSetSize">
      <div class="size-icon--style">
        <svg-icon class-name="size-icon" icon-class="size" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size === item.value" :command="item.value">
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { useAppStore } from '@/store/modules/app'
import { useTagsView } from '@/store/modules/tagsView'

const appStore = useAppStore();
const tagsViewStore = useTagsView();
const size = computed(() => appStore.size);
const route = useRoute();
const router = useRouter();
const {proxy} = getCurrentInstance();
const sizeOptions = ref([
  { label: 'Large', value: 'large' },
  { label: 'Default', value: 'Default' },
  { label: 'Small', value: 'small' },
])

function refreshView() {
  // In order to make the cached page re-rendered
  // store.dispatch('tagsView/delAllCachedViews', route)
  tagsViewStore.delAllCachedViews(route)
  const { fullPath } = route

  nextTick(() => {
    router.replace({
      path: '/redirect' + fullPath
    })
  })
}
function handleSetSize(size) {
  proxy.$ELEMENT.size = size;
  // store.dispatch('app/setSize', size)
  appStore.SetSize(size)
  refreshView()
  ElMessage({
    message: 'Switch Size Success',
    type: 'success'
  })
};
</script>

<style lang='scss' scoped>
.size-icon--style {
  font-size: 18px;
  line-height: 50px;
  padding-right: 7px;
}
</style>