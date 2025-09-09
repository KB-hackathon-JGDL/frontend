import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mentors as mockMentors, availability as mockAvail } from '@/mocks/mentors'
import type { Mentor, Availability } from '@/types/mentoring' // 타입은 types에서 가져오는 걸 추천

export const useMentorStore = defineStore('mentor', () => {
  const list  = ref<Mentor[]>([])
  const avail = ref<Record<string, Availability>>({})

  function loadMock() {
    if (!list.value.length) list.value = mockMentors
    if (!Object.keys(avail.value).length) avail.value = mockAvail
  }

  const all = computed(() => list.value)
  const getById = (id: string) => list.value.find(m => m.id === id)

  // 날짜별 슬롯(그대로 유지)
  const slotsByDate = (id: string, dateKey: string) =>
    avail.value[id]?.[dateKey] ?? []

  // ✅ 예약 뷰에서 쓰기 좋은 헬퍼 추가
  const getAvailability = (id: string) => avail.value[id] ?? {}
  const getDates = (id: string) =>
    Object.keys(getAvailability(id)).sort((a, b) => a.localeCompare(b))
  const getTimes = (id: string, date: string) =>
    (getAvailability(id)[date] ?? []).slice()

  return { all, loadMock, getById, slotsByDate, getAvailability, getDates, getTimes }
})
