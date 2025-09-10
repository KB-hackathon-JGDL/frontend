<script setup lang="ts">
import { ref, nextTick, onMounted, computed } from 'vue'
import ChatHeader from '@/components/chat/ChatHeader.vue'
import MessageItem from '@/components/chat/MessageItem.vue'
import MessageInput from '@/components/chat/MessageInput.vue'
import type { ChatMessage, ChatConfig } from '@/types/chat'

const props = defineProps<{ config: ChatConfig }>()
defineEmits<{ back: [] }>()

const messages = ref<ChatMessage[]>([])
const isTyping = ref(false)
const isEnded  = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

const pushBot = async (content: string, links?: string[]) => {
  messages.value.push({
    id: `${Date.now()}-bot`,
    content,
    sender: 'bot',
    timestamp: new Date(),
    links,
  })
  await nextTick(); scrollToBottom()
}

const pushUser = async (content: string) => {
  messages.value.push({
    id: `${Date.now()}-user`,
    content,
    sender: 'user',
    timestamp: new Date(),
  })
  await nextTick(); scrollToBottom()
}

const scrollToBottom = () => {
  const el = messagesContainer.value
  if (!el) return
  el.scrollTop = el.scrollHeight
}

const askApi = async (prompt: string) => {
  try {
    const res = await fetch(props.config.apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: prompt,
        history: messages.value.map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.content,
        })),
      }),
    })
    if (!res.ok) throw new Error(String(res.status))
    const data = await res.json()

    // 응답 키 방어적으로 읽기
    const text =
      data?.reply ??
      data?.answer ??
      data?.content ??
      data?.text ??
      data?.response ??
      data?.result ??
      data?.message ??
      '죄송해요, 응답을 불러올 수 없어요.'

    return { text, links: data?.links ?? undefined }
  } catch (e) {
    console.error('chat api error:', e)
    return {
      text: '죄송해요, 서버 연결이 불안정해요. 잠시 후 다시 시도해 주세요.',
      links: undefined,
    }
  }
}

const handleSendMessage = async (message: string) => {
  if (isEnded.value) return
  if (!message.trim() || isTyping.value) return
  await pushUser(message)

  isTyping.value = true
  const { text, links } = await askApi(message)
  isTyping.value = false

  await pushBot(text, links)
}

const dateLabel = computed(() => {
  const first = messages.value[0]?.timestamp ?? new Date()
  const opts: Intl.DateTimeFormatOptions = { month: 'numeric', day: 'numeric', weekday: 'long' }
  const parts = new Intl.DateTimeFormat('ko-KR', opts).formatToParts(first)
  const month = parts.find(p => p.type === 'month')?.value ?? ''
  const day = parts.find(p => p.type === 'day')?.value ?? ''
  const weekday = parts.find(p => p.type === 'weekday')?.value ?? ''
  return `${month}월 ${day}일 ${weekday}`
})

onMounted(async () => {
  await pushBot('안녕하세요! 무엇을 도와드릴까요?')
})

const handleEnd = () => {
  isEnded.value = true
}
</script>

<template>
  <div class="mx-auto bg-white flex flex-col !w-[430px] !h-[932px]">
    <ChatHeader :config="props.config" @back="$emit('back')" @end="handleEnd" />

    <div class="flex justify-center pt-5 pb-5">
      <span class="text-[12px] text-gray-600 px-3 py-1.5 rounded-full">
        {{ dateLabel }}
      </span>
    </div>

    <div ref="messagesContainer" class="flex-1 overflow-y-auto px-4 pb-3">
      <MessageItem
        v-for="m in messages"
        :key="m.id"
        :message="m"
      />

      <div v-if="isTyping" class="flex items-center gap-2.5 mb-3">
        <div class="w-7 h-7 rounded-full flex items-center justify-center">
          <svg class="w-[14px] h-[14px] text-[#4A79F6]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 2v2M7 8h10a2 2 0 012 2v4a4 4 0 01-4 4H9a4 4 0 01-4-4v-4a2 2 0 012-2z"/>
          </svg>
        </div>
        <div class="bg-gray-100 rounded-2xl rounded-tl-md px-3 py-2">
          <div class="flex gap-1.5">
            <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
            <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:.1s"></span>
            <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay:.2s"></span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isEnded" class="px-4 pb-2">
      <div class="w-full text-center text-[13px] text-gray-700 bg-gray-100 rounded-full py-2">
        상담이 종료되었습니다
      </div>
    </div>

    <MessageInput
      :placeholder="props.config.placeholder"
      :is-loading="isTyping"
      :disabled="isEnded"
      @send="handleSendMessage"
    />
  </div>
</template>
