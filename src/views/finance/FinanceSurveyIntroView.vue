<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="min-h-dvh bg-[#F4F6FE]">
    <header class="h-[56px] bg-white flex items-center px-5 shadow-sm">
      <h1 class="text-[16px] font-semibold">금융상품 추천</h1>
    </header>

    <main class="px-5 py-8">
      <div class="rounded-2xl bg-white ring-1 ring-gray-100 shadow-sm p-6">
        <p class="text-[14px] text-gray-700">
          설문 기능은 곧 제공될 예정입니다. 준비되면 설문을 통해 맞춤 금융 상품을 추천드릴게요!
        </p>
        <div class="mt-6 flex gap-3">
          <button class="px-4 h-10 rounded-xl bg-gray-100" @click="router.back()">뒤로</button>
          <button class="px-4 h-10 rounded-xl bg-[#4A79F6] text-white" disabled>설문 시작 (준비중)</button>
        </div>
      </div>
    </main>
  </div>
</template>
