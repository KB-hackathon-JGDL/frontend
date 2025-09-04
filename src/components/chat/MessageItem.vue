<script setup lang="ts">
import type { ChatMessage } from '@/types/chat'
import BotAvatar from '@/components/chat/BotAvatar.vue'

const props = defineProps<{ message: ChatMessage }>()
const formatTime = (date: Date) => {
  const d = new Date(date); let h = d.getHours()
  const m = String(d.getMinutes()).padStart(2,'0')
  const suf = h>=12 ? 'PM' : 'AM'; h = h%12; if(h===0) h=12
  return `${h}:${m} ${suf}`
}
</script>

<template>
  <div class="mb-4">
    <div v-if="props.message.sender === 'bot'" class="flex items-center gap-8">
      <BotAvatar :size="50" color="#7BA7FD" variant="badge" :ring-width="2" />

      <div class="flex items-end gap-3 max-w-[86%]">
        <div class="bg-[#EEF2FF] rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
          <p class="text-[15px] leading-[1.6] text-[#1f2937] whitespace-pre-line">
            {{ props.message.content }}
          </p>
          <div v-if="props.message.links?.length" class="mt-2 space-y-0.5">
            <a v-for="l in props.message.links" :key="l" :href="l" target="_blank"
               class="block text-[13px] underline text-[#1d4ed8] break-all">
              {{ l }}
            </a>
          </div>
        </div>
        <span class="text-[11px] text-gray-500 whitespace-nowrap shrink-0 pb-1">
          {{ formatTime(props.message.timestamp) }}
        </span>
      </div>
    </div>

    <div v-else class="flex justify-end">
      <div class="flex items-end gap-2 max-w-[86%]">
        <span class="text-[11px] text-gray-500 whitespace-nowrap shrink-0 pb-1">
        {{ formatTime(props.message.timestamp) }}
      </span>
        <div class="bg-[#7BA7FD] text-white rounded-3xl rounded-tr-md px-4 py-3 shadow">
          <p class="text-[15px] leading-[1.6] whitespace-pre-line">{{ props.message.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
