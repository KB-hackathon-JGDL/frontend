<script setup lang="ts">
import { useRouter } from 'vue-router'

const handleBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const emit = defineEmits<{
  (e: 'left-click'): void
  (e: 'right-click'): void
}>()

const router = useRouter()

const handleRightClick = () => {
  emit('right-click')
}
</script>

<template>
  <div class="relative w-screen min-h-screen bg-Gray-0">
    <!-- 메인 콘텐츠 -->
  
      <slot name="content">
        <div class="w-full h-full p-4 text-center text-Gray-5">
          페이지 콘텐츠를 추가해주세요
        </div>
      </slot>
  </div>
</template>
<style scoped></style>