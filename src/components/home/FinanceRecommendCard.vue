<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="min-h-dvh bg-[#ffffff]">

    <main class="px-5 -mt-10">
      <SupportPreview :items="supports" />

      <div class="relative h-0 z-[5]">
        <div
          aria-hidden
          class="pointer-events-none absolute left-2 right-2 -top-2 h-4
                 rounded-full bg-gradient-to-b from-black/18 to-transparent
                 blur-md"
        ></div>
      </div>

      <section class="relative z-[10] -mt-1">
        <div
  class="w-[430px] h-[567px] mx-auto -translate-x-5 mt-10
         rounded-t-[30px] bg-[#ECF0F3] p-4 pt-10 ring-1 ring-black/5
         shadow-[0_12px_24px_rgba(0,0,0,0.5)]">

          <h2 class="text-[16px] font-semibold text-gray-800 mb-3 ml-3">금융상품 추천</h2>

          <button
            class="w-[350px] h-[120px] text-left rounded-[40px] bg-white p-4 ml-10 mt-10
                   ring-1 ring-gray-100 shadow-[0_6px_16px_rgba(0,0,0,0.06)]
                   flex items-center justify-between"
            @click="router.push({ name: 'finance-survey-intro' })"
          >
            <div class="ml-8">
              <p class="text-[14px] text-gray-400 mt-0 mb-5">아직 설문을 진행하지 않으셨어요!</p>
              <p class="text-[15px] font-medium text-gray-800">
                설문조사를 진행하고<br />나에게 맞는 금융상품을 알아봐요!
              </p>
            </div>
            <span class="w-14 h-14 rounded-full bg-[#FFC727] grid place-items-center">
              <ChevronRight :size="25" class="text-[#ffffff]" />
            </span>
          </button>
        </div>
      </section>
    </main>
  </div>
</template>
