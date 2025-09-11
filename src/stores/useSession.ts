import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Session, MentoringReservationDTO, ChatStatus } from '@/types/mentoring'
import { mentoringApi } from '@/api/api'
import mockSessions from '@/mocks/sessions'
// ✅ 목데이터 import
import reservationsMock from '@/mocks/reservations'
import completedSessionsMock from '@/mocks/endchat.ts'

export const useSessionStore = defineStore('session', () => {
  const sessions = ref<Session[]>([])
  const reservations = ref<MentoringReservationDTO[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

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

  const upcomingReservations = computed(() =>
    reservations.value
      .filter(r => r.chatStatus === 'PENDING' || r.chatStatus === 'ACTIVE')
      .map(reservationToSession)
      .sort((a, b) => +new Date(a.datetime) - +new Date(b.datetime))
  )

  const completedReservations = computed(() =>
    reservations.value
      .filter(r => r.chatStatus === 'COMPLETED')
      .map(reservationToSession)
      .sort((a, b) => +new Date(b.datetime) - +new Date(a.datetime))
  )

  function reservationToSession(reservation: MentoringReservationDTO): Session {
    let datetime: string
    try {
      const dateStr = reservation.mentoringDate
      const timeNum = reservation.mentoringTime

      if (!dateStr || (timeNum === undefined || timeNum === null)) {
        datetime = new Date().toISOString()
      } else {
        const hh = String(timeNum).padStart(2, '0')
        const combined = `${dateStr}T${hh}:00:00`
        const d = new Date(combined)
        datetime = isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString()
      }
    } catch {
      datetime = new Date().toISOString()
    }

    return {
      id: reservation.mentoringReservationId,
      mentor: {
        id: reservation.mentorUserId,
        name: reservation.name,
        photoUrl: reservation.photoUrl ?? 'https://placehold.co/64x64?text=M',
      },
      turnCurrent: 1,
      datetime,
      status: chatStatusToSessionStatus(reservation.chatStatus),
      card: reservation.consultationCard ? { context: reservation.consultationCard } : undefined,
    }
  }

  function chatStatusToSessionStatus(chatStatus: ChatStatus): 'scheduled' | 'completed' | 'canceled' {
    switch (chatStatus) {
      case 'PENDING':
      case 'ACTIVE': return 'scheduled'
      case 'COMPLETED': return 'completed'
      default: return 'canceled'
    }
  }

  
function loadMockReservations() {
  reservations.value = reservationsMock
  sessions.value = completedSessionsMock as unknown as Session[]
}

  // =======================
  // API Actions
  // =======================
  async function fetchReservations(mentorId?: string) {
    if (!mentorId) {
      reservations.value = []
      error.value = null
      return
    }
    isLoading.value = true
    error.value = null
    try {
      reservations.value = await mentoringApi.getReservationsByMentor(mentorId)
    } catch (err) {
      error.value = err instanceof Error ? err.message : '예약 목록 불러오기 실패'
      console.error('Failed to fetch reservations:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchReservation(id: string) {
    if (!id || id.trim() === '') throw new Error('예약 ID가 필요합니다.')
    try {
      const reservation = await mentoringApi.getReservation(id)
      const idx = reservations.value.findIndex(r => r.mentoringReservationId === id)
      if (idx >= 0) reservations.value[idx] = reservation
      else reservations.value.push(reservation)
      return reservation
    } catch (err) {
      error.value = err instanceof Error ? err.message : '예약 정보를 불러오는데 실패했습니다.'
      throw err
    }
  }

  // =======================
  // Mock & Utils
  // =======================
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
    const r = reservations.value.find(rr => rr.mentoringReservationId === id)
    if (r) return reservationToSession(r)
    return sessions.value.find(s => s.id === id)
  }

  function completeSession(id: string) {
    const s = sessions.value.find(s => s.id === id)
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

  function createReservationLocal(
    mentor: { id: string; name: string; photoUrl?: string },
    datetime: string
  ) {
    const newSession: Session = {
      id: `session-${Date.now()}`,
      mentor,
      turnCurrent: 1,
      datetime,
      status: 'scheduled',
    }
    sessions.value.push(newSession)
    return newSession.id
  }

  return {
    sessions,
    reservations,
    isLoading,
    error,
    upcoming,
    completed,
    upcomingReservations,
    completedReservations,
    fetchReservations,
    fetchReservation,
    fetchMySessions,
    loadMock,
    loadMockReservations, // ✅ 추가
    getById,
    completeSession,
    cleanupSessions,
    createReservationLocal,
  }
})
