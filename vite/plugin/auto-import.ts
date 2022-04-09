import AutoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
  return AutoImport({
    imports: [
      'vue',
      'vue-router'
      // {
      //   vuex: ['useStore'],
      // },
    ],
    // dts: false,
    dts: './auto-import.d.ts'
  })
}
