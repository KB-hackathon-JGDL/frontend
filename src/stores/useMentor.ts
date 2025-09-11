import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mentors as mockMentors, availability as mockAvail } from '@/mocks/mentors'
import type { Mentor, Availability } from '@/types/mentoring'

export const useMentorStore = defineStore('mentor', () => {
  const list  = ref<Mentor[]>([])
  const avail = ref<Record<string, Availability>>({})

  function loadMock() {
    if (!list.value.length) list.value = mockMentors
    if (!Object.keys(avail.value).length) avail.value = mockAvail
  }

  const all = computed(() => list.value)
  const getById = (id: string) => list.value.find(m => m.id === id)

  const slotsByDate = (id: string, dateKey: string) =>
    avail.value[id]?.[dateKey] ?? []

  const getAvailability = (id: string) => avail.value[id] ?? {}
  const getDates = (id: string) =>
    Object.keys(getAvailability(id)).sort((a, b) => a.localeCompare(b))
  const getTimes = (id: string, date: string) =>
    (getAvailability(id)[date] ?? []).slice()

  return { all, loadMock, getById, slotsByDate, getAvailability, getDates, getTimes }
})
