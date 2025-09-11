import type { MentoringReservationDTO } from '@/types/mentoring'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

const getAuthToken = () => localStorage.getItem('accessToken') || null
const parseJsonSafe = (t: string) => { try { return JSON.parse(t) } catch { return null } }

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers })
  const text = await res.text().catch(() => '')

  if (!res.ok) {
    const body = text ? parseJsonSafe(text) ?? text : ''
    console.error(`[API] ${res.status} ${res.statusText} @ ${endpoint}`, body)
    throw new Error(`API Error: ${res.status} ${res.statusText}`)
  }
  return (text ? (parseJsonSafe(text) as T) : (null as unknown as T))
}

export type CreateScheduleInput = { mentoringTime: number; mentoringDate: string }[]
export type RequestReservationInput = { consultationCard: string; menteeUserId?: string }

export const mentoringApi = {
  // 멘토별 예약 목록 조회 (백엔드가 제공하는 확정 경로)
  getReservationsByMentor(mentorId: string) {
    if (!mentorId) return Promise.reject(new Error('mentorId is required'))
    return apiRequest<MentoringReservationDTO[]>(
      `/mentors/${encodeURIComponent(mentorId)}/mentoring-reservations`
    )
  },

  // 단건 예약
  getReservation(id: string) {
    if (!id || id.startsWith(':')) return Promise.reject(new Error('Invalid reservation id'))
    return apiRequest<MentoringReservationDTO>(
      `/mentoring-reservations/${encodeURIComponent(id)}`
    )
  },

  // 스케줄 생성(멘토)
  createSchedule(schedules: CreateScheduleInput) {
    return apiRequest<void>('/mentoring-reservations', {
      method: 'POST',
      body: JSON.stringify(schedules),
    })
  },

  // 예약 신청(멘티)
  requestReservation(reservationId: string, data: RequestReservationInput) {
    if (!reservationId) return Promise.reject(new Error('reservationId is required'))
    return apiRequest<void>(`/mentoring-reservations/${encodeURIComponent(reservationId)}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },
}
