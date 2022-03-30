import vue from '@vitejs/plugin-vue'

export  function createVitePlugins(viteEnv:any, isBuild = false) {
  const vitePlugins = [vue()]
  return vitePlugins
}