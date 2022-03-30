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
import { createVitePlugins } from './vite/plugin';


function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}


export default ({ command, mode }:ConfigEnv) : UserConfig=>{
  const root = process.cwd();
  const env = loadEnv(mode, root)
  return {
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
        // {
        //   find: /#\//,
        //   replacement: pathResolve('types') + '/',
        // },
      ],
    },
    server: {
      port: 9527,
      host: true,
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/dev-api': {
          target: 'http://192.168.30.240:8080',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, '')
        }
      },
    },
    // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
    // plugins: createVitePlugins(viteEnv, isBuild),
    plugins: createVitePlugins(env, command === 'build'),
  }
}