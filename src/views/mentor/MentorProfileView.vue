<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMentorStore } from '@/stores/useMentor'

const route = useRoute()
const router = useRouter()
const store = useMentorStore()
onMounted(() => store.loadMock())

const mentor = computed(() => store.getById(String(route.params.id)))
const reserve = () => router.push({ name: 'mentor-reserve', params: { id: route.params.id } })
</script>

<template>
  <main class="mx-auto w-full max-w-[430px] px-4 py-5" v-if="mentor">
    <section class="rounded-2xl bg-white shadow ring-1 ring-[#E6EAF5] overflow-hidden">
      <div class="p-5">
        <img :src="mentor.photoUrl" :alt="mentor.name" class="w-full h-48 object-cover rounded-2xl" />
        <h1 class="text-[20px] font-bold mt-4">{{ mentor.name }}</h1>
        <p class="text-gray-600 mt-1">{{ mentor.title }}</p>

        <div class="flex flex-wrap gap-2 mt-3">
          <span v-for="(b,i) in mentor.badges" :key="i"
                class="rounded-full border border-blue-400 text-blue-600 text-[12px] px-3 py-1">
            # {{ b }}
          </span>
        </div>

        <p class="text-[16px] font-medium text-gray-800 mt-3" v-if="mentor.intro">{{ mentor.intro }}</p>
        <p class="text-[14px] text-gray-600 mt-2" v-if="mentor.bio">{{ mentor.bio }}</p>

        <button
          class="mt-5 w-full h-12 rounded-xl bg-[#FFBD01] text-white font-semibold hover:brightness-95"
          @click="reserve"
        >
          상담 예약하기
        </button>
      </div>
    </section>
  </main>
</template>
