<!-- src/components/layout/BottomTabBar.vue -->
<script setup lang="ts">
import { Home, BookText, Calendar, User2 } from 'lucide-vue-next'
</script>

<template>
  <!-- 화면 하단 고정 -->
  <nav class="fixed inset-x-0 bottom-0 z-50 px-4
              pb-[max(12px,env(safe-area-inset-bottom))]">
    <!-- 여기 클래스들이 핵심: 둥근-윗모서리 + 위쪽 그림자 -->
    <div
      class="mx-auto max-w-[520px] bg-white
             rounded-t-3xl ring-1 ring-black/5
             shadow-[0_-12px_28px_-8px_rgba(0,0,0,0.18)]"
    >
      <ul class="grid grid-cols-4 h-[64px] items-center text-gray-500">
        <li class="grid place-items-center"><Home :size="20" /></li>
        <li class="grid place-items-center"><BookText :size="20" /></li>
        <li class="grid place-items-center"><Calendar :size="20" /></li>
        <li class="grid place-items-center"><User2 :size="20" /></li>
      </ul>
    </div>
  </nav>
</template>
