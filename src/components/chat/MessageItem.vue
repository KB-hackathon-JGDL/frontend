<script setup lang="ts">
import { computed } from 'vue'
import { Bot } from 'lucide-vue-next'
import type { ChatMessage } from '@/types/chat'

const props = withDefaults(defineProps<{
  message: ChatMessage
  avatarUrl?: string
  /** 멘토링/챗봇 모두 지원: 지정 안 해도 동작 */
  role?: 'mentee' | 'mentor' | 'user' | 'bot'
  peerName?: string
  showTime?: boolean
}>(), {
  showTime: true,
  role: undefined,
})

const isSystem = computed(() => props.message.sender === 'system')

/** 오른쪽 정렬(내 메시지) 판별 */
const isSelf = computed(() => {
  if (isSystem.value) return false

  // 명시적으로 role을 준 경우 (user|bot)
  if (props.role === 'user') return props.message.sender === 'user'
  if (props.role === 'bot')  return props.message.sender === 'bot'

  // 멘토링 화면 규칙
  if (props.role === 'mentee') return props.message.sender === 'user'
  if (props.role === 'mentor') return props.message.sender === 'bot'

  // 기본(챗봇 등 역할 미지정): user면 내 메시지
  return props.message.sender === 'user'
})

// 시간을 “AM/PM h:mm” 로 표시
const timeText = computed(() => {
  const d = new Date(props.message.timestamp)
  const hh = d.getHours() % 12 || 12
  const mm = String(d.getMinutes()).padStart(2, '0')
  const ap = d.getHours() >= 12 ? 'PM' : 'AM'
  return `${ap} ${hh}:${mm}`
})

// URL 자동 링크
function autoLink(text: string) {
  return text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" rel="noopener" class="underline text-[#2563eb] break-all">$1</a>',
  )
}
const html = computed(() => autoLink(props.message.content || ''))
</script>

<template>
  <div v-if="isSystem" class="my-4 text-center">
    <span class="inline-block text-[12px] text-gray-600 bg-gray-100 border border-gray-200 rounded-full px-3 py-1">
      {{ props.message.content }}
    </span>
  </div>

  <!-- 내가 보낸 메시지(오른쪽) -->
  <div v-else-if="isSelf" class="flex items-end justify-end gap-2 mb-6">
    <div v-if="showTime" class="text-[13px] text-gray-400 pb-0.5">{{ timeText }}</div>
    <div class="max-w-[88%]">
      <div
        class="inline-block px-6 py-5 rounded-2xl shadow-sm"
        style="background:#7BA7FD; color:#fff;"
      >
        <p class="text-[15px] leading-[1.7] whitespace-pre-line break-words" v-html="html"/>
      </div>
    </div>
  </div>


  <div v-else class="flex items-start gap-8 mb-6 mt-1 mx-3">
    <template v-if="props.avatarUrl">
      <img
        :src="props.avatarUrl"
        class="w-11 h-11 rounded-full object-cover ring-2 ring-blue-100"
        alt="peer"
      />
    </template>
    <template v-else>
      <div
        class="w-20 h-20 rounded-full bg-[#EAF1FF] ring-2 ring-[#CFE0FF]
               flex items-center justify-center"
      >
        <Bot :size="40" :stroke-width="2" class="text-[#4A79F6]" />
      </div>
    </template>

    <div class="max-w-[88%]">
      <div class="text-[13px] text-gray-600 mb-1" v-if="props.peerName">{{ props.peerName }}</div>
      <div class="flex items-end gap-2">
        <div
          class="inline-block px-6 py-5 rounded-2xl border shadow-sm"
          style="background:#ffffff; color:#1f2937; border-color:#E5E7EB;"
        >
          <p class="text-[15px] leading-[1.7] whitespace-pre-line break-words" v-html="html"/>
        </div>
        <div v-if="showTime"
        class="text-[12px] text-gray-400 pb-0.5 whitespace-nowrap shrink-0 leading-none">
        {{ timeText }}      
      </div>
      </div>
    </div>
  </div>
</template>
