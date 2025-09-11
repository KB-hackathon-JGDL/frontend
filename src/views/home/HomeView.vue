<script setup lang="ts">
import HomeHeader from '@/components/home/HomeHeader.vue'
import SupportPreview from '@/components/home/SupportPreview.vue'
import FinanceRecommendCard from '@/components/home/FinanceRecommendCard.vue'
import { useSupportStore } from '@/stores/useSupport'
import BottomNav from '@/components/common/BottomNav.vue'

const store = useSupportStore()
store.loadMock()
const latestTwo = store.latest(2)
</script>

<template>
  <div class="min-h-dvh bg-[#F4F6FE]">
    <div class="mx-auto max-w-[430px]">
      <HomeHeader />
      <!-- 네비 높이(88px) + 여유 -->
      <main class="pb-[112px]">
        <SupportPreview :items="latestTwo" />
        <FinanceRecommendCard />
      </main>
    </div>
  </div>

  <!-- 고정 네비는 루트 바깥에 두는 게 안전 -->
  <BottomNav />
</template>
