import http from './http'

export type AvailabilityWindow = { date: string; times: string[] }
export type AvailabilityPayload = {
  mentorId: string
  timezone: string
  windows: AvailabilityWindow[]
}

export async function fetchAvailability(mentorId: string) {
  const { data } = await http.get(`/mentors/${mentorId}/availability`)
  return data as { windows: AvailabilityWindow[] } | null
}

export async function saveAvailability(mentorId: string, payload: AvailabilityPayload) {
  const { data } = await http.put(`/mentors/${mentorId}/availability`, payload)
  return data
}
