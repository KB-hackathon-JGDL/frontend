<script setup lang="ts">
import type { ChatConfig } from '@/types/chat'
import { Bot, Circle } from 'lucide-vue-next';
const props = defineProps<{ config: ChatConfig }>()
const emit = defineEmits<{ back: []; end: [] }>()
</script>

<template>
  <div class="bg-[#4A79F6] text-white px-4">
    <div class="h-[85px] flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button
          @click="emit('back')"
          class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
          aria-label="뒤로가기"
        >
          <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

      <div class="relative w-24 h-24">                          
       <Circle class="absolute inset-0 w-full h-full text-white" :stroke-width="1" />
       <Bot class="absolute inset-0 m-auto text-white" :size="33" :stroke-width="2" />
      </div>

      <div class="leading-tight">
        <h1 class="font-medium text-[18px]">{{ props.config.title }}</h1>
          <p class="text-[16px] text-blue-100">
            <span class="inline-block w-[10px] h-[10px] bg-green-400 rounded-full mr-1 align-middle"></span>
            online
          </p>
        </div>
      </div>

      <button
        @click="emit('end')" class="h-11 px-6 text-[12px] font-semibold bg-[#FFBD01] text-white rounded-xl shadow hover:brightness-95">
        {{ props.config.endButtonLabel ?? '상담 종료' }}
      </button>
    </div>
  </div>
</template>
