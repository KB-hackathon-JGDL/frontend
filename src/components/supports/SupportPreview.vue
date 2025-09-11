<script setup lang="ts">
import type { Product } from '@/stores/useSurvey'
const props = defineProps<{ items: Product[] }>()
</script>

<template>
  <div class="grid gap-10">
    <div
      v-for="p in props.items"
      :key="p.title"
      class="w-[370px] h-[90px] rounded-[25px] mx-auto bg-white px-4 py-3
             flex items-center justify-between shadow-[0_6px_14px_rgba(0,0,0,0.06)]"
    >
      <div class="flex items-center gap-3">
        <div class="w-[40px] h-[40px] rounded-full bg-[#FFF7DB] grid place-items-center text-[12px] text-[#D19C00]">
          KB
        </div>
        <div>
          <div class="text-[16px] font-medium text-gray-900">{{ p.title }}</div>
          <div class="text-[12px] text-gray-500 mt-[2px]">
            <template v-if="p.rate">
              이율 : {{ p.rate.min.toFixed(2) }}% ~ {{ p.rate.max.toFixed(2) }}%
              <span v-if="p.rate.asOf"> ({{ p.rate.asOf }} 기준)</span>
            </template>
            <template v-else>이율 정보 없음</template>
          </div>
        </div>
      </div>

      <button class="w-[35px] h-[35px] rounded-full bg-[#FFC727] grid place-items-center">
      </button>
    </div>
  </div>
</template>
