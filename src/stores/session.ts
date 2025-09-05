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

  // ✅ 추가: id로 세션 하나 찾기
  function getById(id: string): Session | undefined {
    return sessions.value.find(s => s.id === id)
  }

  // ⬇️ getById를 export에 포함시키는 것 잊지 않기!
  return {
    sessions,
    upcoming,
    completed,
    isLoading,
    fetchMySessions,
    loadMock,
    getById,              // ✅
  }
})
