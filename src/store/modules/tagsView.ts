import { defineStore } from "pinia";
import { store } from "@/store";

interface TagesViewType {
  visitedViews: Array<any>
  cachedViews: Array<any>
}

export const useTagsView = defineStore({
  id: 'app-tages-view',

  state: (): TagesViewType => ({
    visitedViews: [],
    cachedViews: []
  }),

  actions: {

    addView(view: any){
      this.addVisitedView(view)
      this.addCachedView(view)
    },

    addVisitedView(view: any){
      if (this.visitedViews.some(v => v.path === view.path)) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    },

    addCachedView(view: any){
      if (this.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
        this.cachedViews.push(view.name)
      }
    },

    delView(view: any){
      return new Promise(resolve => {
        // dispatch('delVisitedView', view)
        // dispatch('delCachedView', view)
        this.delVisitedView(view)
        this.delCachedView(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },

    delVisitedView(view: any){
      return new Promise(resolve => {
        // commit('DEL_VISITED_VIEW', view)
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1)
            break
          }
        }
        resolve([...this.visitedViews])
      })
    },

    delCachedView(view: any){
      return new Promise(resolve => {
        // commit('DEL_CACHED_VIEW', view)
        const index = this.cachedViews.indexOf(view.name)
        index > -1 && this.cachedViews.splice(index, 1)
        resolve([...this.cachedViews])
      })
    },

    delOthersViews(view: any){
      return new Promise(resolve => {
        // dispatch('delOthersVisitedViews', view)
        // dispatch('delOthersCachedViews', view)
        this.delOthersVisitedViews(view)
        this.delOthersVisitedViews(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },

    delOthersVisitedViews(view: any){
      return new Promise(resolve => {
        this.visitedViews = this.visitedViews.filter(v => {
          return v.meta.affix || v.path === view.path
        })
        resolve([...this.visitedViews])
      })
    },

    delOthersCachedViews(view: any){
      return new Promise(resolve => {
        // commit('DEL_OTHERS_CACHED_VIEWS', view)
        const index = this.cachedViews.indexOf(view.name)
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1)
        } else {
          this.cachedViews = []
        }
        resolve([...this.cachedViews])
      })
    },

    delAllViews(view: any){
      return new Promise(resolve => {
        // dispatch('delAllVisitedViews', view)
        // dispatch('delAllCachedViews', view)
        this.delAllVisitedViews(view)
        this.delAllCachedViews(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },

    delAllVisitedViews(view: any){
      return new Promise(resolve => {
        // commit('DEL_ALL_VISITED_VIEWS')
        // keep affix tags
        const affixTags = this.visitedViews.filter(tag => tag.meta.affix)
        this.visitedViews = affixTags
        resolve([...this.visitedViews])
      })
    },

    delAllCachedViews(view: any){
      return new Promise(resolve => {
        // commit('DEL_ALL_CACHED_VIEWS')
        this.cachedViews = []
        resolve([...this.cachedViews])
      })
    },

    updateVisitedView(view: any){
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },

    delRightTags(view: any){
      return new Promise(resolve => {
        // commit('DEL_RIGHT_VIEWS', view)
        const index = this.visitedViews.findIndex(v => v.path === view.path)
        if (index === -1) {
          return
        }
        this.visitedViews = this.visitedViews.filter((item, idx) => {
          if (idx <= index || (item.meta && item.meta.affix)) {
            return true
          }
          const i = this.cachedViews.indexOf(item.name)
          if (i > -1) {
            this.cachedViews.splice(i, 1)
          }
          return false
        })
        resolve([...this.visitedViews])
      })
    },

    delLeftTags(view: any){
      return new Promise(resolve => {
        // commit('DEL_LEFT_VIEWS', view)
        const index = this.visitedViews.findIndex(v => v.path === view.path)
        if (index === -1) {
          return
        }
        this.visitedViews = this.visitedViews.filter((item, idx) => {
          if (idx >= index || (item.meta && item.meta.affix)) {
            return true
          }
          const i = this.cachedViews.indexOf(item.name)
          if (i > -1) {
            this.cachedViews.splice(i, 1)
          }
          return false
        })
        resolve([...this.visitedViews])
      })
    }

  }

})
