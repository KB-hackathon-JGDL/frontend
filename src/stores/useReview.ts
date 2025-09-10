import { defineStore } from 'pinia'

export const useReviewStore = defineStore('review', {
  state: () => ({
    selected: [] as string[],
  }),
  getters: {
    isValid: (s) => s.selected.length >= 1 && s.selected.length <= 3,
  },
  actions: {
    toggle(keyword: string) {
      if (this.selected.includes(keyword)) {
        this.selected = this.selected.filter(k => k !== keyword)
        return
      }
      if (this.selected.length >= 3) return
      this.selected.push(keyword)
    },
    reset() { this.selected = [] }
  }
})
