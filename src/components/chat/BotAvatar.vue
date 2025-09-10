<script setup lang="ts">
import { Bot, Circle } from 'lucide-vue-next'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** 전체 배지(원)의 지름(px) */
  size?: number
  /** 배지/아이콘 기본 색 (outline/fill/badge 배경) */
  color?: string
  /** 아이콘 선 두께 */
  strokeWidth?: number
  /** 표시 형태 */
  variant?: 'outline' | 'filled' | 'badge'
  /** 외곽 링 색 (badge 전용) */
  ringColor?: string
  /** 외곽 링 두께(px, badge 전용) */
  ringWidth?: number
  /** 살짝 그림자 줄지 */
  elevate?: boolean
  /** 전체 크기에 대비한 아이콘 비율(0~1) */
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
    <!-- 배지형(기본) -->
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
      <Bot class="absolute inset-0 m-auto text-white"
           :size="botSize"
           :stroke-width="props.strokeWidth" />
    </template>

    <!-- 외곽선 원 + 아이콘 -->
    <template v-else-if="props.variant === 'outline'">
      <Circle class="absolute inset-0"
              :size="props.size"
              :stroke-width="props.strokeWidth"
              :style="{ color: props.color }" />
      <Bot class="absolute inset-0 m-auto"
           :size="botSize"
           :stroke-width="props.strokeWidth"
           :style="{ color: props.color }" />
    </template>

    <!-- 꽉 찬 원 + 아이콘 -->
    <template v-else>
      <div class="absolute inset-0 rounded-full" :style="{ backgroundColor: props.color }" />
      <Bot class="absolute inset-0 m-auto text-white"
           :size="botSize"
           :stroke-width="props.strokeWidth" />
    </template>
  </div>
</template>
