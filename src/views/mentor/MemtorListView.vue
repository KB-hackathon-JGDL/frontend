<script setup lang="ts">
import { onMounted } from 'vue'
import { useMentorStore } from '@/stores/useMentor'
import MentorRowCard from '@/components/memtor/MentorRowCard.vue'

const store = useMentorStore()
onMounted(() => store.loadMock())
</script>

<template>
    <div class="sticky top-0 z-10 bg-[#4A79F6] h-[85px] w-full"></div>
  <main class="mx-auto w-full max-w-[430px] px-4 py-5">
    <section class="rounded-2xl bg-white shadow ring-1 ring-[#E6EAF5] overflow-hidden">
    <header class="px-5 py-1 bg-[#578FFD]">
        <p class="mt-10 text-[20px] font-semibold text-gray-800">
        나에게 알맞은 상담사를 찾아보세요.
        </p>
    </header>

      <div class="px-3 py-3 space-y-3 bg-white">
        <MentorRowCard v-for="m in store.all" :key="m.id" :mentor="m" />
      </div>
    </section>
  </main>
</template>
