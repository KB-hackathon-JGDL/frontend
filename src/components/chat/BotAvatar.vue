<script setup lang="ts">
import { Bot, Circle } from 'lucide-vue-next'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  size?: number
  color?: string
  strokeWidth?: number
  variant?: 'outline' | 'filled' | 'badge'
  ringColor?: string
  ringWidth?: number
  elevate?: boolean
  iconScale?: number 
}>(), {
  size: 28,
  color: '#4A79F6',
  strokeWidth: 2,
  variant: 'badge',
  ringColor: '#FFFFFF',
  ringWidth: 3,
  elevate: true,
  iconScale: 0.62,   
})
const botSize = computed(() => Math.round(props.size * props.iconScale))
</script>

<template>
  <div
    class="relative inline-flex items-center justify-center flex-shrink-0"
    :style="{ width: props.size + 'px', height: props.size + 'px' }"
  >
    <!-- A) 시안용: 채워진 원 + 바깥 흰 링 + 흰 로봇 -->
    <template v-if="props.variant === 'badge'">
      <div
        class="absolute inset-0 rounded-full"
        :style="{
          backgroundColor: props.color,
          boxShadow: props.elevate ? '0 2px 6px rgba(0,0,0,0.15)' : 'none'
        }"
      />
      <div
        class="absolute inset-0 rounded-full pointer-events-none"
        :style="{ boxShadow: `0 0 0 ${props.ringWidth}px ${props.ringColor}` }"
      />
      <Bot
        class="absolute inset-0 m-auto text-white"
        :size="botSize"
        :stroke-width="props.strokeWidth"
      />
    </template>

    <!-- B) 테두리만 있는 원 + 로봇 (필요시 사용) -->
    <template v-else-if="props.variant === 'outline'">
      <Circle
        class="absolute inset-0"
        :size="props.size"
        :stroke-width="props.strokeWidth"
        :style="{ color: props.color }"
      />
      <Bot
        class="absolute inset-0 m-auto"
        :size="botSize"
        :stroke-width="props.strokeWidth"
        :style="{ color: props.color }"
      />
    </template>

    <!-- C) 채워진 원 + 흰 로봇 (기본형) -->
    <template v-else>
      <div class="absolute inset-0 rounded-full" :style="{ backgroundColor: props.color }" />
      <Bot class="absolute inset-0 m-auto text-white" :size="botSize" :stroke-width="props.strokeWidth" />
    </template>
  </div>
</template>
