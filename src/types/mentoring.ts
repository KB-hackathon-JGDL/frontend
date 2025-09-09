export type SessionStatus = 'scheduled' | 'completed' | 'canceled'

export interface Mentor {
  id: string
  name: string
  photoUrl?: string
  company?: string
  role?: string 
  certifications?: string[]
  tags?: string[]
  tagline?: string 
}

export interface Session {
  id: string
  mentor: Mentor
  turnCurrent: number
  datetime: string // ISO
  status: SessionStatus
  card?: {
    goal?: string
    context?: string
    questions?: string[]
  }
}
