import { defineStore } from 'pinia'
import { ref, computed, shallowRef } from 'vue'
// 선택: socket.io 쓰는 경우
// import { io, type Socket } from 'socket.io-client'
import type { ChatMessage } from '@/types/chat' // sender: 'user' | 'bot'

type Role = 'mentee' | 'mentor'

export const useChatStore = defineStore('chat', () => {
  // 세션ID별 메시지
  const bySession = ref<Record<string, ChatMessage[]>>({})
  // const socket = shallowRef<Socket | null>(null)

  const ensure = (sid: string) => {
    if (!bySession.value[sid]) bySession.value[sid] = []
  }

  const messages = (sid: string) =>
    computed(() => bySession.value[sid] ?? [])

  // --- 목(로컬) 히스토리 불러오기 ---
  async function loadHistory(sid: string) {
    ensure(sid)
    // 서버 붙이면: const data = await fetch(`/api/sessions/${sid}/messages`).then(r=>r.json())
    const key = `chat:${sid}`
    const raw = localStorage.getItem(key)
    bySession.value[sid] = raw ? JSON.parse(raw) : []
  }

  function persist(sid: string) {
    localStorage.setItem(`chat:${sid}`, JSON.stringify(bySession.value[sid] ?? []))
  }

  function pushLocal(sid: string, msg: ChatMessage) {
    ensure(sid)
    bySession.value[sid].push(msg)
    persist(sid)
  }

  // --- 전송(로컬 목) ---
  function sendLocal(sid: string, text: string, role: Role) {
    const m: ChatMessage = {
      id: crypto.randomUUID(),
      content: text,
      sender: role === 'mentee' ? 'user' : 'bot',
      timestamp: new Date()
    }
    pushLocal(sid, m)
  }

  return {
    messages, loadHistory, sendLocal, pushLocal,
    // connect, send, disconnect
  }
})
