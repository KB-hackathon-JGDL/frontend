<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft } from 'lucide-vue-next';


type Mentor = {
  id: string
  name: string
  photoUrl: string
  tags?: string
  field?: string
  career?: string
  cert?: string
  headline?: string
}

const MOCK: Record<string, Mentor> = {
  'M-01': {
    id: 'M-01',
    name: '김병로 상담사',
    photoUrl:
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1200&auto=format&fit=crop',
    tags: '# 상냥함  # 유익있는',
    field: '금융 / 투자',
    career: 'KB은행 근무\n경력 코치/직무 멘토링 수료',
    cert: '(2025) KB웨alth마스터스 근무\n자격: 투자자산운용사, 신용분석사',
    headline:
      '“저는 청년 한 분 한 분의 상황을 꼼꼼히 살펴 \n가장 알맞은 투자 솔루션을 \n찾아드리는 상담사입니다. \n복잡하고 어려운 절차 속에서도 \n따뜻하게 함께 걸어가며 \n든든한 동반자가 되어드리겠습니다.”',
  },
}

const route = useRoute()
const router = useRouter()

const id = computed(() => String(route.params.id))
const mentor = computed<Mentor>(() => {
  return (
    MOCK[id.value] ?? {
      id: id.value,
      name: '상담사',
      photoUrl: '',
      tags: '',
      field: '',
      career: '',
      cert: '',
      headline: '',
    }
  )
})

function goBack() {
  router.back()
}

function reserve() {
  router.push({ name: 'mentor-book', params: { id: id.value } })
}
</script>

<template>
  <div class="min-h-dvh bg-[#F4F6FE]">
    <header class="sticky top-0 z-10 h-[85px] bg-[#578FFD] text-white">
        <div class="h-[64px] flex items-center gap-2 px-5 pt-8">
            <button @click="router.back()"><ChevronLeft class="w-19 h-19" /></button>
            <h1 class="text-[23px] font-semibold">상담</h1>
        </div>
    </header>

    <main class="max-w-[480px] mx-auto p-6 pb-28">
      <section
        class="bg-white min-h-[830px] border border-[#E6EAF5] rounded-3xl bg-white shadow-sm overflow-hidden"
      >
        <div class="aspect-[16/8.5] relative overflow-hidden">
          <img
            v-if="mentor?.photoUrl"
            :src="mentor.photoUrl"
            alt=""
            class="w-full h-full object-cover"
          />
          <div class="absolute left-5 bottom-4 text-white drop-shadow">
            <p class="text-[14px]">[금융 상담 전문]</p>
            <p class="text-[20px] font-semibold">{{ mentor?.name }}</p>
          </div>
        </div>

        <div class="px-71 py-4 border-b border-[#E6EAF5] flex justify-center">
            <p class="text-[#4A79F6] text-[19px] font-semibold">
            프로필
            </p>
        </div>

        <div class="p-5 text-[16px] text-gray-700 space-y-3">
          <div class="flex gap-2">
            <span class="shrink-0 text-gray-500">분야:</span>
            <p class="whitespace-pre-line">{{ mentor?.field }}</p>
          </div>
          <div class="flex gap-2">
            <span class="shrink-0 text-gray-500">경력:</span>
            <p class="whitespace-pre-line">{{ mentor?.career }}</p>
          </div>
          <div class="flex gap-2">
            <span class="shrink-0 text-gray-500">자격:</span>
            <p class="whitespace-pre-line">{{ mentor?.cert }}</p>
          </div>
        </div>

        <div
          class="m-7 p-5 bg-[#F6F8FF] border border-[#E6EAF5] rounded-2xl text-[15px] text-gray-700"
        >
          <p class="whitespace-pre-line text-center leading-relaxed">
            {{ mentor?.headline }}
          </p>
        </div>
      </section>

      <div class="h-[14rem]"></div>
    </main>

    <div class="fixed inset-x-0 -bottom-10">
      <div class="max-w-[160px] mx-auto py-56">
        <button
          class="mt-5 w-full h-20 rounded-xl bg-[#FFBD01] text-white text-2xl font-semibold hover:brightness-95"
          @click="reserve"
        >
          상담 예약하기
        </button>
      </div>
    </div>
  </div>
</template>