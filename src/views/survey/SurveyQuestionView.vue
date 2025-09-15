<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, watch } from 'vue'
import { ChevronLeft } from 'lucide-vue-next'
import { useSurveyStore } from '@/stores/useSurvey'
import SurveyOptionButton from '@/components/survey/SurveyOptionButton.vue'
import ReceiptImg from '@/assets/images/survey/receipt.png'

const route = useRoute()
const router = useRouter()
const store = useSurveyStore()

onMounted(() => store.init())

// step 파라미터 동기화
const step = computed(() => {
  const n = Number(route.params.step ?? 1)
  return Number.isFinite(n) && n >= 1 ? n : 1
})
watch(step, v => (store.step = v), { immediate: true })

const q = computed(() => store.currentQuestion)
const selectedKey = computed(() => (q.value ? store.answers[q.value.id] : undefined))

function select(key: 'A' | 'B' | 'C') {
  if (!q.value) return
  store.select(q.value.id, key)
}

function onNext() {
  if (!q.value) return
  if (!store.answers[q.value.id]) return
  if (store.isLast) {
    router.push({ name: 'survey-result' })
  } else {
    router.push({ name: 'survey', params: { step: store.step + 1 } }) 
  }
}
function onBack() {
  if (store.step > 1) {
    router.push({ name: 'survey', params: { step: store.step - 1 } })
  } else {
    router.back()
  }
}
</script>

<template>
  <div class="min-h-dvh bg-[#F4F6FE]">
    <header class="h-[88px] bg-[#578FFD] text-white px-5 pt-6">
      <div class="flex items-center gap-2">
        <button class="w-10 h-10 rounded-full mt-3 bg-white/20 grid place-items-center" @click="onBack">
          <ChevronLeft :size="18" />
        </button>
        <h1 class="text-[23px] font-semibold mt-3 ml-3">금융상품 설문조사</h1>
      </div>
    </header>


    <main class="px-6 py-6 bg-[#ffffff] h-[843px]">
      <div v-if="q" class="-mx-6 -mt-6 bg-white shadow h-[843px] w-[430px] relative pb-24">
        <div class="flex justify-end mb-5 mt-5">
          <img :src="ReceiptImg" alt="" class="w-50 h-50 object-contain" />
        </div>

 <div class="ml-12 pr-[120px] min-h-[120px]">
   <h2 class="text-[21px] ml-[1px] -mr-[100px] font-semibold text-gray-900 whitespace-pre-line">
     {{ q.title }}
   </h2>
   <p v-if="q.caption" class="text-[14px] text-gray-400 mt-2 ml-10">
     {{ q.caption }}
   </p>
 </div>
        <div class="mt-[90px] grid gap-3">
          <SurveyOptionButton
            v-for="opt in q.options"
            :key="opt.key"
            :label="opt.label"
            :selected="selectedKey === opt.key"
            @click="select(opt.key)"
          />
        </div>

        <button
          class="absolute bottom-[140px] left-1/2 -translate-x-1/2 w-[320px] h-[56px] text-[15px] rounded-full text-white transition disabled:opacity-40 disabled:cursor-not-allowed bg-[#4A79F6]"
          :disabled="!selectedKey"
          @click="onNext"
        >
          {{ store.isLast ? '결과 보기' : '다음' }}
        </button>
      </div>

      <div v-else class="text-center text-gray-500 py-20">문항을 불러오는 중…</div>
    </main>
  </div>
</template>
