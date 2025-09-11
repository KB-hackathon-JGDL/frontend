<script setup lang="ts">
import { useRouter } from 'vue-router'
import SupportCard from './SupportCard.vue'
import type { SupportItem } from '@/types/support'
const props = defineProps<{ items: SupportItem[] }>()
const router = useRouter()
</script>

<template>
  <section class="px-5 mt-0 bg-[#FFFFFF] h-[300px]">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-[20px] font-regular text-gray-800 mt-5 mb-5">지원사업 안내</h2>
      <button class="text-[12px] text-gray-500" @click="router.push({ name:'supports-list' })">
        전체보기
      </button>
    </div>
    <div class="flex gap-3 flex-row">
     <SupportCard v-for="it in items" :key="it.id" :item="it" />
    </div>
  </section>
</template>
