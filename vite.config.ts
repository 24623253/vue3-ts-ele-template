// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })

import vue from '@vitejs/plugin-vue'
import type { UserConfig, ConfigEnv } from 'vite'
import  { loadEnv } from 'vite'
import { resolve } from 'path';
import createVitePlugins from './vite/plugin';
console.log(createVitePlugins);


function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}


export default ({ command, mode }:ConfigEnv) : UserConfig=>{
  const root = process.cwd();
  const env = loadEnv(mode, root)
  return {
    plugins: createVitePlugins(env, command === 'build'),
    base: '/',
    root,
    resolve:{
      alias: [
        // @/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']  // 省略后缀
    },
    server: {
      port: 9527,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/dev-api': {
          // target: 'http://192.168.30.201:8101',
          target: 'http://192.168.20.16:8080', // 徐超
          // target: 'http://192.168.30.67:8101', //卜嵇成
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, '')
        }
      },
    }
    // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
    // plugins: createVitePlugins(viteEnv, isBuild),
  }
}