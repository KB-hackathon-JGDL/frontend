import { defineStore } from 'pinia'
import type { SupportItem } from '@/types/support'
import { supportsMock } from '@/mocks/supports'

export const useSupportStore = defineStore('support', {
  state: () => ({
    items: [] as SupportItem[],
    loaded: false,
  }),
  actions: {
    loadMock() {
      if (this.loaded) return
      this.items = supportsMock
      this.loaded = true
    },
  },
  getters: {
    latest: (s) => (n = 2) =>
      [...s.items].sort((a,b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ).slice(0, n),
  },
})
