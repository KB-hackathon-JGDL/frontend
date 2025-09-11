<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useReviewStore } from '@/stores/useReview'
import KeywordChip from '@/components/mentee/KeywordChip.vue'
import ReviewSubmitModal from '@/components/modal/ReviewSubmitModal.vue'

const route = useRoute()
const router = useRouter()
const store = useReviewStore()

const showDone = ref(false)

const mentorId = computed(() => String(route.params.mentorId || 'M-01'))

const KEYWORDS = [
  '친절해요', '명쾌해요', '쉽고 친절하게 설명하셨어요',
  '이야기를 잘 경청하셨어요', '꼼꼼하고 자세히 답변하셨어요', '문제해결에 도움이 되었어요',
]

const submit = () => {
  if (!store.isValid) return
  showDone.value = true
}

const goHome = () => {
  store.reset()
  showDone.value = false
  window.location.href = 'http://localhost:5173/home'
}
const goNext = () => {
  store.reset()
  showDone.value = false
  router.push({ name: 'mentors-list' })
}
</script>

<template>
  <div class="min-h-dvh bg-[#F4F6FE]">
    <header
      class="relative z-20 h-[85px] bg-[#578FFD] text-white flex items-center px-5
             border-0 shadow-none overflow-hidden"
    >
      <div class="mx-10 font-extrabold tracking-wider text-[30px]">JMC</div>
    </header>

    <main class="px-5">
      <section class="mx-auto max-w-[520px]">
        <div class="relative">
          <div
            class="h-[160px] w-full rounded-[28px] bg-transparent -mt-14
                   shadow-[inset_0_1px_0_rgba(255,255,255,.7)]"
          />
          <div
            class="absolute left-1/2 top-1/5 -translate-x-1/2 -translate-y-[38%]
                   w-[300px] h-[250px] rounded-2xl bg-white
                   shadow-[0_20px_45px_rgba(0,0,0,0.15)] p-5
                   flex flex-col items-center justify-center text-center gap-3"
          >
            <img
              class="w-[90px] h-[90px] rounded-full object-cover ring-2 ring-white/80 mx-auto -mt-1 mb-5"
              src="https://i.pravatar.cc/160?img=5" alt="mentor"
            />
            <div class="space-y-4">
              <p class="font-semibold text-[16px] text-gray-900 leading-tight">상담사 김병로</p>
              <p class="text-gray-500 text-[16px] leading-tight">KB국민은행</p>
              <p class="text-[16px] text-gray-500/80 mt-1 leading-snug">
                “복잡한 은행업무, 상품 관련 상담 환영해요”
              </p>
            </div>
          </div>
        </div>

        <div class="mt-[190px] text-center">
          <p class="text-[18px] text-gray-900 font-semibold">
            상담사 김병로 와의 상담은 어땠나요?
          </p>
          <p class="text-[13px] mt-2">
            <span class="relative text-[#4A79F6] font-semibold">
              이런 점이 좋았어요
              <span class="absolute left-0 right-0 -bottom-1 h-[7px] bg-[#FFD258]/55 rounded"></span>
            </span>
            <span class="text-gray-400 ml-1">*최대 3개 선택 가능</span>
          </p>
        </div>

        <div class="mt-10 flex flex-col items-center gap-0">
          <div class="flex justify-center gap-12">
            <KeywordChip
              v-for="k in KEYWORDS.slice(0, 2)"
              :key="k"
              :label="k"
              :active="store.selected.includes(k)"
              @click="store.toggle(k)"
              class="px-8 h-12 text-[16px] text-[#427EF6] border-[#7BA7FD]"
            />
          </div>
          <div class="flex flex-col gap-10 w-[220px] mx-auto mt-10">
            <KeywordChip
              v-for="k in KEYWORDS.slice(2)"
              :key="k"
              :label="k"
              :active="store.selected.includes(k)"
              @click="store.toggle(k)"
              class="w-full text-[#427EF6] border-[#7BA7FD]"
            />
          </div>
        </div>

        <div class="mt-8 pb-12 grid place-items-center">
          <button
            class="w-[188px] h-20 rounded-full text-white disabled:opacity-50 mt-10
                   bg-[#FDB813] hover:opacity-90 shadow-[0_6px_14px_rgba(253,184,19,.45)]"
            :disabled="!store.isValid"
            @click="submit"
          >
            제출하기
          </button>
        </div>
      </section>
    </main>

    <ReviewSubmitModal
      :open="showDone"
      @close="showDone = false"
      @goHome="goHome"
      @goNext="goNext"
    />
  </div>
</template>
