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
  size: 48, // ✅ 아바타 원 고정 크기(px)
  color: '#4A79F6',
  strokeWidth: 2,
  variant: 'badge', // 기본: 뱃지 모양
  ringColor: '#FFFFFF',
  ringWidth: 3,
  elevate: true,
  iconScale: 0.62,
})

const botSize = computed(() => Math.round(props.size * props.iconScale))
</script>

<template>
  <!-- ✅ 항상 고정 크기 유지 -->
  <div
    class="relative flex items-center justify-center flex-shrink-0 rounded-full"
    :style="{
      width: props.size + 'px',
      height: props.size + 'px',
      minWidth: props.size + 'px',
      minHeight: props.size + 'px'
    }"
  >
    <!-- 뱃지 타입 -->
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

    <!-- 외곽선 타입 -->
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

    <!-- 단색 타입 -->
    <template v-else>
      <div
        class="absolute inset-0 rounded-full"
        :style="{ backgroundColor: props.color }"
      />
      <Bot
        class="absolute inset-0 m-auto text-white"
        :size="botSize"
        :stroke-width="props.strokeWidth"
      />
    </template>
  </div>
</template>
