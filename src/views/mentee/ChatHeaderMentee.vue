<script setup lang="ts">
import type { ChatConfig } from '@/types/chat'
const props = defineProps<{ config: ChatConfig }>()
const emit  = defineEmits<{ back: []; end: [] }>()
</script>

<template>
  <div class="bg-[#4A79F6] text-white px-4">
    <div class="h-[70px] flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button @click="emit('back')" class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <img
          v-if="props.config.botAvatar"
          :src="props.config.botAvatar"
          class="w-8 h-8 rounded-full object-cover ring-2 ring-white/70"
          alt="mentor"
        />

        <div class="leading-tight">
          <h1 class="font-medium text-[16px]">{{ props.config.title }}</h1>
          <p class="text-[12px] text-blue-100">
            <span class="inline-block w-[6px] h-[6px] bg-green-400 rounded-full mr-1"></span>online
          </p>
        </div>
      </div>

      <button class="h-10 px-5 text-[12px] font-semibold bg-[#FFBD01] text-white rounded-xl" @click="emit('end')">
        {{ props.config.endButtonLabel ?? '상담 종료' }}
      </button>
    </div>
  </div>
</template>
