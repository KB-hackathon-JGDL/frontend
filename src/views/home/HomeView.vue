<script setup lang="ts">
import HomeHeader from '@/components/home/HomeHeader.vue'
import SupportPreview from '@/components/home/SupportPreview.vue'
import FinanceRecommendCard from '@/components/home/FinanceRecommendCard.vue'
import { useSupportStore } from '@/stores/useSupport'

const store = useSupportStore()
store.loadMock()
const latestTwo = store.latest(2)
</script>

<template>
  <div class="min-h-dvh bg-[#F4F6FE]">
    <HomeHeader />
    <main class="pb-24">
      <SupportPreview :items="latestTwo" />
      <FinanceRecommendCard />
    </main>
  </div>
</template>
