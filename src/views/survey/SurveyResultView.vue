<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useSurveyStore } from '@/stores/useSurvey'
import { useRouter } from 'vue-router'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-vue-next'

import imgFree from '@/assets/images/persona/free.png'
import imgPractical from '@/assets/images/persona/practical.png'
import imgRealistic from '@/assets/images/persona/realistic.png'
import imgRelaxed from '@/assets/images/persona/relaxed.png'
import imgSmart from '@/assets/images/persona/smart.png'
import imgStable from '@/assets/images/persona/stable.png'
import imgVision from '@/assets/images/persona/vision.png'
import imgYolo from '@/assets/images/persona/yolo.png'

const store = useSurveyStore()
const router = useRouter()

onMounted(() => {
  // (선택) 저장해 둔 스토어 불러오기
  store.loadFromStorage?.()

  if (!store.persona) store.derivePersona()

  // ✅ 결과와 무관하게 3개 고정으로 세팅
  store.setRecommendations('any', [
    { title: 'KB 특★한 적금',   rate: { min: 2.0,  max: 6.0 } },
    { title: 'KB 내맘대로 적금', rate: { min: 2.3,  max: 3.55 } },
    { title: 'KB 맑은하늘 적금', rate: { min: 2.45, max: 3.85 } },
  ])
})

const personaImg = computed(() => {
  const name = store.persona?.name ?? ''
  if (name.includes('자유') || name.includes('탐험')) return imgFree
  if (name.includes('실용')) return imgPractical
  if (name.includes('현실') || name.includes('계획')) return imgRealistic
  if (name.includes('느긋') || name.includes('모험')) return imgRelaxed
  if (name.includes('스마트') || name.includes('투자')) return imgSmart
  if (name.includes('안정') || name.includes('관리자')) return imgStable
  if (name.includes('비전') || name.includes('자수성가')) return imgVision
  if (name.includes('욜로') || name.includes('현재')) return imgYolo
  return imgStable
})

// ✅ 반드시 정의 (이게 없으면 "recProducts not defined" 경고 뜸)
const recProducts = computed(() => store.recommendedProducts)

const goHome = () => {
  store.saveToStorage?.()
  router.push('/home')
}
</script>

<template>
  <!-- 템플릿은 기존 코드 그대로, v-for="p in recProducts" 사용 -->
  <div class="grid gap-10">
    <div
      v-for="p in recProducts"
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
            이율 :
            <template v-if="p.rate">
              {{ p.rate.min.toFixed(2) }}% ~ {{ p.rate.max.toFixed(2) }}%
              <span v-if="p.rate.asOf"> ({{ p.rate.asOf }} 기준)</span>
            </template>
            <template v-else>이율 정보 없음</template>
          </div>
        </div>
      </div>
      <button class="w-[35px] h-[35px] rounded-full bg-[#FFC727] grid place-items-center">
        <ChevronRight :size="25" class="text-white" />
      </button>
    </div>
  </div>
</template>
