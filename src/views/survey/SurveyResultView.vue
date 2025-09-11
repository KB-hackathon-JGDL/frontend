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
const recProducts = computed(() => store.recommendedProducts)

onMounted(() => {
  if (!store.persona) store.derivePersona()
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

const goHome = () => {
  if (!store.persona) store.derivePersona()
  if (store.persona && store.recommendedProducts.length === 0) {
    store.setRecommendations(store.persona.name, [
      { title: 'KB 특★한 적금',   rate: { min: 2.0,  max: 6.0 } },
      { title: 'KB 내맘대로 적금', rate: { min: 2.3,  max: 3.55 } },
      { title: 'KB 맑은하늘 적금', rate: { min: 2.45, max: 3.85 } },
    ])
  }

  store.saveToStorage()

  router.push('/home')
}
</script>

<template>
  <div class="mx-auto w-[430px] h-[932px] bg-[#F4F6FE] shadow-2xl overflow-hidden">
    <header class="h-[85px] bg-[#578FFD] text-white px-5 pt-6">
      <div class="flex items-center gap-2">
        <button
          class="w-10 h-10 rounded-full bg-white/20 grid place-items-center"
          @click="router.back()"
        >
          <ChevronLeft :size="18" />
        </button>
        <h1 class="text-[23px] font-semibold ml-3">금융상품 설문조사</h1>
      </div>
    </header>

    <main class="p-5 bg-[#ffffff] relative h-[844px]">
      <div
        class="w-64 h-64 mx-auto mb-[20px] mt-[10px] rounded-full bg-white grid place-items-center
               shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
      >
        <img :src="personaImg" alt="" class="w-[130px] h-[130px] object-contain" />
      </div>

      <div class="mt-4 text-center">
        <div class="text-[19px] font-extrabold text-gray-900"># {{ store.persona?.name }}</div>
        <p class="mt-[10px] -mb-[15px] text-[16px] leading-relaxed text-gray-500 px-6">
          {{ store.persona?.blurb }}
        </p>
      </div>

      <section
        class="-mb-[13px] bg-[#ECF0F3] rounded-[24px] p-4 pt-5 min-h-[525px] w-[430px]
               flex flex-col justify-between shadow-inner absolute left-0 bottom-0"
      >
        <div>
          <div
            class="flex items-center mt-[15px] mb-[25px] ml-[15px] gap-5
                   text-[18px] font-semibold text-gray-800 mb-3"
          >
            <Sparkles :size="30" class="text-[#4A79F6]" />
            추천상품
          </div>

          <div class="grid gap-10">
            <div
              v-for="p in recProducts"
              :key="p.title"
              class="w-[370px] h-[90px] rounded-[25px] mx-auto bg-white px-4 py-3
                     flex items-center justify-between
                     shadow-[0_6px_14px_rgba(0,0,0,0.06)]"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-[40px] h-[40px] rounded-full bg-[#FFF7DB]
                         grid place-items-center text-[12px] text-[#D19C00]"
                >
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

              <button
                class="w-[35px] h-[35px] rounded-full bg-[#FFC727] grid place-items-center"
              >
                <ChevronRight :size="25" class="text-white" />
              </button>
            </div>
          </div>
        </div>

        <div class="mt-5">
          <button
            class="block mx-auto mb-[30px] w-[160px] h-[48px]
                   rounded-[20px] bg-[#FFBD01] text-white text-[17px] font-semibold"
            @click="goHome"
          >
            홈으로 이동
          </button>
        </div>
      </section>
    </main>
  </div>
</template>
