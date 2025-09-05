<script setup lang="ts">
import type { ChatMessage } from '@/types/chat'
const props = defineProps<{ message: ChatMessage; avatarUrl?: string }>()
</script>

<template>
  <div class="mb-4">
    <!-- 상담사(왼쪽) -->
    <div v-if="props.message.sender === 'bot'" class="flex items-start gap-3">
      <img
        :src="props.avatarUrl || 'https://placehold.co/40x40?text=%20'"
        class="w-10 h-10 rounded-full object-cover ring-2 ring-blue-200"
        alt="mentor"
      />
      <div class="flex items-end gap-2 max-w-[86%]">
        <div class="bg-[#EEF2FF] rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
          <p class="text-[15px] leading-[1.6] text-[#1f2937] whitespace-pre-line">
            {{ props.message.content }}
          </p>
        </div>
      </div>
    </div>

    <!-- 멘티(오른쪽) -->
    <div v-else class="flex justify-end">
      <div class="flex items-end gap-2 max-w-[86%]">
        <div class="bg-[#7BA7FD] text-white rounded-3xl rounded-tr-md px-4 py-3 shadow">
          <p class="text-[15px] leading-[1.6] whitespace-pre-line">{{ props.message.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
