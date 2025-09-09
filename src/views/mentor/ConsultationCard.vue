<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ChevronLeft } from 'lucide-vue-next'
import ReservaModal from '@/components/modal/ReservaModal.vue' // 모달 컴포넌트 임포트

const router = useRouter()
const route = useRoute()
const mentorId = computed(() => String(route.params.id || 'M-01'))

const WEEK = ['일','월','화','수','목','금','토']
function label(dateISO: string) {
  const d = new Date(`${dateISO}T00:00:00`)
  return { dd: String(d.getDate()).padStart(2,'0'), wk: WEEK[d.getDay()] }
}

const selectedTime = ref<string>('')
const note = ref('')
const agree = ref(false)

/** 예약 확인 모달 제어 */
const showReserva = ref(false)
function openReserva()  { showReserva.value = true }
function closeReserva() { showReserva.value = false }

/** 버튼 클릭: 확인 모달만 띄움 */
function onClickNext() {
  openReserva()
}

/** 확인 버튼: 여기서 실제 예약 로직 수행 후 모달 닫기 */
async function onConfirmReserva() {
  // TODO: 예약 API 호출/검증
  // await api.reserve({ note: note.value, ... })
  closeReserva()
  // 필요하면 여기서 라우팅/토스트 등 처리
  // router.push('/something') or showToast('예약 완료')
}
</script>

<template>
  <div class="min-h-dvh bg-[#F4F6FE]">
    <header class="sticky top-0 z-10 h-[85px] bg-[#4A79F6] text-white">
      <div class="h-[64px] flex items-center gap-2 px-5 pt-8">
        <button @click="router.back()"><ChevronLeft class="w-8 h-8" /></button>
        <h1 class="text-[20px] font-semibold">상담</h1>
      </div>
    </header>

    <div class="bg-white min-h-[850px] rounded-2xl shadow-sm p-6">
      <p class="text-[19px] font-semibold px-5 py-6 border-b border-[#EBEBEB]">채팅상담 예약</p>
      <p class="text-[20px] font-semibold px-5 py-4">상담 카드</p>

      <div class="relative w-[85%] mx-auto">
        <textarea
          rows="10"
          class="block mx-auto mt-8 w-full max-w-[500px]
                 rounded-3xl border border-[#E6EAF5] p-3 text-[17px] outline-none
                 bg-white shadow-md text-center"
          placeholder="간단한 상담 내용과 궁금한 점을 적어주세요"
          v-model="note"
          maxlength="500"
        />
        <div class="absolute bottom-3 right-4 text-[14px] text-gray-500">
          {{ note.length }} / 500자
        </div>
      </div>

      <div class="border-t border-[#E6EAF5] pt-10 pl-14">
        <p class="text-[17px] font-semibold mb-3">반드시 확인해주세요!</p>
        <ol class="text-[16px] text-gray-600 list-decimal pl-8 space-y-2">
          <li>예약 완료 후에는 상담 취소가 불가해요.</li>
          <li>예약 완료 후에는 내용 수정이 불가해요.</li>
          <li>
            상담 내용에 포함하지 말아주세요
            <ul class="list-disc pl-5 mt-1 space-y-1">
              <li>개인정보 및 외부링크</li>
              <li>의미없는 문자의 나열</li>
            </ul>
          </li>
        </ol>
      </div>

      <div class="flex justify-end px-[60px] mt-8">
        <button
          class="h-20 px-14 rounded-xl bg-[#FFBD01] text-white text-[15px] font-semibold hover:brightness-95 disabled:opacity-40"
          @click="onClickNext"
        >
          다음
        </button>
      </div>
    </div>
  </div>

  <!-- 모달은 '임포트한 컴포넌트'만 사용 -->
  <ReservaModal :show="showReserva" @close="closeReserva">
    <template #actions>
    </template>
  </ReservaModal>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .18s ease }
.fade-enter-from,   .fade-leave-to      { opacity: 0 }
.pop-enter-active,  .pop-leave-active   { transition: transform .18s ease, opacity .18s ease }
.pop-enter-from, .pop-leave-to          { transform: scale(.97); opacity: 0 }
</style>
