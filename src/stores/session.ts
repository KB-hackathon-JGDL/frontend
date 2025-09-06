import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Session } from '@/types/mentoring'
import mockSessions from '@/mocks/sessions'

export const useSessionStore = defineStore('session', () => {
  const sessions = ref<Session[]>([])
  const isLoading = ref(false)

  const upcoming = computed(() =>
    sessions.value
      .filter(s => s.status === 'scheduled')
      .sort((a, b) => +new Date(a.datetime) - +new Date(b.datetime))
  )
  const completed = computed(() =>
    sessions.value
      .filter(s => s.status === 'completed')
      .sort((a, b) => +new Date(b.datetime) - +new Date(a.datetime))
  )

  async function fetchMySessions() {
    isLoading.value = true
    try {
      const res = await fetch('/api/sessions?role=mentee')
      sessions.value = (await res.json()) as Session[]
    } finally {
      isLoading.value = false
    }
  }

  function loadMock() {
    sessions.value = mockSessions as unknown as Session[]
  }

  function getById(id: string) {
    return sessions.value.find(s => s.id === id)
  }

  function completeSession(id: string) {
    const s = getById(id)
    if (s && s.status !== 'completed') s.status = 'completed'
  }

  function cleanupSessions(retentionDays = 60) {
    const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000
    sessions.value = sessions.value.filter(s => {
      if (s.status === 'scheduled') return true
      const end = new Date(s.datetime).getTime() + 60 * 60000
      return end >= cutoff
    })
  }

  return {
    sessions,
    upcoming,
    completed,
    isLoading,
    fetchMySessions,
    loadMock,
    getById,
    completeSession,
    cleanupSessions,
  }
})
