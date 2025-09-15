<script setup lang="ts">
import { onMounted } from 'vue'
import { useMentorStore } from '@/stores/useMentor'
import MentorRowCard from '@/components/memtor/MentorRowCard.vue'
import BottomNav from '@/components/common/BottomNav.vue'
import HomeHeader from '@/components/home/HomeHeader.vue'
const store = useMentorStore()
onMounted(() => store.loadMock())
</script>

<template>
  <HomeHeader />
  <main class="mx-auto w-full max-w-[430px] px-4 py-5">
    <section class="rounded-2xl bg-white shadow ring-1 ring-[#E6EAF5] overflow-hidden">
      <div class="px-3 py-3 space-y-3 bg-white">
        <MentorRowCard v-for="m in store.all" :key="m.id" :mentor="m" />
      </div>
    </section>
  </main>
  <BottomNav />

</template>