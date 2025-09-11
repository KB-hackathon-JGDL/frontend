import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchAvailability, saveAvailability, type AvailabilityPayload } from '@/api/mentor'

export const useAvailabilityStore = defineStore('availability', () => {
  const map = ref<Record<string, Set<string>>>({})

  function ensure(dateKey: string) {
    if (!map.value[dateKey]) map.value[dateKey] = new Set<string>()
  }

  function toggle(dateKey: string, time: string) {
    ensure(dateKey)
    const s = map.value[dateKey]
    s.has(time) ? s.delete(time) : s.add(time)
    map.value = { ...map.value }
  }

  function timesOf(dateKey: string) {
    ensure(dateKey)
    return map.value[dateKey]
  }

  function setFromBackend(windows: { date: string; times: string[] }[]) {
    const m: Record<string, Set<string>> = {}
    for (const w of windows) m[w.date] = new Set(w.times)
    map.value = m
  }

  function toPayload(mentorId: string): AvailabilityPayload {
    const windows = Object.entries(map.value)
      .filter(([_, set]) => set.size > 0)
      .map(([date, set]) => ({ date, times: Array.from(set).sort() }))
    return { mentorId, timezone: 'Asia/Seoul', windows }
  }

  async function load(mentorId: string) {
    const data = await fetchAvailability(mentorId)
    if (data?.windows) setFromBackend(data.windows)
  }

  async function save(mentorId: string) {
    const payload = toPayload(mentorId)
    return await saveAvailability(mentorId, payload)
  }

  return { map, toggle, timesOf, setFromBackend, toPayload, load, save }
})
