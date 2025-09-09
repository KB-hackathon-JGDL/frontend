import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ChatMessage } from '@/types/chat'

type Role = 'mentee' | 'mentor'

const PREFIX = 'chat:'
const RETENTION_DAYS = 60

function isExpired(tsISO: string, days = RETENTION_DAYS) {
  const ageMs = Date.now() - new Date(tsISO).getTime()
  return ageMs > days * 24 * 60 * 60 * 1000
}

function safeArray(a: any): ChatMessage[] {
  if (!Array.isArray(a)) return []
  return a.filter((m: any) =>
    m &&
    typeof m.id === 'string' &&
    typeof m.content === 'string' &&
    (m.sender === 'user' || m.sender === 'bot' || m.sender === 'system') &&
    typeof m.timestamp === 'string'
  )
}

export const useChatStore = defineStore('chat', () => {
  const bySession = ref<Record<string, ChatMessage[]>>({})

  const ensure = (sid: string) => {
    if (!bySession.value[sid]) bySession.value[sid] = []
  }

  const messages = (sid: string) =>
    computed(() => bySession.value[sid] ?? [])

  async function loadHistory(sid: string) {
    ensure(sid)
    const key = PREFIX + sid
    try {
      const raw = localStorage.getItem(key)
      const parsed = raw ? JSON.parse(raw) : []
      const trimmed = safeArray(parsed).filter(m => !isExpired(m.timestamp))
      bySession.value[sid] = trimmed
      if (trimmed.length !== parsed.length) {
        localStorage.setItem(key, JSON.stringify(trimmed))
      }
    } catch {
      bySession.value[sid] = []
      localStorage.removeItem(key)
    }
  }

  function persist(sid: string) {
    localStorage.setItem(PREFIX + sid, JSON.stringify(bySession.value[sid] ?? []))
  }

  function pushLocal(sid: string, msg: ChatMessage) {
    ensure(sid)
    bySession.value[sid].push(msg)
    persist(sid)
  }

  function sendLocal(sid: string, text: string, role: Role) {
    const msg: ChatMessage = {
      id: (crypto as any).randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2),
      content: text,
      sender: role === 'mentee' ? 'user' : 'bot',
      timestamp: new Date().toISOString(),
    }
    pushLocal(sid, msg)
  }

  function addSystem(sid: string, text: string) {
    pushLocal(sid, {
      id: (crypto as any).randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2),
      content: text,
      sender: 'system',
      timestamp: new Date().toISOString(),
    })
  }

  function cleanupAll(days = RETENTION_DAYS) {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(PREFIX))
    for (const k of keys) {
      const raw = localStorage.getItem(k)
      if (!raw) continue
      let parsed: any
      try { parsed = JSON.parse(raw) } catch { localStorage.removeItem(k); continue }
      const trimmed = safeArray(parsed).filter(m => !isExpired(m.timestamp, days))
      if (trimmed.length !== parsed.length) {
        localStorage.setItem(k, JSON.stringify(trimmed))
      }
    }
  }
  function startSync(sid: string) {
    const key = PREFIX + sid
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return
      loadHistory(sid)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }

  return {
    messages, loadHistory, sendLocal, pushLocal, addSystem, cleanupAll,
    startSync,
  }
})